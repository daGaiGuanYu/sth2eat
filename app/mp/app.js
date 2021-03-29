const api = require('./api/index')

wx.cloud.init()

const app = {
  data: {}
}

const getOpenId = api.user.getOpenId()
app.getOpenId = () => getOpenId

App(app)