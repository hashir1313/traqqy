import type { ReactNode } from "react";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <main className="flex min-h-dvh items-center justify-center p-4">{children}</main>;
}
