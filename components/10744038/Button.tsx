import { Box, Button, ButtonGroup, Stack, Wrap, WrapItem } from '@chakra-ui/react';

export default function MyButton() {
  return (
    <>
      <Button colorScheme="blue" m={10}>Button</Button>
      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
    Button
        </Button>
        <Button colorScheme="teal" size="sm">
    Button
        </Button>
        <Button colorScheme="teal" size="md">
    Button
        </Button>
        <Button colorScheme="teal" size="lg">
    Button
        </Button>
      </Stack>
      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="teal" variant="solid">
    Button
        </Button>
        <Button colorScheme="teal" variant="outline">
    Button
        </Button>
        <Button colorScheme="teal" variant="ghost">
    Button
        </Button>
        <Button colorScheme="teal" variant="link">
    Button
        </Button>
      </Stack>
      <Stack direction="column">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          py={12}
          bgImage="url('https://bit.ly/2Z4KKcF')"
          bgPosition="center"
          bgRepeat="no-repeat"
          mb={2}
        >
          <ButtonGroup gap="4">
            <Button colorScheme="whiteAlpha">WhiteAlpha</Button>
            <Button colorScheme="blackAlpha">BlackAlpha</Button>
          </ButtonGroup>
        </Box>

        <Wrap spacing={4}>
          <WrapItem>
            <Button colorScheme="gray">Gray</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="red">Red</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="orange">Orange</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="yellow">Yellow</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="green">Green</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="teal">Teal</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="blue">Blue</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="cyan">Cyan</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="purple">Purple</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="pink">Pink</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="linkedin">Linkedin</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="facebook">Facebook</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="messenger">Messenger</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="whatsapp">Whatsapp</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="twitter">Twitter</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="telegram">Telegram</Button>
          </WrapItem>
        </Wrap>
      </Stack>
    </>
  );
}