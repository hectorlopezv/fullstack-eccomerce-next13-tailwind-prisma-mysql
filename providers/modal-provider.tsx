"use client";

import StoreModal from "@/components/ui/modals/StoreModal";
import useIsMounted from "@/hooks/use-is-mounted";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const { isMounted } = useIsMounted();
  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};
