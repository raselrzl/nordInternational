"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AdvertiseModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Advertise & Standards</DialogTitle>
        </DialogHeader>

        {/* LINKS */}
        <div className="flex flex-col gap-3 text-sm">
          <Link
            href="/about/advertise"
            className="hover:underline text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Advertise With Us
          </Link>

          <Link
            href="/about/advertise/standards-integrity"
            className="hover:underline text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Standards & Integrity
          </Link>
        </div>

        {/* DELETE / CLOSE BUTTON */}
        <div className="mt-6 flex justify-end">
          <Button
            variant="destructive"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
