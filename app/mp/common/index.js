module.exports = {
  nav2: url => wx.navigateTo({ url }),
  setPageTitle: title => wx.setNavigationBarTitle({ title }),
  GFPage: require('./page'),
  toast: require('./toast'),
  gfTimeout: require('./gf-timeout')
}