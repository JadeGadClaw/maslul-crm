import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'מסלול CRM',
  description: 'מסלול CRM לניהול נסיעות, תשלומים וקבלות',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="he" dir="rtl"><body>{children}</body></html>;
}
