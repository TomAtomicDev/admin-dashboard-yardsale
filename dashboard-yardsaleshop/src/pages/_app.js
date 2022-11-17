import MainLayout from '@layout/MainLayout';
import { ProviderAuth } from '@hooks/useAuth';
import Head from 'next/head';
import '@styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YardSale: Admin Dashboard</title>
      </Head>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}

export default MyApp;
