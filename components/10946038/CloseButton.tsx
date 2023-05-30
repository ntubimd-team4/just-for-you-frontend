import { Accordion, CloseButton, Stack } from '@chakra-ui/react';

export default function MyCloseButton(){
  return (
    <Accordion m={4}>
      <Stack direction="row" spacing={6}>
        <CloseButton size="sm" />
        <CloseButton size="md" />
        <CloseButton size="lg" />
      </Stack>
    </Accordion>
  );
}