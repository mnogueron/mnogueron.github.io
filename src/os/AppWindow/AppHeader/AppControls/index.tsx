import React from 'react';
import {HStack} from '@chakra-ui/react';
import ToggleFullScreenButton from '@/os/AppWindow/AppHeader/AppControls/ToggleFullScreenButton';
import ReduceButton from '@/os/AppWindow/AppHeader/AppControls/ReduceButton';
import CloseButton from '@/os/AppWindow/AppHeader/AppControls/CloseButton';
import {WindowState} from '@/contexts/types';

type AppControlsProps = {
  state: WindowState;
  onClose?: () => void;
  onFullScreenToggle: () => void;
  onReduce: () => void;
};

const AppControls = ({
  state,
  onClose,
  onFullScreenToggle,
  onReduce,
}: AppControlsProps) => {
  return (
    <HStack className="group" gap={2}>
      <ToggleFullScreenButton
        isFullScreen={state === WindowState.FULL_SCREEN}
        onClick={onFullScreenToggle}
      />
      <ReduceButton onClick={onReduce} />
      <CloseButton onClick={onClose} />
    </HStack>
  );
};

export default AppControls;
