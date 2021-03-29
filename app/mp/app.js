wx.cloud.init()
const api = require('./api/index')

const app = {
  data: {}
}

const userinfoP = api.user.getUserinfo()
  .then(record => {
    console.log('当前用户: ', record)
    return record
  })
app.getUserinfo = () => userinfoP

App(app)