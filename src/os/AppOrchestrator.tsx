'use client';

import React from 'react';
import {Box, VStack} from '@chakra-ui/react';
import {useWindowAppContext} from '@/contexts/WindowAppProvider';
import Application from '@/os/Application';
import FullScreenPrompt from '@/os/components/FullScreenPrompt';
import AppBar from './AppBar';
import AppBackground from '@/os/AppBackground';

const AppOrchestrator = () => {
  const {applications, containerRef, fullScreenPrompt} = useWindowAppContext();

  return (
    <VStack
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      top={0}
      gap={0}
      backgroundColor="screen.homepage"
    >
      <Box
        ref={containerRef}
        flex={1}
        width="100%"
        overflow="hidden"
        position="relative"
      >
        <AppBackground />

        {Object.values(applications).map(app => (
          <Application key={app.id} id={app.id} />
        ))}

        <FullScreenPrompt isVisible={fullScreenPrompt} />
      </Box>

      <AppBar />
    </VStack>
  );
};

export default AppOrchestrator;
