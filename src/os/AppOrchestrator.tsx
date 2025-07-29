'use client';

import React, {useLayoutEffect, useRef} from 'react';
import {Box, VStack} from '@chakra-ui/react';
import Application from '@/os/Application';
import FullScreenPrompt from '@/os/components/FullScreenPrompt';
import Dock from './Dock';
import AppBackground from '@/os/AppBackground';
import {useApplicationsStore} from '@/store';
import useMeasure from 'react-use-measure';
import {ApplicationId} from '@/applications/types';

const AppOrchestrator = () => {
  const hydrating = useRef(true);
  const applications = useApplicationsStore(state => state.applications);
  const fullScreenPrompt = useApplicationsStore(
    state => state.fullScreenPrompt
  );
  const openApplication = useApplicationsStore(state => state.openApplication);
  const setContainerDimensions = useApplicationsStore(
    state => state.setContainerDimensions
  );
  const [containerRef, {width: containerWidth, height: containerHeight}] =
    useMeasure();

  useLayoutEffect(() => {
    setContainerDimensions({width: containerWidth, height: containerHeight});

    if (hydrating.current && containerHeight > 0 && containerWidth > 0) {
      openApplication(ApplicationId.LANDING_TEXT_ANIMATOR);
      hydrating.current = false;
    }
  }, [
    containerHeight,
    containerWidth,
    openApplication,
    setContainerDimensions,
  ]);

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

      <Dock />
    </VStack>
  );
};

export default AppOrchestrator;
