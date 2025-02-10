import React, {useContext} from 'react';
import {Box} from '@chakra-ui/react';
import {WindowAppContext} from '@/contexts/WindowAppProvider';

const FullScreenPrompt = () => {
  const {fullScreenPrompt} = useContext(WindowAppContext);

  return (
    <Box
      position="absolute"
      top={2}
      left={2}
      right={2}
      bottom={2}
      borderRadius={8}
      border="3px solid white"
      opacity={fullScreenPrompt ? 1 : 0}
      transition="opacity 200ms ease"
      pointerEvents="none"
    />
  );
};

export default FullScreenPrompt;
