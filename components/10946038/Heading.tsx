import { Heading, Stack } from '@chakra-ui/react';

export default function MyHeading(){
  return (
    <Stack spacing={6}>
      <Heading as="h1" size="4xl" noOfLines={1}>
    (4xl) In love you
      </Heading>
      <Heading as="h2" size="3xl" noOfLines={1}>
    (3xl) In love you
      </Heading>
      <Heading as="h2" size="2xl">
    (2xl) In love you
      </Heading>
      <Heading as="h2" size="xl">
    (xl) In love you
      </Heading>
      <Heading as="h3" size="lg">
    (lg) In love you
      </Heading>
      <Heading as="h4" size="md">
    (md) In love you
      </Heading>
      <Heading as="h5" size="sm">
    (sm) In love you
      </Heading>
      <Heading as="h6" size="xs">
    (xs) In love you
      </Heading>
    </Stack>
  );
}