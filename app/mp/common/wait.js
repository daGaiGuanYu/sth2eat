module.exports = function(){
  var resolve, reject
  const result = new Promise( (res, rej) => {
    resolve = res
    reject = rej
  })
  result.resolve = resolve
  result.reject = reject
  return result
}