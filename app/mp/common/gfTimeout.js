function gfTimeout(list){
  let time = 0
  for(let [interval, job] of list) {
    time += interval
    setTimeout(job, time)
  }

  return new Promise( res => {
    setTimeout(res, time)
  })
}

gfTimeout.haha = function (interval, list){
  if(interval instanceof Array){
    list = interval
    interval = 1000
  }
  list = list.map( job => [interval, job])
  list[0][0] = 0
  return gfTimeout(list)
}

module.exports = gfTimeout