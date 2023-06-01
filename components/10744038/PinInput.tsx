import { HStack, PinInput, PinInputField } from '@chakra-ui/react';

export default function MyPinInput() {
  return (
    <HStack>
      <PinInput>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
}