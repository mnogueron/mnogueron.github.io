import {ApplicationId} from '@/applications/types';

export enum WindowState {
  FULL_SCREEN = 'full_screen',
  DEFAULT = 'default',
}

export type Positions = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type Application = {
  id: string; // The unique id of the window
  appId: ApplicationId; // Used to retrieve the correct application to bind to the Window
  priority: number;
  positions: Positions;
  trackedPositions?: Positions; // Only used when we want to track the previous positions before a full screen
  state: WindowState;
  isReduced: boolean;
};

export type ApplicationRegistry = {[key: string]: Application};
