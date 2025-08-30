"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="flex gap-3 cursor-pointer"
      >
        <ArrowRightFromLine />
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
