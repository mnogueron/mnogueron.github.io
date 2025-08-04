import {Positions, WindowState} from '@/os/store/types';
import {useEffect, useMemo, useRef, useState} from 'react';
import {SpringProps, useSpringValue} from '@react-spring/web';
import {useApplicationsStore} from '@/os/store';

export const useAnimatedWindowStyle = (
  positions: Positions,
  windowState: WindowState,
  isReduced: boolean
) => {
  const previousWindowState = useRef(windowState);
  const previousIsReduced = useRef(isReduced);
  const [isAnimated, setIsAnimated] = useState(false);
  const [display, setDisplay] = useState<string | undefined>(undefined);
  const container = useApplicationsStore.use.container();

  const animationEvents: SpringProps<number> = useMemo(
    () => ({
      onRest: () => setIsAnimated(false),
    }),
    []
  );
  const topSpring = useSpringValue(0, animationEvents);
  const leftSpring = useSpringValue(0, animationEvents);
  const widthSpring = useSpringValue(0, animationEvents);
  const heightSpring = useSpringValue(0, animationEvents);
  const scaleSpring = useSpringValue(1);

  const {top, left, width, height} = useMemo(
    () => ({
      top: `${positions.top}px`,
      left: `${positions.left}px`,
      width: `${positions.width}px`,
      height: `${positions.height}px`,
    }),
    [positions.height, positions.left, positions.top, positions.width]
  );

  // TODO use previous value to keep track of the previous windowState and animate
  useEffect(() => {
    if (previousWindowState.current !== windowState) {
      console.log('start animation');
      setIsAnimated(true);
      topSpring.start(positions.top);
      leftSpring.start(positions.left);
      widthSpring.start(positions.width);
      heightSpring.start(positions.height);
    } else {
      topSpring.start(positions.top, {immediate: true});
      leftSpring.start(positions.left, {immediate: true});
      widthSpring.start(positions.width, {immediate: true});
      heightSpring.start(positions.height, {immediate: true});
    }
    previousWindowState.current = windowState;
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

  // TODO handle reduced and expand animation
  // TODO Improve animation
  useEffect(() => {
    if (previousIsReduced.current !== isReduced) {
      console.log('Change reduce state', isReduced);
      setIsAnimated(true);
      if (isReduced) {
        topSpring.start(container.height - 200, {
          onRest: () => {
            console.log('Set display none');
            setDisplay('none');
          },
        });
        leftSpring.start(container.width / 2);
        scaleSpring.start(0.01);
        /*widthSpring.start(200);
        heightSpring.start(200);*/
      } else {
        topSpring.start(positions.top, {
          onStart: () => {
            console.log('Set display undefined');
            setDisplay(undefined);
          },
        });
        leftSpring.start(positions.left);
        scaleSpring.start(1);
        /*widthSpring.start(positions.width);
        heightSpring.start(positions.height);*/
      }
      previousIsReduced.current = isReduced;
    }
  }, [
    heightSpring,
    isReduced,
    leftSpring,
    positions.height,
    positions.left,
    positions.top,
    positions.width,
    topSpring,
    widthSpring,
    scaleSpring,
    container.height,
    container.width,
  ]);

  return isAnimated
    ? {
        top: topSpring,
        left: leftSpring,
        width: widthSpring,
        height: heightSpring,
        display,
        scale: scaleSpring,
        transformOrigin: 'bottom center',
      }
    : {
        top,
        left,
        width,
        height,
        display,
        scale: scaleSpring,
        transformOrigin: 'bottom center',
      };
};
