export const getDestructArrayInCondition = (condition: boolean, thing: any) => {
  return condition ? [thing] : [];
};

export const getDestructObjectInCondition = (condition: boolean, thing: Record<any, any>) => {
  return condition ? thing : {};
};
