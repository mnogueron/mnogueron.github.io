'use client';

import React, {useContext, useLayoutEffect} from 'react';
import {Box, Flex, VStack} from '@chakra-ui/react';
import Shuttle from '@/components/Shuttle';
import LandingTextAnimator from '@/components/LandingTextAnimator';
import WipMenu from '@/components/WipMenu';
import useMeasure from 'react-use-measure';
import {
  MIN_PADDING,
  WindowAppContext,
  WindowState,
} from '@/contexts/WindowAppProvider';
import {ApplicationId} from '@/applications/types';
import Application from '@/components/Application';
import AppMenu from '@/components/AppMenu';

const ScreenManager = () => {
  const [containerRef, {width: containerWidth, height: containerHeight}] =
    useMeasure();
  const {applications, openApplication, updateContainerSize} =
    useContext(WindowAppContext);

  const handleFeatherClick = (id: ApplicationId) => {
    openApplication(
      id,
      0,
      {
        top: MIN_PADDING,
        left: MIN_PADDING,
        height: containerHeight - MIN_PADDING * 2,
        width: containerWidth - MIN_PADDING * 2,
      },
      WindowState.DEFAULT
    );
  };

  useLayoutEffect(() => {
    updateContainerSize(containerHeight, containerWidth);
  }, [containerHeight, containerWidth, updateContainerSize]);

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
      <Box ref={containerRef} flex={1} width="100%" overflow="hidden">
        <Box height="100%">
          <LandingTextAnimator />
          <Flex alignItems="center" justifyContent="center" height="100%">
            <Shuttle height="54dvh" onFeatherClick={handleFeatherClick} />
          </Flex>
        </Box>

        {applications.map(app => (
          <Application key={app.id} id={app.id} />
        ))}
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
        <AppMenu onMenuClick={handleFeatherClick} />
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
