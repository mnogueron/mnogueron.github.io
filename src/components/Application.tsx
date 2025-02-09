import React, {useContext, useMemo} from 'react';
import Window from '@/components/Window';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import {ResizeDirection} from '@/components/Window/types';
import {WindowState} from '@/contexts/types';
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

  // TODO handle reduced state and animation
  if (application.isReduced) {
    return null;
  }

  return (
    <Window
      title={AppComponent.appTitle}
      position="absolute"
      top={
        application.state === WindowState.FULL_SCREEN
          ? 0
          : `${application.positions.top}px`
      }
      left={
        application.state === WindowState.FULL_SCREEN
          ? 0
          : `${application.positions.left}px`
      }
      width={
        application.state === WindowState.FULL_SCREEN
          ? '100%'
          : `${application.positions.width}px`
      }
      height={
        application.state === WindowState.FULL_SCREEN
          ? '100%'
          : `${application.positions.height}px`
      }
      onClose={handleClose}
      onResize={handleResize}
      onMove={handleMove}
      onFocus={handleFocus}
      zIndex={application.priority}
      onReduce={handleReduce}
      onFullScreen={handleFullScreen}
      onFullScreenToggle={handleFullScreenToggle}
    >
      <AppComponent />
    </Window>
  );
};

export default Application;
