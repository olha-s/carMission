export const checkIsInputChanges = (values, sourceObj) => {
  let isNotChanged;
  for (const key in values) {
    if (sourceObj[key] === values[key]) {
      isNotChanged = true;
    } else {
      isNotChanged = false;
      return isNotChanged;
    }
  }
  return isNotChanged;
};
