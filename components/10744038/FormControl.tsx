import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Radio,
  RadioGroup,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function MyFormControl() {
  return (
    <>
      <FormControl m={10}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend">
    Favorite Naruto Character
        </FormLabel>
        <RadioGroup defaultValue="Itachi">
          <HStack spacing="24px">
            <Radio value="Sasuke">Sasuke</Radio>
            <Radio value="Nagato">Nagato</Radio>
            <Radio value="Itachi">Itachi</Radio>
            <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
          </HStack>
        </RadioGroup>
        <FormHelperText>Select only if you&apos;re a fan.</FormHelperText>
      </FormControl>
    </>
  );
}