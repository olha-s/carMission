const useUpdateTimeout = (setState) => {
  return setTimeout(() => {
    setState(false);
  }, 5000);
};

export default useUpdateTimeout;
