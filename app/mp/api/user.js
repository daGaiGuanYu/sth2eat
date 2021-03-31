const Model = require('../db-util/model')

const model = new Model('user')
const toast = require('../common/toast')
const appEvtMng = require('../common/evt-mng')

const getUserOpenid = exports.getUserOpenid = async function() {
  const userList = await model.find()
  if(userList.length >1)
    throw '有这么些我？'
  else if(userList.length == 1)
    return userList[0]
  else{
    console.log('新用户')
    toast('你好干饭人！长按屏幕进入菜单')
    await model.create({
      currentListId: null,
      list: []
    })
    return await getUserOpenid()
  }
}

exports.setCurrentList = async function(listId){
  const user = await model.findOne()
  await model.updateById(user._id, {
    currentListId: listId,
    list: Model._.unshift([listId])
  })
  toast('yes，新饭单')
  appEvtMng.emitMyListChange(listId)
}