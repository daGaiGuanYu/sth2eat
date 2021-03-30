module.exports = function(){
  const result = new Promise( (res, rej) => {
    result.resolve = res
    result.reject = rej
  })
  return result
}