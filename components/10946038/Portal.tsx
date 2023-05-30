import { Accordion, Box, Portal } from '@chakra-ui/react';
import React from 'react';

export default function MyPortal(){
  return (
    <><Accordion m={4}></Accordion><Box bg="red.400" color="white">
      {'I\'m here,'}
      <Portal>This text is portaled at the end of document.body!</Portal>
    </Box></>

  );
}