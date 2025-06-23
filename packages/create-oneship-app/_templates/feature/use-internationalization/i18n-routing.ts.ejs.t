---
to: <%= name %>/src/i18n/routing.ts
---
import { definedRouting } from 'next-intl/routing';

export const routing = definedRouting({
  // list of locales supported
  locales: ['en', 'es'],
  // used when no locale is matched
  defaultLocale: 'en',
});
 
 
