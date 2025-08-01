"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" passHref>
        <Button
          variant="ghost"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Input
        </Button>
      </Link>
      <Link href="/history" passHref>
        <Button
          variant="ghost"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/history" ? "text-primary" : "text-muted-foreground"
          )}
        >
          History
        </Button>
      </Link>
      <Link href="/stats" passHref>
        <Button
          variant="ghost"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/stats" ? "text-primary" : "text-muted-foreground"
          )}
        >
          Stats
        </Button>
      </Link>
    </nav>
  );
}
