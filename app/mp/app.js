wx.cloud.init()
const api = require('./api/index')

const app = {
  data: {}
}

const userRecordP = api.user.getUserRecord()
  .then(record => {
    console.log('当前用户: ', record)
    return record
  })
app.getUserRecord = () => userRecordP

App(app)