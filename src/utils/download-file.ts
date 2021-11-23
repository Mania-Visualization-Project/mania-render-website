/**
 * download file
 * @param url download link
 * @param filename download file name
 */
export const downloadFile = (url: string, filename?: string) => {
  if (!url || !filename) {
    throw new Error('Filename or download url is invalid!');
  }

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  filename && (a.download = filename);
  a.click();
};
