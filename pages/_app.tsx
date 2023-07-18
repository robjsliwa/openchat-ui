import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { Auth0Provider } from '@auth0/auth0-react';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: baseUrl,
      }}
    >
      <div className={inter.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </Auth0Provider>
  );
}

export default appWithTranslation(App);
