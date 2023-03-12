const info = (...params: string[]) => {
  console.log(...params);
};

const error = (...params: string[]) => {
  console.error(...params);
};

export {
  info,
  error,
};

