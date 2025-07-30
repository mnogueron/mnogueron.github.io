import {Positions} from '@/os/store/types';
import {AppConfig} from '@/applications/types';

export const MIN_PADDING = 12;

export const getApplicationPreferredSize = (
  container: {
    width: number;
    height: number;
  },
  preferredRatio: number,
  preferredRatioMobile: number,
  maxApplicationHeight: number,
  minMobileRatio: number
) => {
  const maxWidth = container.width - 2 * MIN_PADDING;
  const maxHeight = container.height - 2 * MIN_PADDING;
  const ratio = container.width / container.height;

  let height = Math.min(maxApplicationHeight, maxHeight);
  let width = Math.min(height * preferredRatio, maxWidth);

  if (container.width < 800) {
    width = maxWidth;
    if (ratio > minMobileRatio) {
      height = maxHeight;
    } else {
      height = maxWidth / preferredRatioMobile;
    }
  }

  return {
    height,
    width,
  };
};

export const getBoundPositions = (
  positions: Positions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  container: {width: number; height: number}
) => {
  const top = Math.max(positions.top, 0);
  const left = positions.left; //Math.max(positions.left, 0);
  /*if (left + positions.width > container.width) {
    left = container.width - positions.width;
  }*/
  /*if (top + positions.height > container.height) {
    top = container.height - positions.height;
  }*/
  return {left, top};
};

export const getAppPositions = (
  config: AppConfig,
  container: {width: number; height: number}
) => {
  if (config.getStaticBox) {
    return config.getStaticBox(container);
  }

  const {width, height} = getApplicationPreferredSize(
    container,
    config.preferredRatio,
    config.preferredRatioMobile,
    config.maxApplicationHeight,
    config.minMobileRatio
  );

  const positions = {
    top: MIN_PADDING,
    left: MIN_PADDING,
    width: 0,
    height: 0,
  };
  // TODO improve logic to show multiple windows on different top values
  if (container.width < 800 && width >= container.width - 2 * MIN_PADDING) {
    positions.top = Math.max((container.height - height) / 2, 0);
  }

  positions.top = (container.height - height) / 2;
  positions.left = (container.width - width) / 2;

  // TODO improve how the app lays out the applications
  //top: MIN_PADDING + 32 * Object.values(apps).length,
  //left: MIN_PADDING + 32 * Object.values(apps).length,
  return {
    ...positions,
    width,
    height,
  };
};
