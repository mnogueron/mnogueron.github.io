import React, {createContext, useCallback, useMemo, useState} from 'react';
import {ApplicationId} from '@/applications/types';
import {ResizeDirection} from '@/components/Window/types';

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
  state: WindowState;
};

type WindowApp = {
  applications: {[key: string]: Application};
  openApplication: (
    appId: ApplicationId,
    positions: Positions,
    state: WindowState
  ) => void;
  closeApplication: (id: string) => void;
  updateContainerSize: (height: number, width: number) => void;
  moveApplication: (id: string, delta: {x: number; y: number}) => void;
  resizeApplication: (
    id: string,
    delta: {x: number; y: number; dir: ResizeDirection}
  ) => void;
  focusApplication: (id: string) => void;
};

const defaultWindowAppValue: WindowApp = {
  applications: {},
  openApplication: () => {},
  closeApplication: () => {},
  updateContainerSize: () => {},
  moveApplication: () => {},
  resizeApplication: () => {},
  focusApplication: () => {},
};

export const MIN_PADDING = 12;

export const WindowAppContext = createContext<WindowApp>(defaultWindowAppValue);

type WindowAppProviderProps = {
  children: React.ReactNode;
};

const WindowAppProvider = ({children}: WindowAppProviderProps) => {
  const [applications, setApplications] = useState(
    defaultWindowAppValue.applications
  );

  const openApplication = useCallback(
    (
      appId: ApplicationId,
      positions: Positions,
      state = WindowState.DEFAULT
    ) => {
      console.log('Opening', appId);
      const app = applications[appId];
      if (app) {
        // TODO improve priority to not have to deal with window ordering
        focusApplication(appId);
        return;
      }

      // TODO handle multiple app
      setApplications(apps => ({
        ...apps,
        [appId]: {
          id: appId,
          appId,
          priority: Object.values(apps).length,
          positions,
          state,
        },
      }));
    },
    [applications]
  );

  const closeApplication = useCallback((id: string) => {
    setApplications(apps => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {[id]: toDelete, ...rest} = apps;
      return rest;
    });
  }, []);

  const updateContainerSize = useCallback(
    (containerHeight: number, containerWidth: number) => {
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
    },
    []
  );

  // TODO keep track of the container width and height to know where it is
  const moveApplication = useCallback(
    (id: string, delta: {x: number; y: number}) => {
      setApplications(apps => {
        const app = apps[id];
        const {x, y} = delta;
        const {positions} = app;
        return {
          ...apps,
          [id]: {
            ...app,
            positions: {
              ...positions,
              top: positions.top + y,
              left: positions.left + x,
            },
          },
        };
      });
    },
    []
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

  const focusApplication = useCallback((id: string) => {
    setApplications(apps => {
      const appPriority = apps[id].priority;
      return Object.entries(apps).reduce<{[key: string]: Application}>(
        (acc, [key, app]) => {
          let priority = app.priority;
          if (app.id === id) {
            priority = Object.values(apps).length;
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

  const contextValue = useMemo<WindowApp>(() => {
    return {
      applications: applications,
      openApplication,
      closeApplication,
      updateContainerSize,
      moveApplication,
      resizeApplication,
      focusApplication,
    };
  }, [
    applications,
    openApplication,
    closeApplication,
    updateContainerSize,
    moveApplication,
    resizeApplication,
    focusApplication,
  ]);

  return <WindowAppContext value={contextValue}>{children}</WindowAppContext>;
};

export default WindowAppProvider;
