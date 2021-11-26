export const openTab = (url: string) => {
  const tab = window.open('');
  tab && (tab.location.href = url);
};
