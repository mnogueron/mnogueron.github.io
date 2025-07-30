import React, {useCallback, useMemo} from 'react';
import AppWindow from './AppWindow';
import {ResizeDirection} from '@/os/AppWindow/types';
import Applications from '@/applications';
import {useApplicationsStore} from '@/os/store';

type ApplicationProps = {
  id: string;
};

const Application = ({id}: ApplicationProps) => {
  const app = useApplicationsStore(state => state.applications[id]);
  const closeApplication = useApplicationsStore(
    state => state.closeApplication
  );
  const focusApplication = useApplicationsStore(
    state => state.focusApplication
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
  const moveApplication = useApplicationsStore(state => state.moveApplication);
  const resizeApplication = useApplicationsStore(
    state => state.resizeApplication
  );
  const fullScreenApplication = useApplicationsStore(
    state => state.fullScreenApplication
  );
  const reduceApplication = useApplicationsStore(
    state => state.reduceApplication
  );

  const data = useMemo(() => {
    //const application = applications[id];
    if (!app) {
      return;
    }

    return {
      application: app,
      AppComponent: Applications[app.appId],
    };
  }, [app]);

  const handleMove = useCallback(
    (delta: {x: number; y: number}) => {
      moveApplication(id, delta);
    },
    [id, moveApplication]
  );

  const handleResize = useCallback(
    (delta: {x: number; y: number; dir: ResizeDirection}) => {
      resizeApplication(id, delta);
    },
    [id, resizeApplication]
  );

  const handleClose = useCallback(() => {
    closeApplication(id);
  }, [closeApplication, id]);

  const handleFocus = useCallback(() => {
    focusApplication(id);
  }, [focusApplication, id]);

  const handleFullScreen = useCallback(() => {
    fullScreenApplication(id);
  }, [fullScreenApplication, id]);

  const handleFullScreenToggle = useCallback(() => {
    toggleFullScreenApplication(id);
  }, [id, toggleFullScreenApplication]);

  const handleReduce = useCallback(() => {
    reduceApplication(id);
  }, [id, reduceApplication]);

  const handleDragStart = useCallback(() => {
    startDragApplication(id);
  }, [id, startDragApplication]);

  const handleDragEnd = useCallback(() => {
    endDragApplication(id);
  }, [endDragApplication, id]);

  if (!data?.AppComponent) {
    return null;
  }

  const {AppComponent, application} = data;

  return (
    <AppWindow
      state={application.state}
      positions={application.positions}
      isReduced={application.isReduced}
      priority={application.priority}
      onClose={handleClose}
      onFullScreen={handleFullScreen}
      onReduce={handleReduce}
      onResize={handleResize}
      onMove={handleMove}
      onFocus={handleFocus}
      onFullScreenToggle={handleFullScreenToggle}
      title={AppComponent.config.appTitle}
      disableResize={AppComponent.config.disableResize}
      disableMove={AppComponent.config.disableMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <AppComponent />
    </AppWindow>
  );
};

export default Application;
