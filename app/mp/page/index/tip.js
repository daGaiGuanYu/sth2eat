const list = [
  '长按饭名，进入菜单',
  '单击饭名，重新随机',
  '右上角“三点”按钮，分享饭单',
  '累了，不想说话',
  '广告位'
]

module.exports = function(page){
  const index = Math.floor(Math.random() * list.length)
  page.setData({
    tip: ''
  })
  wx.nextTick(() => {
    page.setData({
      tip: list[index]
    })
  })
}
