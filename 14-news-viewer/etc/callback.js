function increase(number, callback) {
  setTimeout(() => {
    const result = number + 10;
    if (callback) {
      callback(result)
    }
  }, 1000);
}

// 10씩 늘리는 간단한 형태
increase(0, result => {
  console.log(result);
})

/* ============================================================ */
// 10, 20, 30, 40 순차적으로 늘리기
console.log("=============== 작업 시작 ===============")
increase(0, result => {
  console.log(result);
  increase(result, result => {
    console.log(result);
    increase(result, result => {
      console.log(result);
      increase(result, result => {
        console.log(result);
        console.log("=============== 작업 완료 ===============")
      })
    })
  })
})
