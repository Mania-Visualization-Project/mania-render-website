export const getThingByCondition = (
  condition: boolean | (() => boolean),
  trueThing: any,
  falseThing: any,
) => {
  if (typeof condition === 'function') {
    return condition() ? trueThing : falseThing;
  } else {
    return condition ? trueThing : falseThing;
  }
};
