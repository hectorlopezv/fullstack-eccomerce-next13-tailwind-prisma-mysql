"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type Props = React.HtmlHTMLAttributes<HTMLElement>;

export default function MainNav({ className, ...props }: Props) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
          href={route.href}
          key={route.href}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
