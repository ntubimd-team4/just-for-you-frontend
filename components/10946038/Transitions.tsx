import { Fade, ScaleFade, Slide, SlideFade, Collapse, Box, Button, useDisclosure, Accordion } from '@chakra-ui/react';

export default function MyTransitions(){
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Accordion m={4}>
      <>
        <Button onClick={onToggle}>Click Me</Button>
        <Fade in={isOpen}>
          <Box
            p="40px"
            color="white"
            mt="4"
            bg="teal.500"
            rounded="md"
            shadow="md"
          >
                    Fade
          </Box>
        </Fade>
      </>
    </Accordion>

  );
}