import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Planner - Plan Your Next Adventure',
  description: 'Create, organize, and manage your travel itineraries with ease',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
