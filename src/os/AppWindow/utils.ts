export const relativeSize = (
  value: number,
  relativeTo: 'containerWidth' | 'containerHeight',
  min?: string | number,
  max?: string | number
) => {
  const relativeVariable = `var(--${relativeTo})`;
  let result = `calc(${relativeVariable} * ${value})`;
  if (min) {
    result = `min(${result}, ${typeof min === 'string' ? min : `${min}px`})`;
  }
  if (max) {
    result = `max(${result}, ${typeof max === 'string' ? max : `${max}px`})`;
  }
  return result;
};
