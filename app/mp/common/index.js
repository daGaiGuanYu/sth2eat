module.exports = {
  nav2: require('./nav2'),
  setPageTitle: title => wx.setNavigationBarTitle({ title }),
  GFPage: require('./page'),
  toast: require('./toast'),
  gfTimeout: require('./gf-timeout')
}