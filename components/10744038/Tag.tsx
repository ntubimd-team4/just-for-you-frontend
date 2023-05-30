import { AddIcon } from '@chakra-ui/icons';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
  Avatar
} from '@chakra-ui/react';

export default function MyTag() {
  return (
    <>
      <Tag>Sample Tag</Tag>
      <HStack spacing={4}>
        {['sm', 'md', 'lg'].map(size => (
          <Tag size={size} key={size} variant="solid" colorScheme="teal">
      Teal
          </Tag>
        ))}
      </HStack>
      <HStack spacing={4}>
        {['sm', 'md', 'lg'].map(size => (
          <Tag size={size} key={size} variant="subtle" colorScheme="cyan">
            <TagLeftIcon boxSize="12px" as={AddIcon} />
            <TagLabel>Cyan</TagLabel>
          </Tag>
        ))}
      </HStack>
      <HStack spacing={4}>
        {['sm', 'md', 'lg'].map(size => (
          <Tag
            size={size}
            key={size}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
          >
            <TagLabel>Green</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </HStack>
      <Tag size="lg" colorScheme="red" borderRadius="full">
        <Avatar
          src="https://bit.ly/sage-adebayo"
          size="xs"
          name="Segun Adebayo"
          ml={-1}
          mr={2}
        />
        <TagLabel>Segun</TagLabel>
      </Tag>
    </>
  );
}