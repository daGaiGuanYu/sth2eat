module.exports = {
  nav2: url => wx.navigateTo({ url }),
  GFPage: require('./page'),
  toast: require('./toast'),
  gfTimeout: require('./gf-timeout')
}