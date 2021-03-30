// 页面间的数据传递
// 慎用

let newToEatId = null
exports.getNewToEatId = function(){
  let temp = newToEatId
  newToEatId = null
  return temp
}
exports.setNewToEatId = function(id){
  newToEatId = id
}