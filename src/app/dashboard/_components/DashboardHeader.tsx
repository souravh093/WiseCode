import React from "react";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

const DashboardHeader = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  const headers: Record<string, string> = authToken
    ? { Cookie: `auth-token=${authToken}` }
    : {};

  const res = await fetch(`${process.env.NEXT_URL}/api/auth/me`, {
    headers,
    cache: "no-store",
  });

  const userDetails = await res.json();

  if (!res.ok) return <div>Authentication required</div>;

  const { email, role } = userDetails?.data?.user;

  return (
    <header className="bg-white shadow p-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Link href={"/dashboard"} className="text-2xl font-bold text-primary">
              Influencer Directory
            </Link>
            <Badge variant={"outline"}>{role}</Badge>
          </div>
          <div className="flex gap-3 items-center">
            <h3>{email}</h3>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
