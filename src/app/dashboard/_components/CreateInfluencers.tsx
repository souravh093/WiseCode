import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateInfluencer = () => {
  return (
    <div className="container mt-5">
      <Link href="/dashboard/create-influencer">
        <Button size={"lg"}>
          <Plus className="size-4" />
          Add New Influencer
        </Button>
      </Link>
    </div>
  );
};

export default CreateInfluencer;
