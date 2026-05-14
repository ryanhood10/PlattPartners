import type { AppProps } from 'next/app';
import { Roboto, Work_Sans } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-work-sans',
  display: 'swap',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={`${roboto.variable} ${workSans.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
