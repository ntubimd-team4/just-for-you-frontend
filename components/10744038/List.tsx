import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';

export default function MyList() {
  return (
    <>
      <UnorderedList m={10}>
        <ListItem>Lorem ipsum dolor sit amet</ListItem>
        <ListItem>Consectetur adipiscing elit</ListItem>
        <ListItem>Integer molestie lorem at massa</ListItem>
        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
      </UnorderedList>
      <OrderedList m={10}>
        <ListItem>Lorem ipsum dolor sit amet</ListItem>
        <ListItem>Consectetur adipiscing elit</ListItem>
        <ListItem>Integer molestie lorem at massa</ListItem>
        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
      </OrderedList>
    </>
  );
}