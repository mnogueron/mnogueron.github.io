import React, {useRef} from 'react';
import {Flex, FlexProps} from '@chakra-ui/react';
import {useWindowAppContext} from '@/contexts/WindowAppProvider';
import {FULL_SCREEN_PROMPT_TIMEOUT} from '@/constants';
import {JetBrainsMono} from '@/styles/fonts';
import {EMPTY_DRAG_IMAGE} from '@/dragUtils';
import AppControls from '@/components/os/AppWindow/AppHeader/AppControls';
import {WindowState} from '@/contexts/types';
import AppTitle from '@/components/os/AppWindow/AppHeader/AppTitle';

type AppHeaderProps = {
  title?: string;
  state: WindowState;
  onClose?: () => void;
  onMove: (delta: {x: number; y: number}) => void;
  onFullScreen: () => void;
  onFullScreenToggle: () => void;
  onReduce: () => void;
  disableMove?: boolean;
} & FlexProps;

const AppHeader = ({
  title,
  state,
  onClose,
  onMove,
  onDragStart,
  onDragEnd,
  onFullScreen,
  onFullScreenToggle,
  onReduce,
  disableMove,
  ...props
}: AppHeaderProps) => {
  const {fullScreenPrompt, updateFullScreenPromptState} = useWindowAppContext();
  const topTimeout = useRef<number>(null);
  const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (disableMove) {
      return;
    }

    dragStart.current = {x: e.clientX, y: e.clientY};
    e.dataTransfer.effectAllowed = 'move';

    // Disable drag visual effect
    if (EMPTY_DRAG_IMAGE.complete) {
      e.dataTransfer.setDragImage(EMPTY_DRAG_IMAGE, 0, 0);
    }

    if (onDragStart) {
      onDragStart(e);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    if (e.clientY < 10) {
      if (!topTimeout.current) {
        topTimeout.current = window.setTimeout(() => {
          updateFullScreenPromptState(true);
        }, FULL_SCREEN_PROMPT_TIMEOUT);
      }
    } else {
      if (topTimeout.current) {
        window.clearTimeout(topTimeout.current);
        topTimeout.current = null;
      }
      if (fullScreenPrompt) {
        updateFullScreenPromptState(false);
      }
    }
    onMove(delta);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    onMove(delta);
    if (topTimeout.current) {
      window.clearTimeout(topTimeout.current);
      topTimeout.current = null;
    }
    if (fullScreenPrompt) {
      updateFullScreenPromptState(false);
      onFullScreen();
    } else if (onDragEnd) {
      onDragEnd(e);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent drag animation feedback
    e.preventDefault();
  };

  return (
    <Flex
      px={2}
      py={1}
      bg="#2e333f"
      justifyContent="space-between"
      alignItems="center"
      minHeight="26px"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      {...props}
      className={JetBrainsMono.className}
      direction="row"
      draggable={disableMove ? undefined : 'true'}
    >
      <AppTitle title={title} />
      <AppControls
        state={state}
        onFullScreenToggle={onFullScreenToggle}
        onReduce={onReduce}
        onClose={onClose}
      />
    </Flex>
  );
};

export default AppHeader;
