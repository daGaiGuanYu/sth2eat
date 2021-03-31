wx.cloud.init()
const api = require('./api/index')

const app = {}

const userOpenidP = api.user.getUserOpenid()
  .then(record => {
    console.log('当前用户: ', record)
    return record
  })
app.getUserOpenidP = () => userOpenidP

App(app)