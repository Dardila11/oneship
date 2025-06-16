---
to: <%= name %>/src/app/providers.tsx
inject: true
---

"use client"
import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
} 