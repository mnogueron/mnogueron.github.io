import {MIN_PADDING} from '@/constants';

export const getApplicationPreferredSize = (
  containerDimensions: {
    width: number;
    height: number;
  },
  preferredRatio: number,
  preferredRatioMobile: number,
  maxApplicationHeight: number,
  minMobileRatio: number
) => {
  const {width: containerWidth, height: containerHeight} = containerDimensions;
  const maxWidth = containerWidth - 2 * MIN_PADDING;
  const maxHeight = containerHeight - 2 * MIN_PADDING;
  const ratio = containerWidth / containerHeight;

  let height = Math.min(maxApplicationHeight, maxHeight);
  let width = Math.min(height * preferredRatio, maxWidth);

  if (containerWidth < 800) {
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
