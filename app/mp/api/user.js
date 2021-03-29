const callCF = require('./common/call-cloud-func')
const model = wx.cloud.database().collection('user')

module.exports = {
  getOpenId: async () => {
    const userList = (await model.get()).data
    if(userList.length >1)
      throw '有这么些我？'
    else if(userList.length == 1)
      return userList[0]._openId
    else{
      console.log('新用户')
      const openId = (await callCF('login')).openId
      await model.add({
        data: {}
      })
      return openId
    }
  }
}