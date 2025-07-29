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
import {ResizeDirection} from '@/os/AppWindow/types';
import useMeasure from 'react-use-measure';
import {ApplicationRegistry, WindowState} from './types';
import {useApplicationsStore} from '@/store';

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

// TODO when opening an app, keep track of where it was last opened and its last size
// TODO improve this whole provider to improve readability and maintainability
// TODO handle storing window positions in localStorage to reuse for next launch
// TODO keep track of opened app in localStorage to reopen after refresh
// TODO improve how to handle full screen to not rely on width 100%
// TODO consider thinking about how data flows from this component to the window component
const WindowAppProvider = ({children}: WindowAppProviderProps) => {
  const hydrating = useRef(true);
  const [containerRef, {width: containerWidth, height: containerHeight}] =
    useMeasure();
  const applications = useApplicationsStore(state => state.applications);
  const openApplicationZST = useApplicationsStore(
    state => state.openApplication
  );
  const closeApplication = useApplicationsStore(
    state => state.closeApplication
  );
  const focusApplication = useApplicationsStore(
    state => state.focusApplication
  );
  const moveApplicationZST = useApplicationsStore(
    state => state.moveApplication
  );
  const resizeApplicationZST = useApplicationsStore(
    state => state.resizeApplication
  );
  const fullScreenApplicationZST = useApplicationsStore(
    state => state.fullScreenApplication
  );
  const reduceApplicationZST = useApplicationsStore(
    state => state.reduceApplication
  );
  const toggleFullScreenApplication = useApplicationsStore(
    state => state.toggleFullScreenApplication
  );
  const startDragApplication = useApplicationsStore(
    state => state.startDragApplication
  );
  const endDragApplication = useApplicationsStore(
    state => state.endDragApplication
  );
  const resizeContainer = useApplicationsStore(state => state.resizeContainer);
  const [fullScreenPrompt, setFullScreenPrompt] = useState(
    defaultWindowAppValue.fullScreenPrompt
  );

  const openApplication = useCallback(
    (appId: ApplicationId, state = WindowState.DEFAULT) => {
      openApplicationZST(
        appId,
        {width: containerWidth, height: containerHeight},
        state
      );
    },
    [containerHeight, containerWidth, openApplicationZST]
  );

  const moveApplication = useCallback(
    (id: string, delta: {x: number; y: number}) => {
      moveApplicationZST(id, delta, {
        width: containerWidth,
        height: containerHeight,
      });
    },
    [containerHeight, containerWidth, moveApplicationZST]
  );

  const resizeApplication = useCallback(
    (id: string, delta: {x: number; y: number; dir: ResizeDirection}) => {
      resizeApplicationZST(id, delta, {
        width: containerWidth,
        height: containerHeight,
      });
    },
    [containerHeight, containerWidth, resizeApplicationZST]
  );

  const updateFullScreenPromptState = useCallback((open: boolean) => {
    setFullScreenPrompt(open);
  }, []);

  const fullScreenApplication = useCallback(
    (id: string) => {
      updateFullScreenPromptState(false);
      fullScreenApplicationZST(id);
    },
    [fullScreenApplicationZST, updateFullScreenPromptState]
  );

  const reduceApplication = useCallback(
    (id: string) => {
      updateFullScreenPromptState(false);
      reduceApplicationZST(id);
    },
    [reduceApplicationZST, updateFullScreenPromptState]
  );

  // TODO improve logic for rehydrating applications and avoid opening app on container dimensions update
  //  This forces the deps to ignore openApplication
  // TODO improve how to handle resizing and move window when the container resizes
  useLayoutEffect(() => {
    if (hydrating.current && containerHeight > 0 && containerWidth > 0) {
      openApplication(ApplicationId.LANDING_TEXT_ANIMATOR);
      hydrating.current = false;
    }
    resizeContainer({width: containerWidth, height: containerHeight});
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
