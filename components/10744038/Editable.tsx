import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';

export default function MyEditable() {
  return (
  // Click the text to edit
    <Editable defaultValue="Take some chakra">
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
}