import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export default function MyCircularProgress(){
  return (
  // Change the size to 120px
    <CircularProgress value={30} size="120px" />
  );
}