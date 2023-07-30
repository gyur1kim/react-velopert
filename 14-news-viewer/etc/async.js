function increase(number) {
  const promise = new Promise((resolve, reject) => {
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

async function runTask () {
  try {
    let result = await increase(0);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
    result = await increase(result);
    console.log(result);
  }
  catch (e) {
    console.log(e);
  }
}

runTask();