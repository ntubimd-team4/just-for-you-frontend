import { Flex, Spacer } from '@chakra-ui/react';
import { Box, Container, Heading } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      {/* <Container> */}
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Chakra App</Heading>
        </Box>
        <Spacer />
        <Box p="2">
          <Link href={'/tree'}>樹洞</Link>
          <Link href={'/tree'}>樹洞</Link>
          <Link href={'/tree'}>樹洞</Link>
        </Box>
        <ButtonGroup gap="2">
          <Button colorScheme="teal">Sign Up</Button>
          <Button colorScheme="teal">Log in</Button>
        </ButtonGroup>
      </Flex>
      {/* </Container> */}
    </nav>
  );
}