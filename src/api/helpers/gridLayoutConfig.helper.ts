export const addNewItemToGridLayoutConfig = (
  layoutConfig: any,
  item: any,
  options: any = {}
) => {
  const { type } = options;

  const newItem = { ...item };

  if (type === "section") {
    newItem["isResizable"] = false;
    newItem["w"] = 20;
  }

  Object.keys(layoutConfig).forEach((key) => {
    layoutConfig[key].push(newItem);
  });

  return layoutConfig;
};

export const deleteItemFromGridLayoutConfig = (
  layoutConfig: any,
  id: string
) => {
  const updatedLayoutConfig: { [key: string]: [] } = {};

  Object.keys(layoutConfig).forEach((key) => {
    updatedLayoutConfig[key] = layoutConfig[key].filter(
      (item: any) => item.id !== id
    );
  });

  return updatedLayoutConfig;
};
