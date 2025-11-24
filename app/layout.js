import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CityPulse - Smart City IoT Platform',
  description: 'Real-time traffic and pollution monitoring',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20 min-h-screen bg-slate-950 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
