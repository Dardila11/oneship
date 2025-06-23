---
to: <%= name %>/src/i18n/request.ts
---
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl/routing';
import { routing } from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    locales: (await import(`../locales/${locale}.json`)).default
  };
});
