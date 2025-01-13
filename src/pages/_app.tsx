import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Inter} from 'next/font/google';
import {Provider} from '@/components/ui/provider';

const inter = Inter({subsets: ['latin']});

export default function App({Component, pageProps}: AppProps) {
  return (
    <main className={inter.className}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
