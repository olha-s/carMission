export const pushHashToHistory = (history, anchor) => {
  history.replace({
    pathname: "/",
    hash: `#${anchor}`,
  });
};
