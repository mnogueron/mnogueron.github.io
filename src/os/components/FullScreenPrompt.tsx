import React from 'react';
import {Box} from '@chakra-ui/react';

type FullScreenPromptProps = {
  isVisible: boolean;
};

const FullScreenPrompt = ({isVisible}: FullScreenPromptProps) => (
  <Box
    position="absolute"
    top={2}
    left={2}
    right={2}
    bottom={2}
    borderRadius={8}
    border="3px solid white"
    opacity={isVisible ? 1 : 0}
    transition="opacity 200ms ease"
    pointerEvents="none"
  />
);

export default FullScreenPrompt;
