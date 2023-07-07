"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function SetupPage() {
  const onOpenStoreModal = useStoreModal((state) => state.onOpen);
  const isOpenStoreModal = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpenStoreModal) {
      onOpenStoreModal();
    }
  }, [isOpenStoreModal, onOpenStoreModal]);
  return null;
}
