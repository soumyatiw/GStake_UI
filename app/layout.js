import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar/Navbar';
import './globals.css';


const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'G Stake UI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
