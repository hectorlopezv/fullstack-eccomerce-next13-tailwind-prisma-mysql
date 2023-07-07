"use client";

import StoreModal from "@/components/ui/modals/StoreModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounter, setIsMounter] = useState(false);
  useEffect(() => {
    setIsMounter(true);
  }, []);

  if (!isMounter) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};
