---
to: <%= name %>/src/i18n/routing.ts
---
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // list of locales supported
  locales: ['en', 'es'],
  // used when no locale is matched
  defaultLocale: 'en',
});
 
 
