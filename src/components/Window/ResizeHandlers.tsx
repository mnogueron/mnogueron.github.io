import React from 'react';
import ResizeHandle from '@/components/Window/ResizeHandle';
import {ResizeDirection, ResizeHandler} from '@/components/Window/types';

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
