const fn1 = (x) => x + 1;
const fn2 = (x) => x + 2;
const fn3 = (x) => x * 2;
const fn4 = (x) => x / 2;

const applyFunctions = (value, ...functions) => {
  const result = functions.reduce((acc, fn) => fn(acc), value);
  return result < 10 ? null : result;
};

const result = applyFunctions(2, fn1, fn2, fn3, fn4, fn2, fn3, fn1);

console.log(result);
