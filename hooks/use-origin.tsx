import useIsMounted from "./use-is-mounted";

export const useOrigin = () => {
  const isMounter = useIsMounted();

  if (!isMounter) {
    return "";
  }
  if (typeof window !== "undefined" && globalThis?.location?.origin) {
    return globalThis.location.origin;
  }
  return "";
};
