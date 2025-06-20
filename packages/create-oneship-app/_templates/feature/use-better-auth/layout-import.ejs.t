---
to: <%= name %>/src/app/layout.tsx
inject: true
before: "import type { Metadata } from 'next'"
---

import { Providers } from "./providers"; 