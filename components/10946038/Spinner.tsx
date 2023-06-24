import { Accordion, Spinner } from '@chakra-ui/react';
export default function MySpinner(){
  return (
    <Accordion m={5}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Accordion>
  );
}