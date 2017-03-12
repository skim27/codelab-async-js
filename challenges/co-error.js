/**
 * Update the co() function to handle rejected promises yielded by the generator it wraps. A
 * rejected promise should cause co() to call .throw() on the generator with value the promise
 * was rejected with.
 *
 * The output when running this file should be
 *
 *   We are starting!
 *   We recovered!
 *   We finished!
 */
function deferred(val) {
  return new Promise((resolve, reject) => resolve(val));
}

function deferReject(e) {
  return new Promise((resolve, reject) => reject(e));
}

co(function* asyncAdds() {
  console.log(yield deferred('We are starting!'));
  try {
    console.log(yield deferReject(new Error('To fail, or to not fail.')));
  } catch (e) {
    console.log('We recovered!');
  }
  console.log(yield deferred('We finished!'));
});

function co(generator) {
  return new Promise((resolve, reject) => {
    const g = generator();

    // Your code here

    function next(nextVal) {
      const ret = g.next(nextVal);
      if (ret.done) {
        return resolve(ret.value);
      }

      ret.value.then(next);
    }
    next();
  });
}
