import {Positions, WindowState} from '@/os/store/types';
import {useEffect, useMemo, useRef, useState} from 'react';
import {to, useSpringValue} from '@react-spring/web';
import {useApplicationsStore} from '@/os/store';

export const useAnimatedWindowStyle = (
  positions: Positions,
  windowState: WindowState,
  isReduced: boolean,
  id: string
) => {
  const previousWindowState = useRef(windowState);
  const previousIsReduced = useRef(isReduced);
  const [display, setDisplay] = useState<string | undefined>(undefined);
  const container = useApplicationsStore.use.container();

  const topSpring = useSpringValue(0);
  const leftSpring = useSpringValue(0);
  const widthSpring = useSpringValue(0);
  const heightSpring = useSpringValue(0);
  const scaleSpring = useSpringValue(1);

  useEffect(() => {
    if (previousWindowState.current !== windowState) {
      topSpring.start(positions.top);
      leftSpring.start(positions.left);
      widthSpring.start(positions.width);
      heightSpring.start(positions.height);
      previousWindowState.current = windowState;
    } else {
      topSpring.set(positions.top);
      leftSpring.set(positions.left);
      widthSpring.set(positions.width);
      heightSpring.set(positions.height);
    }
  }, [
    positions.top,
    positions.left,
    positions.height,
    positions.width,
    windowState,
    leftSpring,
    topSpring,
    heightSpring,
    widthSpring,
  ]);

  // Handle reduce animation
  useEffect(() => {
    if (previousIsReduced.current !== isReduced && isReduced) {
      console.log('Reduce window');
      scaleSpring.start(0.01, {
        onRest: () => {
          setDisplay('none');
        },
      });
      topSpring.start(container.height * 0.9);
      leftSpring.start((container.width - positions.width) / 2);
      console.log(container.width / 2);
      previousIsReduced.current = isReduced;
    }
  }, [
    isReduced,
    topSpring,
    leftSpring,
    scaleSpring,
    container.height,
    container.width,
    positions.width,
  ]);

  // Handle expand animation
  useEffect(() => {
    if (previousIsReduced.current !== isReduced && !isReduced) {
      console.log('Expand window');
      setDisplay(undefined);
      scaleSpring.start(1);
      topSpring.start(positions.top);
      leftSpring.start(positions.left);
      previousIsReduced.current = isReduced;
    }
  }, [
    isReduced,
    topSpring,
    leftSpring,
    scaleSpring,
    positions.left,
    positions.top,
  ]);

  return useMemo(() => {
    const styles = {
      top: 0,
      left: 0,
      width: widthSpring,
      height: heightSpring,
      transform: to(
        [topSpring, leftSpring, scaleSpring],
        (top, left, scale) =>
          `translate3d(${left}px, ${top}px, 0) scale(${scale})`
      ),
      display,
      transformOrigin: 'bottom center',
    };

    console.log(id, styles);

    return styles;
  }, [
    display,
    heightSpring,
    id,
    leftSpring,
    scaleSpring,
    topSpring,
    widthSpring,
  ]);
};
