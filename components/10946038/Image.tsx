import { Accordion, Image } from '@chakra-ui/react';

export default function MyImage(){
  return (
    <Accordion m={10}>
      <Image
        borderRadius="full"
        boxSize="150px"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
    </Accordion>
  );
}