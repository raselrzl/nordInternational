'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { use } from "react";
import { deleteOpinionById } from '@/app/actions';
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ConfirmDeleteOpinionPage({ params }: { params: Promise<{ opinionId: string }> }) {
  const router = useRouter();
  const { opinionId } = use(params); // gets opinionId from dynamic route
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await deleteOpinionById(opinionId);
      router.push("/alluseropinion");
      setLoading(false);
    } catch (error) {
      console.error("Error deleting opinion:", error);
    }
  };

  const handleCancel = () => {
    router.push("/(mainLayout)/alluseropinion");
  };

  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="max-w-md w-full bg-accent-foreground/8 shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-destructive">
          Are you sure you want to delete this opinion?
        </h2>
        <p className="mt-2 text-sm text-accent-foreground/70">
          Once deleted, this cannot be undone.
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go back to the previous page
          </Button>
          <Button variant="link" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2 inline-block" /> : null}
            Yes, delete it
          </Button>
        </div>
      </div>
    </div>
  );
}
