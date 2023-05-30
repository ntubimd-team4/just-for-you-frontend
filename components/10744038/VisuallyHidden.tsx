import { CheckIcon } from '@chakra-ui/icons';
import { Button, VisuallyHidden, VisuallyHiddenInput } from '@chakra-ui/react';

export default function MyVisuallyHidden() {
  return (
    <Button m={10}>
      <VisuallyHidden>Checkmark</VisuallyHidden>
      <CheckIcon />
    </Button>
  );
}