module.exports = {
  nav2: require('./nav2'),
  setPageTitle: title => wx.setNavigationBarTitle({ title }),
  GFPage: require('./page'),
  toast: require('./toast'),
  wait: require('./wait'),
  gfTimeout: require('./gf-timeout')
}