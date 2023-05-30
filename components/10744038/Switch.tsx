import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

export default function MySwitch() {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="email-alerts" mb="0">
    Enable email alerts?
      </FormLabel>
      <Switch id="email-alerts" />
    </FormControl>
  );
}