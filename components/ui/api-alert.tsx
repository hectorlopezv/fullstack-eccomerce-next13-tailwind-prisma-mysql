"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./Badge";
import { Button } from "@/components/ui/Button";
import { useClipboard } from "@mantine/hooks";
import { toast } from "react-hot-toast";
import useIsMounted from "@/hooks/use-is-mounted";



interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export default function ApiAlert({
  description,
  title,
  variant,
}: ApiAlertProps) {
  const isMounted = useIsMounted();
  const clipboard = useClipboard({ timeout: 500 });
  const onCopy = (description: string) => {
    clipboard.copy(description);
    toast.success("Copied to clipboard");
  };
  if (!isMounted) return null;

  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code suppressHydrationWarning className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
