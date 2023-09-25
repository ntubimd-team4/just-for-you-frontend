import Head from 'next/head';
import Navbar from './Navbar';
import { Box } from '@chakra-ui/react';

const style = {
  'minHeight': '80vh',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center'
};

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>諮屬於你</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="諮屬於你-找到您的心靈場所" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="copyright" content="諮屬於你" />
        <meta name="og:title" content="諮屬於你" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main style={style}>
        <Box p={10}>
          {children}
        </Box >
      </main >
    </>
  );
}