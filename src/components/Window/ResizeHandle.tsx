import React, {useMemo, useRef} from 'react';
import {Box} from '@chakra-ui/react';
import {ResizeDirection, ResizeHandler} from './types';

type ResizeHandleProps = {
  direction: ResizeDirection;
  onResize: ResizeHandler;
};

const ResizeHandle = ({direction, onResize}: ResizeHandleProps) => {
  const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragStart.current = {x: e.clientX, y: e.clientY};

    e.dataTransfer.effectAllowed = 'move';
    document.body.style.cursor = cursor;

    // Disable drag visual effect
    const img = document.createElement('img');
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent drag animation feedback
    e.preventDefault();
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
      dir: direction,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    onResize(delta);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
      dir: direction,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    onResize(delta);
    document.body.style.cursor = 'initial';
  };

  const positionProps = useMemo(() => {
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
          height: '4px',
          bottom: 0,
        };
      case ResizeDirection.E:
        return {
          top: 0,
          bottom: 0,
          width: '4px',
          right: 0,
        };
      case ResizeDirection.W:
        return {
          top: 0,
          bottom: 0,
          width: '4px',
          left: 0,
        };
      case ResizeDirection.NW:
        return {
          top: 0,
          left: 0,
          width: '16px',
          height: '16px',
        };
      case ResizeDirection.NE:
        return {
          top: 0,
          right: 0,
          width: '16px',
          height: '16px',
        };
      case ResizeDirection.SW:
        return {
          bottom: 0,
          left: 0,
          width: '16px',
          height: '16px',
        };
      case ResizeDirection.SE:
        return {
          bottom: 0,
          right: 0,
          width: '16px',
          height: '16px',
        };
    }
  }, [direction]);

  return (
    <Box
      position="absolute"
      {...positionProps}
      cursor={cursor}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    />
  );
};

export default ResizeHandle;
