"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteInfluencer } from "@/service/influencer";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const DeleteInfluencer = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteInfluencer = async () => {
    startTransition(async () => {
      const result = await deleteInfluencer(id);
      if (result?.statusCode === 200) {
        toast.success(result.message);
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(result?.message || "Failed to delete influencer");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 cursor-pointer bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-500"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Delete Influencer</DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to delete this influencer? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteInfluencer}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInfluencer;
