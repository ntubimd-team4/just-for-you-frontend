import { Show, Box, Accordion } from '@chakra-ui/react';

export default function MyHide(){
  return (
    <Accordion m={4}>
      <Show breakpoint="(max-width: 400px)">
        <Box>This text appears only on screens 400px and smaller.</Box>
      </Show>
    </Accordion>
  );
}