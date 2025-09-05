import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import {ResizeHandler} from '@/os/AppWindow/types';
import ResizeHandlers from '@/os/AppWindow/ResizeHandlers';
import AppHeader from './AppHeader';
import {Positions, WindowState} from '@/os/store/types';
import useMeasure from 'react-use-measure';
import AppWindowContainer from '@/os/AppWindow/AppWindowContainer';
import {ApplicationContainer} from '@/applications';
import {ApplicationId} from '@/applications/types';

type WindowProps = {
  appId: ApplicationId;
  title?: string;
  onClose?: () => void;
  onResize: ResizeHandler;
  onMove: (delta: {x: number; y: number}) => void;
  onFocus: () => void;
  onFullScreen: () => void;
  onReduce: () => void;
  onFullScreenToggle: () => void;
  state: WindowState;
  positions: Positions;
  priority: number;
  isReduced: boolean;
  disableResize?: boolean;
  disableMove?: boolean;
  onWindowDragStart?: () => void;
  onWindowDragEnd?: () => void;
};

type WindowContainerProps = {
  appId: ApplicationId;
};

const WindowContainer = React.memo(({appId}: WindowContainerProps) => {
  // Offset option is used to ignore scale transform
  const [containerRef, {height, width}] = useMeasure({offsetSize: true});

  return (
    <Box
      ref={containerRef}
      flex={1}
      width="100%"
      position="relative"
      overflow="hidden"
      borderBottomRadius={6}
      css={{
        '--containerWidth': `${width}px`,
        '--containerHeight': `${height}px`,
      }}
    >
      <ApplicationContainer appId={appId} />
    </Box>
  );
});

WindowContainer.displayName = 'WindowContainer';

const AppWindow = ({
  title,
  onClose,
  onResize,
  onMove,
  onFocus,
  onFullScreen,
  onFullScreenToggle,
  onReduce,
  state,
  positions,
  priority,
  isReduced,
  disableResize,
  disableMove,
  onWindowDragStart,
  onWindowDragEnd,
  appId,
}: WindowProps) => {
  return (
    <AppWindowContainer
      id={title || ''}
      onFocus={onFocus}
      windowState={state}
      positions={positions}
      priority={priority}
      isReduced={isReduced}
    >
      <Box position="relative" height="100%" width="100%">
        <Flex direction="column" height="100%" width="100%">
          <AppHeader
            title={title}
            state={state}
            onClose={onClose}
            onMove={onMove}
            onFullScreen={onFullScreen}
            onFullScreenToggle={onFullScreenToggle}
            onReduce={onReduce}
            onWindowDragStart={onWindowDragStart}
            onWindowDragEnd={onWindowDragEnd}
            disableMove={state === WindowState.FULL_SCREEN || disableMove}
          />
          <WindowContainer appId={appId} />
        </Flex>
        {!(state === WindowState.FULL_SCREEN || disableResize) && (
          <ResizeHandlers onResize={onResize} />
        )}
      </Box>
    </AppWindowContainer>
  );
};

export default AppWindow;
