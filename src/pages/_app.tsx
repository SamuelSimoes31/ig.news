import { AppProps } from 'next/app';
import Header from '../components/Header/index';
import { SessionProvider } from "next-auth/react";

import '../styles/global.scss';
import { PrismicProvider } from '@prismicio/react';
import { linkResolver } from '../services/prismicio';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PrismicProvider
        linkResolver={linkResolver}
      >
        <Header />
        <Component {...pageProps} />
      </PrismicProvider>
    </SessionProvider>
  );
}

export default MyApp;
