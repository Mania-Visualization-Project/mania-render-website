export const getFileExtension = (filename: string): string => {
  const index = filename.lastIndexOf('.');
  if (index === -1) {
    return '';
  }
  return filename.substring(index + 1);
};
