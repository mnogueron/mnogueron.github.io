import React from 'react';
import ResizeHandle from '@/os/AppWindow/ResizeHandle';
import {ResizeDirection, ResizeHandler} from '@/os/AppWindow/types';

type ResizeHandlersProps = {
  onResize: ResizeHandler;
};

const ResizeHandlers = ({onResize}: ResizeHandlersProps) => {
  return (
    <>
      <ResizeHandle direction={ResizeDirection.E} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.W} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.N} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.S} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.NE} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.NW} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.SE} onResize={onResize} />
      <ResizeHandle direction={ResizeDirection.SW} onResize={onResize} />
    </>
  );
};

export default ResizeHandlers;
