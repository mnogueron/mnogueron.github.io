export enum ResizeDirection {
  N = 'n',
  S = 's',
  E = 'e',
  W = 'w',
  NE = 'ne',
  NW = 'nw',
  SE = 'se',
  SW = 'sw',
}

export type ResizeHandler = (delta: {
  x: number;
  y: number;
  dir: ResizeDirection;
}) => void;
