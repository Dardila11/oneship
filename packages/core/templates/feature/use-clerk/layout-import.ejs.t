---
to: <%= name %>/src/app/layout.tsx
inject: true
after: "import type { Metadata } from 'next'"
---
import { ClerkProvider } from '@clerk/nextjs' 