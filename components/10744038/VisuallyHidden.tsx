import { CheckIcon } from '@chakra-ui/icons';
import { Button, VisuallyHidden, VisuallyHiddenInput } from '@chakra-ui/react';

export default function MyVisuallyHidden() {
  return (
    <Button>
      <VisuallyHidden>Checkmark</VisuallyHidden>
      <CheckIcon />
    </Button>
  );
}