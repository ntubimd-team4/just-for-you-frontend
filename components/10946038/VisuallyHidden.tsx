/* eslint-disable react/jsx-no-comment-textnodes */
import { CheckIcon } from '@chakra-ui/icons';
import { Button, VisuallyHidden } from '@chakra-ui/react';

export default function MyVisuallyHidden() {
  return (

    <Button>
      <VisuallyHidden>Checkmark</VisuallyHidden>
      <CheckIcon />
    </Button>

  );
}