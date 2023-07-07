"use client";

import useIsMounted from "@/hooks/use-is-mounted";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};

export default function AlertModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: Props) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
