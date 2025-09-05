import React from 'react';
import ResizeHandle from '@/os/AppWindow/ResizeHandle';
import {ResizeDirection, ResizeHandler} from '@/os/AppWindow/types';

type ResizeHandlersProps = {
  onResize: ResizeHandler;
  onStartResize?: () => void;
};

const ResizeHandlers = ({onResize, onStartResize}: ResizeHandlersProps) => {
  return (
    <>
      <ResizeHandle
        direction={ResizeDirection.E}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.W}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.N}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.S}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.NE}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.NW}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.SE}
        onResize={onResize}
        onStartResize={onStartResize}
      />
      <ResizeHandle
        direction={ResizeDirection.SW}
        onResize={onResize}
        onStartResize={onStartResize}
      />
    </>
  );
};

export default ResizeHandlers;
