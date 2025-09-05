import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Flex, FlexProps} from '@chakra-ui/react';
import {JetBrainsMono} from '@/theme/fonts';
import AppControls from '@/os/AppWindow/AppHeader/AppControls';
import {WindowState} from '@/os/store/types';
import AppTitle from '@/os/AppWindow/AppHeader/AppTitle';
import {useApplicationsStore} from '@/os/store';
import {getClientXY} from '@/os/AppWindow/dragUtils';

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
  onWindowDragStart?: () => void;
  onWindowDragEnd?: () => void;
} & FlexProps;

const AppHeader = React.memo(
  ({
    title,
    state,
    onClose,
    onMove,
    onFullScreen,
    onFullScreenToggle,
    onReduce,
    disableMove,
    onWindowDragStart,
    onWindowDragEnd,
    ...props
  }: AppHeaderProps) => {
    const fullScreenPrompt = useApplicationsStore.use.fullScreenPrompt();
    const showFullScreenPrompt =
      useApplicationsStore.use.showFullScreenPrompt();
    const hideFullScreenPrompt =
      useApplicationsStore.use.hideFullScreenPrompt();
    const topTimeout = useRef<number>(null);
    const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (disableMove || isDragging) {
        return;
      }

      dragStart.current = getClientXY(e);

      if (onWindowDragStart) {
        onWindowDragStart();
      }

      setIsDragging(true);
    };

    const handleDrag = useCallback(
      (e: MouseEvent | TouchEvent) => {
        const client = getClientXY(e);
        if (client.x === 0 && client.y === 0) {
          return;
        }
        const delta = {
          x: client.x - dragStart.current.x,
          y: client.y - dragStart.current.y,
        };

        if (delta.x === 0 && delta.y === 0) {
          return;
        }

        dragStart.current = client;
        if (client.y < 10) {
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
      },
      [fullScreenPrompt, hideFullScreenPrompt, onMove, showFullScreenPrompt]
    );

    const handleDragEnd = useCallback(() => {
      if (topTimeout.current) {
        window.clearTimeout(topTimeout.current);
        topTimeout.current = null;
      }
      if (fullScreenPrompt) {
        hideFullScreenPrompt();
        onFullScreen();
      } else if (onWindowDragEnd) {
        onWindowDragEnd();
      }

      setIsDragging(false);
    }, [fullScreenPrompt, hideFullScreenPrompt, onWindowDragEnd, onFullScreen]);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('touchmove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchend', handleDragEnd);
        return () => {
          document.removeEventListener('mousemove', handleDrag);
          document.removeEventListener('touchmove', handleDrag);
          document.removeEventListener('mouseup', handleDragEnd);
          document.removeEventListener('touchend', handleDragEnd);
        };
      }
    }, [handleDrag, handleDragEnd, isDragging]);

    return (
      <Flex
        px={2}
        py={1}
        bg="#2e333f"
        justifyContent="space-between"
        alignItems="center"
        minHeight="26px"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        {...props}
        className={JetBrainsMono.className}
        direction="row"
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
