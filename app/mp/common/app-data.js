// 页面间的数据传递
// 慎用

let newGFListId = null
exports.getNewGFListId = function(){
  let temp = newGFListId
  newGFListId = null
  return temp
}
exports.setNewGFListId = function(id){
  newGFListId = id
}