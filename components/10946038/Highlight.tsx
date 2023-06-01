import { Heading, Highlight } from '@chakra-ui/react';

export default function MyHighlight(){
  return (
    <Heading lineHeight="tall">
      <Highlight
        query={['spotlight', 'emphasize', 'Accentuate']}
        styles={{ 'px': '2', 'py': '1', 'rounded': 'full', 'bg': 'teal.100' }}
      >
    With the Highlight component, you can spotlight, emphasize and accentuate
    words.
      </Highlight>
    </Heading>
  );
}