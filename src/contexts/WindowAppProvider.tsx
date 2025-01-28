import React, {createContext, useCallback, useMemo, useState} from 'react';
import {ApplicationId} from '@/applications/types';

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
  applications: Application[];
  openApplication: (
    appId: ApplicationId,
    priority: number,
    positions: Positions,
    state: WindowState
  ) => void;
  closeApplication: (id: string) => void;
  updateContainerSize: (height: number, width: number) => void;
};

const defaultWindowAppValue: WindowApp = {
  applications: [],
  openApplication: () => {},
  closeApplication: () => {},
  updateContainerSize: () => {},
};

export const MIN_PADDING = 12;

export const WindowAppContext = createContext<WindowApp>(defaultWindowAppValue);

type WindowAppProviderProps = {
  children: React.ReactNode;
};

const WindowAppProvider = ({children}: WindowAppProviderProps) => {
  const [applications, setApplications] = useState<Application[]>(
    defaultWindowAppValue.applications
  );

  const openApplication = useCallback(
    (
      appId: ApplicationId,
      priority: number,
      positions: Positions,
      state = WindowState.DEFAULT
    ) => {
      console.log('Opening', appId);
      const app = applications.find(a => a.appId === appId);
      if (app) {
        // TODO improve priority to not have to deal with window ordering
        setApplications(apps => [...apps.filter(a => a.id !== app.id), app]);
        return;
      }

      // TODO handle multiple app
      setApplications(apps => [
        ...apps,
        {
          id: appId,
          appId,
          priority,
          positions,
          state,
        },
      ]);
    },
    [applications]
  );

  const closeApplication = useCallback((id: string) => {
    setApplications(apps => apps.filter(a => a.id !== id));
  }, []);

  const updateContainerSize = useCallback(
    (containerHeight: number, containerWidth: number) => {
      setApplications(apps =>
        apps.map(a => {
          const positions = a.positions;
          if (positions.height > containerHeight - 2 * MIN_PADDING) {
            positions.height = containerHeight - 2 * MIN_PADDING;
          }

          if (positions.width > containerWidth - 2 * MIN_PADDING) {
            positions.width = containerWidth - 2 * MIN_PADDING;
          }
          return {
            ...a,
            positions,
          };
        })
      );
    },
    []
  );

  // TODO handle resizing
  //const resizeApplication = () => {};

  const contextValue = useMemo<WindowApp>(() => {
    return {
      applications,
      openApplication,
      closeApplication,
      updateContainerSize,
    };
  }, [applications, closeApplication, openApplication, updateContainerSize]);

  return <WindowAppContext value={contextValue}>{children}</WindowAppContext>;
};

export default WindowAppProvider;
