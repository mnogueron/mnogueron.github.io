'use client';

import React from 'react';
import {Box, Flex, VStack} from '@chakra-ui/react';
import Shuttle from '@/components/Shuttle';
import {useWindowAppContext} from '@/contexts/WindowAppProvider';
import Application from '@/components/Application';
import FullScreenPrompt from '@/components/FullScreenPrompt';
import AppBar from '@/components/AppBar';

const ScreenManager = () => {
  const {applications, containerRef, openApplication} = useWindowAppContext();

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
        <Box height="100%">
          <Flex alignItems="center" justifyContent="center" height="100%">
            <Shuttle height="54dvh" onFeatherClick={openApplication} />
          </Flex>
        </Box>

        {Object.values(applications).map(app => (
          <Application key={app.id} id={app.id} />
        ))}

        <FullScreenPrompt />
      </Box>

      <AppBar />
    </VStack>
  );
};

export default ScreenManager;
