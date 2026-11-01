import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { site } from '../lib/config';

const serif = Cormorant_Garamond({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--serif', display: 'swap' });
const sans = Inter({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500'], variable: '--sans', display: 'swap' });

export const metadata = { title: site.title, description: site.description, openGraph: { title: site.title, description: site.description, images: ['/photos/blazer-chair.jpg'] } };
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4efe7' };

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
