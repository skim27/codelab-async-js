/**
 * Implement the co() function such that it runs the generator it wraps to completion. To do this,
 * the co() function should
 *
 * - Instantiate the generator
 * - Call .next() on the generator to get the first yielded Promise
 * - Register a callback on the Promise
 * - When the promise resolves (the callback is called), call .next() on the  generator with the
 * resolved value
 * - Repeat
 *
 * We will not worry about passing arguments to the generator or error handling in this exercise.
 *
 * The output when running this file should be
 *
 *   1
 *   2
 *   3
 *   4
 */
function deferred(val) {
  return new Promise((resolve, reject) => resolve(val));
}

co(function* asyncAdds() {
  console.log(yield deferred(1)); // 1
  console.log(yield deferred(2)); // 2
  console.log(yield deferred(3)); // 3
  return 4;
}).then(function (result) {
  console.log(result); // 4
});

function co(generator) {
  return new Promise((resolve, reject) => {
    // Your code goes here
  });
}
