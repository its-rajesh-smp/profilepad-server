import {
  defaultGridLayoutConfigItem,
  layoutItemConfigs,
} from "../constants/layout.const";

export const addNewItemToGridLayoutConfig = (
  layoutConfig: any,
  id: string,
  options: any = {}
) => {
  const { type } = options;

  // Set default config with id
  let newItem = { ...defaultGridLayoutConfigItem, i: id };

  // Set default config for type
  if (layoutItemConfigs[type]) {
    newItem = { ...newItem, ...layoutItemConfigs[type] };
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
