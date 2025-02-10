import React, {useContext, useMemo} from 'react';
import Window from '@/components/Window';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import {ResizeDirection} from '@/components/Window/types';
import Applications from '@/applications';

type ApplicationProps = {
  id: string;
};

const Application = ({id}: ApplicationProps) => {
  const {
    applications,
    closeApplication,
    moveApplication,
    resizeApplication,
    focusApplication,
    fullScreenApplication,
    reduceApplication,
    toggleFullScreenApplication,
  } = useContext(WindowAppContext);

  const data = useMemo(() => {
    const application = applications[id];
    if (!application) {
      return;
    }

    return {
      application,
      AppComponent: Applications[application.appId],
    };
  }, [applications, id]);

  const handleMove = (delta: {x: number; y: number}) => {
    moveApplication(id, delta);
  };

  const handleResize = (delta: {
    x: number;
    y: number;
    dir: ResizeDirection;
  }) => {
    resizeApplication(id, delta);
  };

  const handleClose = () => {
    closeApplication(id);
  };

  const handleFocus = () => {
    focusApplication(id);
  };

  const handleFullScreen = () => {
    fullScreenApplication(id);
  };

  const handleFullScreenToggle = () => {
    toggleFullScreenApplication(id);
  };

  const handleReduce = () => {
    reduceApplication(id);
  };

  if (!data?.AppComponent) {
    return null;
  }

  const {AppComponent, application} = data;

  return (
    <Window
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
      title={AppComponent.appTitle}
      disableResize={AppComponent.disableResize}
      disableMove={AppComponent.disableMove}
    >
      <AppComponent />
    </Window>
  );
};

export default Application;
