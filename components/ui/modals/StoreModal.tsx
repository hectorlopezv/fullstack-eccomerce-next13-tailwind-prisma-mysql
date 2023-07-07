"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../Modal";

type Props = {};

export default function StoreModal({}: Props) {
  const storeModal = useStoreModal();
  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Test"
      description="Test Desc"
    ></Modal>
  );
}
