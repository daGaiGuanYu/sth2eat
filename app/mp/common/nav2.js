function nav2(url, option, events){
  nav2.lastOption = option
  wx.navigateTo({
    url, events
  })
}

module.exports = nav2