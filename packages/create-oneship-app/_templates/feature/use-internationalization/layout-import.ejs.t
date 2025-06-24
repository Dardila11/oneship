---
to: <%= name %>/src/app/layout.tsx
inject: true
prepend: true
---
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';


