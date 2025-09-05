import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {persist} from 'zustand/middleware';
import {Application, ApplicationRegistry, WindowState} from '@/os/store/types';
import {ApplicationId} from '@/applications/types';
import {ResizeDirection} from '@/os/AppWindow/types';
import Applications from '@/applications';
import {
  getAppPositions,
  getBoundPositions,
  MIN_PADDING,
} from '@/os/store/windowUtils';
import {createSelectors} from '@/os/store/createSelectors';

const MIN_WINDOW_HEIGHT = 70;
const MIN_WINDOW_WIDTH = 200;

// TODO improve how to handle full screen to not rely on width 100%
type State = {
  applications: ApplicationRegistry;
  container: {width: number; height: number};
  fullScreenPrompt: boolean;
};

type Actions = {
  hideFullScreenPrompt: () => void;
  showFullScreenPrompt: () => void;
  setContainerDimensions: (container: {width: number; height: number}) => void;
  openApplication: (appId: ApplicationId, state?: WindowState) => void;
  closeApplication: (id: string) => void;
  moveApplication: (id: string, delta: {x: number; y: number}) => void;
  resizeApplication: (
    id: string,
    delta: {x: number; y: number; dir: ResizeDirection}
  ) => void;
  focusApplication: (id: string) => void;
  fullScreenApplication: (id: string) => void;
  windowedApplication: (id: string) => void;
  setWindowMode: (id: string, windowState: WindowState) => void;
  reduceApplication: (id: string) => void;
  toggleFullScreenApplication: (id: string) => void;
  startDragApplication: (id: string) => void;
  endDragApplication: (id: string) => void;
  resizeContainer: () => void;
};

const useApplicationsStoreBase = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      applications: {},
      fullScreenPrompt: false,
      hideFullScreenPrompt: () =>
        set(state => {
          if (state.fullScreenPrompt) {
            state.fullScreenPrompt = false;
          }
        }),
      showFullScreenPrompt: () =>
        set(state => {
          if (!state.fullScreenPrompt) {
            state.fullScreenPrompt = true;
          }
        }),
      container: {width: 0, height: 0},
      setContainerDimensions: (container: {width: number; height: number}) =>
        set(state => {
          state.container = container;
          state.resizeContainer();
        }),
      focusApplication: (id: string) => {
        console.log('focus', id);
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
        windowState = WindowState.WINDOWED
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
            positions: getAppPositions(Application.config, state.container),
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
      moveApplication: (id: string, delta: {x: number; y: number}) => {
        set(state => {
          const {x, y} = delta;
          const {positions} = state.applications[id];

          const {top, left} = getBoundPositions(
            {...positions, top: positions.top + y, left: positions.left + x},
            state.container
          );

          state.applications[id].positions.top = top;
          state.applications[id].positions.left = left;
        });
      },
      resizeApplication: (
        id: string,
        delta: {x: number; y: number; dir: ResizeDirection}
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
          if (width + positions.left > state.container.width) {
            width = state.container.width - positions.left;
          }

          if (height + positions.top > state.container.height) {
            height = state.container.height - positions.top;
          }

          state.applications[id].positions = {
            top:
              height === MIN_WINDOW_HEIGHT ? app.positions.top : positions.top,
            left:
              width === MIN_WINDOW_WIDTH ? app.positions.left : positions.left,
            width,
            height,
          };
        });
      },
      fullScreenApplication: (id: string) => {
        set(state => {
          const app = state.applications[id];
          state.hideFullScreenPrompt();
          state.applications[id].trackedPositions = app.positions;
          state.applications[id].positions = {
            left: 0,
            top: 0,
            width: state.container.width,
            height: state.container.height,
          };
          state.applications[id].state = WindowState.FULL_SCREEN;
        });
      },
      windowedApplication: (id: string) => {
        set(state => {
          const app = state.applications[id];
          state.hideFullScreenPrompt();
          state.applications[id].positions =
            app.trackedPositions || app.positions;
          state.applications[id].trackedPositions = undefined;
          state.applications[id].state = WindowState.WINDOWED;
        });
      },
      setWindowMode: (id: string, windowState: WindowState) => {
        const state = get();
        if (state.applications[id].state === windowState) {
          return;
        }

        switch (windowState) {
          case WindowState.FULL_SCREEN:
            state.fullScreenApplication(id);
            break;
          case WindowState.WINDOWED:
            state.windowedApplication(id);
            break;
        }
      },
      reduceApplication: (id: string) => {
        set(state => {
          state.hideFullScreenPrompt();
          state.applications[id].isReduced = true;
        });
      },
      toggleFullScreenApplication: (id: string) => {
        const state = get();
        state.setWindowMode(
          id,
          state.applications[id].state === WindowState.FULL_SCREEN
            ? WindowState.WINDOWED
            : WindowState.FULL_SCREEN
        );
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
      resizeContainer: () => {
        set(state => {
          const {container} = state;
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
    })),
    {name: 'os'}
  )
);

export const useApplicationsStore = createSelectors(useApplicationsStoreBase);
