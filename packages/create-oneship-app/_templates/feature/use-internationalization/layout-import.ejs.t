---
to: <%= name %>/src/app/layout.tsx
inject: true
after: "import type { Metadata } from 'next'"
---
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {routing} from '/src/i18n/routing';


