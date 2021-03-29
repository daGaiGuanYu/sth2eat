module.exports = function(list){
  let time = 0
  for(let [interval, job] of list) {
    time += interval
    setTimeout(job, time)
  }

  return new Promise( res => {
    setTimeout(res, time)
  })
}