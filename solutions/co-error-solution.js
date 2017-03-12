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

    function onResolve(value) {
      let ret;

      try {
        ret = g.next(value);
      } catch (e) {
        reject(e)
        return;
      }
      next(ret);
    }

    function onReject(err) {
      let ret;

      try {
        ret = g.throw(err);
      } catch (e) {
        reject(e);
        return;
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) {
        return resolve(ret.value);
      }

      ret.value.then(onResolve, onReject);
    }

    onResolve();
  });
}
