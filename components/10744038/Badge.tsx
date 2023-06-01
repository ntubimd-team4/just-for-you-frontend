import { Badge, Stack } from '@chakra-ui/react';

export default function MyBadge() {
  return (
    <Stack direction="row" m={10}>
      <Badge>Default</Badge>
      <Badge colorScheme="green">Success</Badge>
      <Badge colorScheme="red">Removed</Badge>
      <Badge colorScheme="purple">New</Badge>
      <Badge variant="outline" colorScheme="green">
    Default
      </Badge>
      <Badge variant="solid" colorScheme="green">
    Success
      </Badge>
      <Badge variant="subtle" colorScheme="green">
    Removed
      </Badge>
    </Stack>
  );
}