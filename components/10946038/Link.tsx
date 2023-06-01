import { Accordion, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function MyLink(){
  return (
    <Accordion m={5}>
      <Link href="https://chakra-ui.com" isExternal>
        Chakra Design system <ExternalLinkIcon mx="2px" />
      </Link>
    </Accordion>
  );
}