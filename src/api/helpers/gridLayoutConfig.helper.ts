import {
  defaultHtmlLayoutItemConfig,
  defaultSectionLayoutItemConfig,
} from "../constants/layout.const";

export const addNewItemToGridLayoutConfig = (
  layoutConfig: any,
  item: any,
  options: any = {}
) => {
  const { type } = options;

  let newItem = { ...item };

  switch (type) {
    case "section":
      newItem = { ...newItem, ...defaultSectionLayoutItemConfig };
      break;
    case "html":
      newItem = { ...newItem, ...defaultHtmlLayoutItemConfig };
      break;
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
