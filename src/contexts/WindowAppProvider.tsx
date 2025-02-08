import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {ApplicationId} from '@/applications/types';
import {ResizeDirection} from '@/components/Window/types';
import useMeasure from 'react-use-measure';
import Applications from '@/applications';
import {MIN_PADDING} from '@/constants';
import {getApplicationPreferredSize} from '@/contexts/windowUtils';

export enum WindowState {
  REDUCED = 'reduced',
  FULL_SCREEN = 'full_screen',
  DEFAULT = 'default',
}

type Positions = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type Application = {
  id: string; // The unique id of the window
  appId: ApplicationId; // Used to retrieve the correct application to bind to the Window
  priority: number;
  positions: Positions;
  trackedPositions?: Positions; // Only used when we want to track the previous positions before a full screen
  state: WindowState;
};

type WindowApp = {
  applications: {[key: string]: Application};
  containerRef: React.Ref<HTMLOrSVGElement>;
  fullScreenPrompt: boolean;
  openApplication: (appId: ApplicationId, state?: WindowState) => void;
  closeApplication: (id: string) => void;
  moveApplication: (id: string, delta: {x: number; y: number}) => void;
  resizeApplication: (
    id: string,
    delta: {x: number; y: number; dir: ResizeDirection}
  ) => void;
  focusApplication: (id: string) => void;
  updateFullScreenPromptState: (open: boolean) => void;
  fullScreenApplication: (id: string) => void;
  toggleFullScreenApplication: (id: string) => void;
};

const defaultWindowAppValue: WindowApp = {
  applications: {},
  containerRef: null,
  fullScreenPrompt: false,
  openApplication: () => {},
  closeApplication: () => {},
  moveApplication: () => {},
  resizeApplication: () => {},
  focusApplication: () => {},
  updateFullScreenPromptState: () => {},
  fullScreenApplication: () => {},
  toggleFullScreenApplication: () => {},
};

export const WindowAppContext = createContext<WindowApp>(defaultWindowAppValue);

type WindowAppProviderProps = {
  children: React.ReactNode;
};

const getBoundPositions = (
  positions: Positions,
  containerWidth: number,
  containerHeight: number
) => {
  let top = Math.max(positions.top, 0);
  let left = Math.max(positions.left, 0);
  if (left + positions.width > containerWidth) {
    left = containerWidth - positions.width;
  }
  if (top + positions.height > containerHeight) {
    top = containerHeight - positions.height;
  }
  return {left, top};
};

const WindowAppProvider = ({children}: WindowAppProviderProps) => {
  const [containerRef, {width: containerWidth, height: containerHeight}] =
    useMeasure();
  const [applications, setApplications] = useState(
    defaultWindowAppValue.applications
  );
  const [fullScreenPrompt, setFullScreenPrompt] = useState(
    defaultWindowAppValue.fullScreenPrompt
  );

  const focusApplication = useCallback((id: string) => {
    setApplications(apps => {
      const appPriority = apps[id].priority;
      return Object.entries(apps).reduce<{[key: string]: Application}>(
        (acc, [key, app]) => {
          let priority = app.priority;
          if (app.id === id) {
            priority = Object.values(apps).length + 1;
          } else if (priority > appPriority) {
            priority--;
          }
          acc[key] = {
            ...app,
            priority,
          };
          return acc;
        },
        {}
      );
    });
  }, []);

  const openApplication = useCallback(
    (appId: ApplicationId, state = WindowState.DEFAULT) => {
      console.log('Opening', appId);
      const app = applications[appId];

      // If app is already open, focus it
      if (app) {
        focusApplication(appId);
        return;
      }

      const application = Applications[appId];
      if (!application) {
        return;
      }

      const {width, height} = getApplicationPreferredSize(
        {
          width: containerWidth,
          height: containerHeight,
        },
        application.preferredRatio,
        application.preferredRatioMobile,
        application.maxApplicationHeight,
        application.minMobileRatio
      );

      let top = MIN_PADDING;
      const left = MIN_PADDING;

      // TODO improve logic to show multiple windows on different top values
      if (containerWidth < 800 && width >= containerWidth - 2 * MIN_PADDING) {
        top = Math.max((containerHeight - height) / 2, 0);
      }

      // TODO improve how the app lays out the applications
      //top: MIN_PADDING + 32 * Object.values(apps).length,
      //left: MIN_PADDING + 32 * Object.values(apps).length,

      // TODO handle multiple app
      setApplications(apps => ({
        ...apps,
        [appId]: {
          id: appId,
          appId,
          priority: Object.values(apps).length + 1,
          positions: {
            top,
            left,
            height,
            width,
          },
          state,
        },
      }));
    },
    [applications, focusApplication]
  );

  const closeApplication = useCallback((id: string) => {
    setApplications(apps => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[id]: toDelete, ...rest} = apps;
      return rest;
    });
  }, []);

  const moveApplication = useCallback(
    (id: string, delta: {x: number; y: number}) => {
      setApplications(apps => {
        const app = apps[id];
        const {x, y} = delta;
        const {positions} = app;

        const {top, left} = getBoundPositions(
          {...positions, top: positions.top + y, left: positions.left + x},
          containerWidth,
          containerHeight
        );

        return {
          ...apps,
          [id]: {
            ...app,
            positions: {
              ...positions,
              top,
              left,
            },
          },
        };
      });
    },
    [containerHeight, containerWidth]
  );

  const resizeApplication = useCallback(
    (id: string, delta: {x: number; y: number; dir: ResizeDirection}) => {
      setApplications(apps => {
        const app = apps[id];
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
        return {
          ...apps,
          [id]: {
            ...app,
            positions: positions,
          },
        };
      });
    },
    []
  );

  const updateFullScreenPromptState = useCallback((open: boolean) => {
    setFullScreenPrompt(open);
  }, []);

  const fullScreenApplication = useCallback(
    (id: string) => {
      updateFullScreenPromptState(false);
      setApplications(apps => {
        const app = apps[id];
        return {
          ...apps,
          [id]: {
            ...app,
            positions: {
              top: 0,
              left: 0,
              width: containerWidth,
              height: containerHeight,
            },
            trackedPositions: app.positions,
            state: WindowState.FULL_SCREEN,
          },
        };
      });
    },
    [containerHeight, containerWidth, updateFullScreenPromptState]
  );

  const toggleFullScreenApplication = useCallback(
    (id: string) => {
      setApplications(apps => {
        const app = apps[id];

        if (app.state !== WindowState.FULL_SCREEN) {
          return {
            ...apps,
            [id]: {
              ...app,
              positions: {
                top: 0,
                left: 0,
                width: containerWidth,
                height: containerHeight,
              },
              trackedPositions: app.positions,
              state: WindowState.FULL_SCREEN,
            },
          };
        }

        if (app.trackedPositions) {
          return {
            ...apps,
            [id]: {
              ...app,
              positions: app.trackedPositions,
              state: WindowState.DEFAULT,
            },
          };
        }

        return apps;
      });
    },
    [containerHeight, containerWidth]
  );

  useLayoutEffect(() => {
    setApplications(apps =>
      Object.entries(apps).reduce<{[key: string]: Application}>(
        (acc, [key, app]) => {
          const positions = {...app.positions};
          if (positions.height > containerHeight - 2 * MIN_PADDING) {
            positions.height = containerHeight - 2 * MIN_PADDING;
          }

          if (positions.width > containerWidth - 2 * MIN_PADDING) {
            positions.width = containerWidth - 2 * MIN_PADDING;
          }

          acc[key] = {
            ...app,
            positions,
          };
          return acc;
        },
        {}
      )
    );
  }, [containerHeight, containerWidth]);

  const contextValue = useMemo<WindowApp>(() => {
    return {
      applications,
      containerRef,
      fullScreenPrompt,
      openApplication,
      closeApplication,
      moveApplication,
      resizeApplication,
      focusApplication,
      updateFullScreenPromptState,
      fullScreenApplication,
      toggleFullScreenApplication,
    };
  }, [
    applications,
    containerRef,
    fullScreenPrompt,
    openApplication,
    closeApplication,
    moveApplication,
    resizeApplication,
    focusApplication,
    updateFullScreenPromptState,
    fullScreenApplication,
    toggleFullScreenApplication,
  ]);

  return <WindowAppContext value={contextValue}>{children}</WindowAppContext>;
};

export default WindowAppProvider;
