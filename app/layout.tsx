
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';



export const metadata: Metadata = {
  metadataBase: new URL('https://sharath-three.vercel.app'),

  title: 'Sharath | YouTube Thumbnail Designer',

  description:
    'Explore Sharath’s portfolio of creative YouTube thumbnails designed to capture attention, increase audience interest, and help creators stand out.',

  openGraph: {
    title: 'Sharath | YouTube Thumbnail Designer',
    description:
      'Explore creative YouTube thumbnails and discover my design portfolio.',
    url: 'https://sharath-three.vercel.app/',
    siteName: 'Sharath Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sharath - YouTube Thumbnail Designer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sharath | YouTube Thumbnail Designer',
    description:
      'Explore creative YouTube thumbnails and discover my design portfolio.',
    images: ['/og-image.png'],
  },
};


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="K1FJ6Eq3NzXPmAKpWeirVxO4icTAfuA8h64PENW8u7k" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark-theme">{children}</body>
    </html>
  );
}
