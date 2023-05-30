import { SearchIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

export default function MyIconButton() {
  return (
    <IconButton aria-label="Search database" icon={<SearchIcon />} m={10}/>
  );
}