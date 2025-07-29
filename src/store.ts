import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {Application, ApplicationRegistry, WindowState} from '@/contexts/types';
import {ApplicationId} from '@/applications/types';
import {ResizeDirection} from '@/os/AppWindow/types';
import Applications from '@/applications';
import {
  getAppPositions,
  getBoundPositions,
  MIN_PADDING,
} from '@/contexts/windowUtils';

const MIN_WINDOW_HEIGHT = 70;
const MIN_WINDOW_WIDTH = 200;

type State = {
  applications: Record<string, Application>;
};

type Getters = {
  getApplicationIds: () => string[];
};

type Actions = {
  openApplication: (
    appId: ApplicationId,
    container: {width: number; height: number},
    state?: WindowState
  ) => void;
  closeApplication: (id: string) => void;
  moveApplication: (
    id: string,
    delta: {x: number; y: number},
    container: {width: number; height: number}
  ) => void;
  resizeApplication: (
    id: string,
    delta: {x: number; y: number; dir: ResizeDirection},
    container: {width: number; height: number}
  ) => void;
  focusApplication: (id: string) => void;
  // updateFullScreenPromptState: (open: boolean) => void;
  fullScreenApplication: (id: string) => void;
  reduceApplication: (id: string) => void;
  toggleFullScreenApplication: (id: string) => void;
  startDragApplication: (id: string) => void;
  endDragApplication: (id: string) => void;
  resizeContainer: (container: {width: number; height: number}) => void;
};

export const useApplicationsStore = create<State & Actions & Getters>()(
  immer((set, getState) => ({
    applications: {},
    getApplicationIds: () => Object.keys(getState().applications),
    focusApplication: (id: string) => {
      set(state => {
        const appPriority = state.applications[id].priority;
        state.applications = Object.entries(
          state.applications
        ).reduce<ApplicationRegistry>((acc, [key, app]) => {
          let priority = app.priority;
          if (app.id === id) {
            priority = Object.values(state.applications).length + 1;
          } else if (priority > appPriority) {
            priority--;
          }
          acc[key] = {
            ...app,
            priority,
            isReduced: app.id === id ? false : app.isReduced,
          };
          return acc;
        }, {});
      });
    },
    openApplication: (
      appId: ApplicationId,
      container: {width: number; height: number},
      windowState = WindowState.DEFAULT
    ) => {
      set(state => {
        console.log('Opening', appId);
        const app = state.applications[appId];

        // If app is already open, focus it
        if (app) {
          state.focusApplication(appId);
          return;
        }

        const Application = Applications[appId];
        if (!Application) {
          return;
        }

        state.applications[appId] = {
          id: appId,
          appId,
          priority: Object.values(state.applications).length + 1,
          positions: getAppPositions(Application.config, container),
          state: windowState,
          isReduced: false,
        };
      });
    },
    closeApplication: (id: string) =>
      set(state => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {[id]: toDelete, ...rest} = state.applications;
        state.applications = rest;
      }),
    moveApplication: (
      id: string,
      delta: {x: number; y: number},
      container: {width: number; height: number}
    ) => {
      set(state => {
        const {x, y} = delta;
        const {positions} = state.applications[id];

        const {top, left} = getBoundPositions(
          {...positions, top: positions.top + y, left: positions.left + x},
          container
        );

        state.applications[id].positions = {
          ...positions,
          top,
          left,
        };
      });
    },
    resizeApplication: (
      id: string,
      delta: {x: number; y: number; dir: ResizeDirection},
      container: {width: number; height: number}
    ) => {
      set(state => {
        const app = state.applications[id];
        const {x, y, dir} = delta;
        const positions = {...app.positions};
        switch (dir) {
          case ResizeDirection.N:
            positions.top += y;
            positions.height -= y;
            break;
          case ResizeDirection.S:
            positions.height += y;
            break;
          case ResizeDirection.E:
            positions.width += x;
            break;
          case ResizeDirection.W:
            positions.left += x;
            positions.width -= x;
            break;
          case ResizeDirection.NE:
            positions.top += y;
            positions.width += x;
            positions.height -= y;
            break;
          case ResizeDirection.NW:
            positions.top += y;
            positions.left += x;
            positions.width -= x;
            positions.height -= y;
            break;
          case ResizeDirection.SE:
            positions.height += y;
            positions.width += x;
            break;
          case ResizeDirection.SW:
            positions.height += y;
            positions.left += x;
            positions.width -= x;
            break;
        }

        const Application = Applications[app.appId];
        const minWidth = Application.config.minWidth || MIN_WINDOW_WIDTH;
        const minHeight = Application.config.minHeight || MIN_WINDOW_HEIGHT;

        let width = Math.max(positions.width, minWidth);
        let height = Math.max(positions.height, minHeight);

        // Constrain resizable window to the document border
        if (width + positions.left > container.width) {
          width = container.width - positions.left;
        }

        if (height + positions.top > container.height) {
          height = container.height - positions.top;
        }

        state.applications[id].positions = {
          top: height === MIN_WINDOW_HEIGHT ? app.positions.top : positions.top,
          left:
            width === MIN_WINDOW_WIDTH ? app.positions.left : positions.left,
          width,
          height,
        };
      });
    },
    fullScreenApplication: (id: string) => {
      set(state => {
        state.applications[id].state = WindowState.FULL_SCREEN;
      });
    },
    reduceApplication: (id: string) => {
      set(state => {
        state.applications[id].isReduced = true;
      });
    },
    toggleFullScreenApplication: (id: string) => {
      set(state => {
        const app = state.applications[id];
        // TODO simplify
        state.applications[id] = {
          ...app,
          ...(app.state === WindowState.FULL_SCREEN
            ? {
                positions: app.trackedPositions || app.positions,
                trackedPositions: undefined,
              }
            : {}),
          state:
            app.state === WindowState.FULL_SCREEN
              ? WindowState.DEFAULT
              : WindowState.FULL_SCREEN,
        };
      });
    },
    startDragApplication: (id: string) => {
      set(state => {
        state.applications[id].trackedPositions =
          state.applications[id].positions;
      });
    },
    endDragApplication: (id: string) => {
      set(state => {
        state.applications[id].trackedPositions = undefined;
      });
    },
    resizeContainer: (container: {width: number; height: number}) => {
      set(state => {
        state.applications = Object.entries(state.applications).reduce<{
          [key: string]: Application;
        }>((acc, [key, app]) => {
          const positions = {...app.positions};

          if (app.state === WindowState.FULL_SCREEN) {
            positions.height = container.height;
            positions.width = container.width;
          } else {
            if (positions.height > container.height - 2 * MIN_PADDING) {
              positions.top = MIN_PADDING;
              positions.height = container.height - 2 * MIN_PADDING;
            }

            if (positions.width > container.width - 2 * MIN_PADDING) {
              positions.left = MIN_PADDING;
              positions.width = container.width - 2 * MIN_PADDING;
            }
          }

          acc[key] = {
            ...app,
            positions,
          };
          return acc;
        }, {});
      });
    },
  }))
);
