module.exports = {
  nav2: require('./nav2'),
  setPageTitle: title => wx.setNavigationBarTitle({ title }),
  GFPage: require('./page'),
  toast: require('./toast'),
  wait: require('./wait'),
  Q: require('./q'),
  showLoading: title => wx.showLoading({
    title,
    mask: true
  }),
  showActionSheet: require('./action-sheet')
}