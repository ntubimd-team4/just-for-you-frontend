import { AbsoluteCenter, Box, Divider, Stack, Text } from '@chakra-ui/react';

export default function MyDivider() {
  return (
    <><Box position="relative" padding="10">
      <Divider />
      <AbsoluteCenter bg="white" px="4">
              Content
      </AbsoluteCenter>
    </Box><Stack direction="row" h="100px" p={4}>
      <Divider orientation="vertical" />
      <Text>Chakra UI</Text>
    </Stack></>
  );
}