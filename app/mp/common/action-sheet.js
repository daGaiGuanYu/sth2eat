module.exports = function(list){
  wx.showActionSheet({
    itemList: list.map(item => item[0]),
    success(res){
      list[res.tapIndex][1]()
    }
  })
}