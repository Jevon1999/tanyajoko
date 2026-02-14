import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Tanya Joko - Asisten AI Wisata Yogyakarta",
  description: "Asisten AI cerdas untuk membantu merencanakan wisata Anda di Yogyakarta. Dengan dukungan voice, multi-bahasa, dan rekomendasi personal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a2f20',
              color: '#fff',
              border: '1px solid rgba(19, 236, 91, 0.3)',
            },
          }}
        />
      </body>
    </html>
  );
}
