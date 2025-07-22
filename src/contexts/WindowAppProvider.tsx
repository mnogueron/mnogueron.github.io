import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ApplicationId} from '@/applications/types';
import {ResizeDirection} from '@/components/AppWindow/types';
import useMeasure from 'react-use-measure';
import Applications from '@/applications';
import {MIN_PADDING, MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH} from '@/constants';
import {
  getApplicationPreferredSize,
  getBoundPositions,
} from '@/contexts/windowUtils';
import {Application, ApplicationRegistry, WindowState} from './types';

type WindowApp = {
  applications: ApplicationRegistry;
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
  reduceApplication: (id: string) => void;
  toggleFullScreenApplication: (id: string) => void;
  startDragApplication: (id: string) => void;
  endDragApplication: (id: string) => void;
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
  reduceApplication: () => {},
  toggleFullScreenApplication: () => {},
  startDragApplication: () => {},
  endDragApplication: () => {},
};

export const WindowAppContext = createContext<WindowApp>(defaultWindowAppValue);

export const useWindowAppContext = () => useContext(WindowAppContext);

export const useApplications = () => {
  const {applications} = useWindowAppContext();
  return applications;
};

type WindowAppProviderProps = {
  children: React.ReactNode;
};

const WindowAppProvider = ({children}: WindowAppProviderProps) => {
  const hydrating = useRef(true);
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
      return Object.entries(apps).reduce<ApplicationRegistry>(
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
            isReduced: app.id === id ? false : app.isReduced,
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

      let positions = {
        top: MIN_PADDING,
        left: MIN_PADDING,
        width: 0,
        height: 0,
      };
      if (application.getStaticBox) {
        positions = application.getStaticBox({
          width: containerWidth,
          height: containerHeight,
        });
      } else {
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

        // TODO improve logic to show multiple windows on different top values
        if (containerWidth < 800 && width >= containerWidth - 2 * MIN_PADDING) {
          positions.top = Math.max((containerHeight - height) / 2, 0);
        }

        // TODO improve how the app lays out the applications
        //top: MIN_PADDING + 32 * Object.values(apps).length,
        //left: MIN_PADDING + 32 * Object.values(apps).length,

        positions = {
          ...positions,
          width,
          height,
        };
      }

      // TODO handle multiple app
      setApplications(apps => ({
        ...apps,
        [appId]: {
          id: appId,
          appId,
          priority: Object.values(apps).length + 1,
          positions,
          state,
          isReduced: false,
        },
      }));
    },
    [applications, containerHeight, containerWidth, focusApplication]
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

        const Application = Applications[app.appId];
        const minWidth = Application.minWidth || MIN_WINDOW_WIDTH;
        const minHeight = Application.minHeight || MIN_WINDOW_HEIGHT;

        let width = Math.max(positions.width, minWidth);
        let height = Math.max(positions.height, minHeight);

        // Constrain resizable window to the document border
        if (width + positions.left > containerWidth) {
          width = containerWidth - positions.left;
        }

        if (height + positions.top > containerHeight) {
          height = containerHeight - positions.top;
        }

        return {
          ...apps,
          [id]: {
            ...app,
            positions: {
              top:
                height === MIN_WINDOW_HEIGHT
                  ? app.positions.top
                  : positions.top,
              left:
                width === MIN_WINDOW_WIDTH
                  ? app.positions.left
                  : positions.left,
              width,
              height,
            },
          },
        };
      });
    },
    [containerHeight, containerWidth]
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
            state: WindowState.FULL_SCREEN,
          },
        };
      });
    },
    [updateFullScreenPromptState]
  );

  const reduceApplication = useCallback(
    (id: string) => {
      updateFullScreenPromptState(false);
      setApplications(apps => {
        const app = apps[id];
        return {
          ...apps,
          [id]: {
            ...app,
            isReduced: true,
          },
        };
      });
    },
    [updateFullScreenPromptState]
  );

  const toggleFullScreenApplication = useCallback((id: string) => {
    setApplications(apps => {
      const app = apps[id];
      return {
        ...apps,
        [id]: {
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
        },
      };
    });
  }, []);

  const startDragApplication = useCallback((id: string) => {
    setApplications(apps => {
      const app = apps[id];
      return {
        ...apps,
        [id]: {
          ...app,
          trackedPositions: app.positions,
        },
      };
    });
  }, []);

  const endDragApplication = useCallback((id: string) => {
    setApplications(apps => {
      const app = apps[id];
      return {
        ...apps,
        [id]: {
          ...app,
          trackedPositions: undefined,
        },
      };
    });
  }, []);

  // TODO improve logic for rehydrating applications and avoid opening app on container dimensions update
  //  This forces the deps to ignore openApplication
  // TODO improve how to handle resizing and move window when the container resizes
  useLayoutEffect(() => {
    if (hydrating.current && containerHeight > 0 && containerWidth > 0) {
      openApplication(ApplicationId.LANDING_TEXT_ANIMATOR);
      hydrating.current = false;
    }
    setApplications(apps =>
      Object.entries(apps).reduce<{[key: string]: Application}>(
        (acc, [key, app]) => {
          const positions = {...app.positions};

          if (app.state === WindowState.FULL_SCREEN) {
            positions.height = containerHeight;
            positions.width = containerWidth;
          } else {
            if (positions.height > containerHeight - 2 * MIN_PADDING) {
              positions.top = MIN_PADDING;
              positions.height = containerHeight - 2 * MIN_PADDING;
            }

            if (positions.width > containerWidth - 2 * MIN_PADDING) {
              positions.left = MIN_PADDING;
              positions.width = containerWidth - 2 * MIN_PADDING;
            }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      reduceApplication,
      toggleFullScreenApplication,
      startDragApplication,
      endDragApplication,
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
    reduceApplication,
    toggleFullScreenApplication,
    startDragApplication,
    endDragApplication,
  ]);

  return <WindowAppContext value={contextValue}>{children}</WindowAppContext>;
};

export default WindowAppProvider;
