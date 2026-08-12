import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '❤️ Tauqeer & Shanzee – Love Points Portal',
  description: 'Private couple reward tracking system where Tauqeer and Shanzee earn points whenever the other partner misses a predefined activity.',
  keywords: ['Love Points', 'Tauqeer', 'Shanzee', 'Couple Tracker', 'Relationship Rewards'],
  authors: [{ name: 'Tauqeer & Shanzee' }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,400;0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
