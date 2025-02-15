export const getHighResProfileImage = (pictureUrl: string): string => {
  return pictureUrl.replace(/s\d+-c/, "s400-c");
};
