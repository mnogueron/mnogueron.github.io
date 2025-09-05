import React, {useCallback, useMemo} from 'react';
import AppWindow from './AppWindow';
import {ResizeDirection} from '@/os/AppWindow/types';
import Applications from '@/applications';
import {useApplicationsStore} from '@/os/store';

type ApplicationProps = {
  id: string;
};

const Application = React.memo(({id}: ApplicationProps) => {
  const app = useApplicationsStore(state => state.applications[id]);
  const closeApplication = useApplicationsStore.use.closeApplication();
  const focusApplication = useApplicationsStore.use.focusApplication();
  const toggleFullScreenApplication =
    useApplicationsStore.use.toggleFullScreenApplication();
  const startDragApplication = useApplicationsStore.use.startDragApplication();
  const endDragApplication = useApplicationsStore.use.endDragApplication();
  const moveApplication = useApplicationsStore.use.moveApplication();
  const resizeApplication = useApplicationsStore.use.resizeApplication();
  const fullScreenApplication =
    useApplicationsStore.use.fullScreenApplication();
  const reduceApplication = useApplicationsStore.use.reduceApplication();

  // TODO get config without getting the component
  const data = useMemo(() => {
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
      appId={app.appId}
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
    />
  );
});

Application.displayName = 'Application';

export default Application;
