import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, headTitle }: {
    children: React.ReactNode,
    headTitle: string
}) {
  return (
    <>
      <Head>
        <title>{`諮屬於你-${headTitle}`}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="諮屬於你-找到您的心靈場所" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="copyright" content="諮屬於你" />
        <meta name="og:title" content={`諮屬於你-${headTitle}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}