import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Box} from '@chakra-ui/react';
import {ResizeDirection, ResizeHandler} from './types';
import {getClientXY} from '@/os/AppWindow/dragUtils';

type ResizeHandleProps = {
  direction: ResizeDirection;
  onResize: ResizeHandler;
};

const ResizeHandle = ({direction, onResize}: ResizeHandleProps) => {
  const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);

  const cursor = useMemo(() => {
    switch (direction) {
      case ResizeDirection.N:
      case ResizeDirection.S:
        return `ns-resize`;
      case ResizeDirection.E:
      case ResizeDirection.W:
        return `ew-resize`;
      case ResizeDirection.NE:
      case ResizeDirection.SW:
        return `nesw-resize`;
      case ResizeDirection.NW:
      case ResizeDirection.SE:
        return `nwse-resize`;
    }
  }, [direction]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    dragStart.current = getClientXY(e);

    setIsDragging(true);
    document.body.style.userSelect = 'none';
  };

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const client = getClientXY(e);
      if (client.x === 0 && client.y === 0) {
        return;
      }
      const delta = {
        x: client.x - dragStart.current.x,
        y: client.y - dragStart.current.y,
        dir: direction,
      };
      dragStart.current = client;
      onResize(delta);
    },
    [direction, onResize]
  );

  const handleDragEnd = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    document.body.style.userSelect = null;
    setIsDragging(false);
  }, []);

  const positionProps = useMemo(() => {
    const sideSize = {base: '24px', md: '4px'};
    const cornerSize = {base: '30px', md: '16px'};
    switch (direction) {
      case ResizeDirection.N:
        return {
          left: 0,
          right: 0,
          height: '4px',
          top: 0,
        };
      case ResizeDirection.S:
        return {
          left: 0,
          right: 0,
          height: sideSize,
          bottom: 0,
        };
      case ResizeDirection.E:
        return {
          top: 0,
          bottom: 0,
          width: sideSize,
          right: 0,
        };
      case ResizeDirection.W:
        return {
          top: 0,
          bottom: 0,
          width: sideSize,
          left: 0,
        };
      case ResizeDirection.NW:
        return {
          top: 0,
          left: 0,
          width: cornerSize,
          height: cornerSize,
        };
      case ResizeDirection.NE:
        return {
          top: 0,
          right: 0,
          width: cornerSize,
          height: cornerSize,
        };
      case ResizeDirection.SW:
        return {
          bottom: 0,
          left: 0,
          width: cornerSize,
          height: cornerSize,
        };
      case ResizeDirection.SE:
        return {
          bottom: 0,
          right: 0,
          width: cornerSize,
          height: cornerSize,
        };
    }
  }, [direction]);

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
    <Box
      position="absolute"
      {...positionProps}
      cursor={cursor}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    />
  );
};

export default ResizeHandle;
