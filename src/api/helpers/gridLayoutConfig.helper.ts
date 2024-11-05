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
  console.log(layoutConfig);
  return layoutConfig;
};
