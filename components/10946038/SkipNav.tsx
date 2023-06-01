import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav';
import App from 'next/app';

export default function MySkipNav(){
  return (
    <>
      {/* If you want to make it the first element the user encountersb*/}
      <SkipNavLink>Skip to content</SkipNavLink>
      <App />

      {/* And inside another component, like App */}
      <div>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes*/}
        <SkipNavContent />
        {/* The main content below */}
      </div>
    </>
  );
}