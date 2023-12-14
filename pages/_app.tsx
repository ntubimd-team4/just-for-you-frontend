import '@/styles/globals.css';
import '@/styles/base/_main.scss';
import type { AppProps } from 'next/app';
import { extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '@/context/authContext';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

const colors = {
  'brand': {
    '900': '#1a365d',
    '800': '#153e75',
    '700': '#2a69ac',
  },
};

export const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </SessionProvider>
  );
}