import { Box, Tag, Tooltip } from '@chakra-ui/react';
import React from 'react';

export default function MyTooltip() {
  return (
    <Tooltip label="Hey, I'm here!" aria-label="A tooltip">
        Hover me
    </Tooltip>
  );
}