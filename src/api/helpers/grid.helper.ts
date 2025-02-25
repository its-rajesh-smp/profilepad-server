export const removeItemFromGrid = (grid: any, itemId: string) => {
  const updatedGrid: any = {};

  Object.keys(grid).map((screenSize) => {
    updatedGrid[screenSize] = grid[screenSize].filter((gridItem: any) => {
      return gridItem.i !== itemId;
    });
  });

  return updatedGrid;
};
