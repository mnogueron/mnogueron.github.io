import React, {useRef} from 'react';
import {Flex, FlexProps} from '@chakra-ui/react';
import {JetBrainsMono} from '@/theme/fonts';
import {EMPTY_DRAG_IMAGE} from '@/os/AppWindow/dragUtils';
import AppControls from '@/os/AppWindow/AppHeader/AppControls';
import {WindowState} from '@/os/store/types';
import AppTitle from '@/os/AppWindow/AppHeader/AppTitle';
import {useApplicationsStore} from '@/os/store';

const FULL_SCREEN_PROMPT_TIMEOUT = 750;

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

const AppHeader = React.memo(
  ({
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
    const fullScreenPrompt = useApplicationsStore.use.fullScreenPrompt();
    const showFullScreenPrompt =
      useApplicationsStore.use.showFullScreenPrompt();
    const hideFullScreenPrompt =
      useApplicationsStore.use.hideFullScreenPrompt();
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

      if (delta.x === 0 && delta.y === 0) {
        return;
      }

      dragStart.current = {x: e.clientX, y: e.clientY};
      if (e.clientY < 10) {
        if (!topTimeout.current) {
          topTimeout.current = window.setTimeout(() => {
            showFullScreenPrompt();
          }, FULL_SCREEN_PROMPT_TIMEOUT);
        }
      } else {
        if (topTimeout.current) {
          window.clearTimeout(topTimeout.current);
          topTimeout.current = null;
        }
        if (fullScreenPrompt) {
          hideFullScreenPrompt();
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
        hideFullScreenPrompt();
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
  }
);

AppHeader.displayName = 'AppHeader';

export default AppHeader;
