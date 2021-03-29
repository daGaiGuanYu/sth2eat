wx.cloud.init()
const api = require('./api/index')

const app = {
  data: {}
}

const getOpenId = api.user.getOpenId()
  .then(openId => {
    console.log('当前用户: ' + openId)
    return openId
  })
app.getOpenId = () => getOpenId

App(app)