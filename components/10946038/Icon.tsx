/* eslint-disable react/jsx-no-comment-textnodes */
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import { Accordion } from '@chakra-ui/react';

export default function MyIcon(){
  return (
    <Accordion m={10}>
  // The default icon size is 1em (16px)
      <>
    // The default icon size is 1em (16px)
        <PhoneIcon />
    // Use the `boxSize` prop to change the icon size
        <AddIcon boxSize={6} />
    // Use the `color` prop to change the icon color
        <WarningIcon w={8} h={8} color="red.500" /></>
    </Accordion>
  );
}