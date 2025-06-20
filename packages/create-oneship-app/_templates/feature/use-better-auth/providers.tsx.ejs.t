---
to: <%= name %>/src/app/providers.tsx
---
"use client";

import { SessionProvider } from "better-auth/nextjs/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}