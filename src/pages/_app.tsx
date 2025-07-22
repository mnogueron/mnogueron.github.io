import type {AppProps} from 'next/app';
import {Provider} from '@/components/ui/provider';
import {inter} from '@/theme/fonts';
import WindowAppProvider from '@/contexts/WindowAppProvider';

export default function App({Component, pageProps}: AppProps) {
  return (
    <main className={inter.className}>
      <Provider>
        <WindowAppProvider>
          <Component {...pageProps} />
        </WindowAppProvider>
      </Provider>
    </main>
  );
}
