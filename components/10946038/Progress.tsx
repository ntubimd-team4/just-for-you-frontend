import { Accordion, Progress, Stack } from '@chakra-ui/react';

export default function MyProgress(){
  return (
    <Accordion m={4}>
      <Stack spacing={5}>
        <Progress colorScheme="green" size="sm" value={20} />
        <Progress colorScheme="green" size="md" value={20} />
        <Progress colorScheme="green" size="lg" value={20} />
        <Progress colorScheme="green" height="32px" value={20} />
      </Stack>
    </Accordion>
  );
}