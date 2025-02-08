'use client';

import React, {useContext} from 'react';
import {Box, Flex, VStack} from '@chakra-ui/react';
import Shuttle from '@/components/Shuttle';
import LandingTextAnimator from '@/components/LandingTextAnimator';
import WipMenu from '@/components/WipMenu';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import Application from '@/components/Application';
import AppMenu from '@/components/AppMenu';

const ScreenManager = () => {
  const {applications, containerRef, openApplication, fullScreenPrompt} =
    useContext(WindowAppContext);

  return (
    <VStack
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      top={0}
      gap={0}
      width="100%"
      backgroundColor="screen.landing"
      transition="background-color 500ms ease" // TODO sync with over animations
    >
      <Box
        ref={containerRef}
        flex={1}
        width="100%"
        overflow="hidden"
        position="relative"
      >
        <Box height="100%">
          <LandingTextAnimator />
          <Flex alignItems="center" justifyContent="center" height="100%">
            <Shuttle height="54dvh" onFeatherClick={openApplication} />
          </Flex>
        </Box>

        {Object.values(applications).map(app => (
          <Application key={app.id} id={app.id} />
        ))}

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
      </Box>

      {/*TODO add bottom menu*/}
      <Flex
        width="100%"
        bg="#404552"
        borderTop="1px solid white"
        alignItems="center"
        justifyContent="space-between"
        py={{base: 2, md: 3}}
        px={{base: 2, md: 3}}
        zIndex="sticky"
      >
        <AppMenu onMenuClick={openApplication} />
        <WipMenu />
        {/*<Menu
          shuttleRef={shuttleRef}
          onMenuShuttleClick={handleMenuShuttleClick}
          onMenuItemClick={handleFeatherClick}
          screen={screen}
        />*/}
      </Flex>
    </VStack>
  );
};

export default ScreenManager;
