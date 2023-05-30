import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Accordion,
} from '@chakra-ui/react';

export default function MyAlert(){
  return (
    <Accordion m={4}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
      </Alert>
    </Accordion>
  );
}