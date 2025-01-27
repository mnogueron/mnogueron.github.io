import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Provider} from '@/components/ui/provider';
import {inter} from '@/styles/fonts';

export default function App({Component, pageProps}: AppProps) {
  return (
    <main className={inter.className}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
