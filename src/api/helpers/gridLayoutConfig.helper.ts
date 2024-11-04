export const addNewItemToGridLayoutConfig = (layoutConfig: any, item: any) => {
  Object.keys(layoutConfig).forEach((key) => {
    layoutConfig[key].push(item);
  });

  return layoutConfig;
};
