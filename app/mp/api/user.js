const model = wx.cloud.database().collection('user')

const getUserRecord = exports.getUserRecord = async function() {
  const userList = (await model.get()).data
  if(userList.length >1)
    throw '有这么些我？'
  else if(userList.length == 1)
    return userList[0]
  else{
    console.log('新用户')
    await model.add({
      data: {}
    })
    return await getUserRecord()
  }
}