"use client";

import useIsMounted from "@/hooks/use-is-mounted";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const { isMounted } = useIsMounted();
  if (!isMounted) return null;
  return (
    <>
      <Toaster />
    </>
  );
}
