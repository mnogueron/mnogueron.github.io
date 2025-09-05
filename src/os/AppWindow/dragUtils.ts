import React from 'react';

export const EMPTY_DRAG_IMAGE = new Image(1, 1);
EMPTY_DRAG_IMAGE.src =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export const getClientXY = (
  e:
    | React.MouseEvent<HTMLDivElement>
    | React.TouchEvent<HTMLDivElement>
    | MouseEvent
    | TouchEvent
): {x: number; y: number} => {
  if (typeof (e as TouchEvent).touches !== 'undefined') {
    const event = e as TouchEvent;
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  const event = e as MouseEvent;
  return {
    x: event.clientX,
    y: event.clientY,
  };
};
