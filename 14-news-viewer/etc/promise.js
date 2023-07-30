function increase(number) {
  const promise = new Promise((resolve, reject) => {   // 프로미스 객체 생성하기
    setTimeout(() => {
      const result = number + 10;                              // number에 10을 더한다.
      if (result > 50) {                                       // 결과가 50을 넘어가면
        const e = new Error('NumberTooBig');                   // 에러를 발생한다.
        return reject(e);                                      // reject 처리
      }
      resolve(result);                                         // resolve 처리
    }, 1000)
  })

  return promise;                                              // promise 객체를 처리한다.
}


// =====================================
increase(0)             // increase 함수에서 0을 처리한다.
  .then(number => {            // increase(0)의 결과를 number로 받는다(resolve)
    console.log(number);
    return increase(number)    // increase(number)를 실행하고, 그 결과값을 .then의 인자로 넘긴다.
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .then(number => {
    console.log(number);
    return increase(number)
  })
  .catch(e => {
    console.log(e)
  })