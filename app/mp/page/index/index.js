const { GFPage, toast, gfTimeout, wait, nav2 } = require('../../common/index')
const Model = require('../../db-util/model')

const app = getApp()
const appEvtMng = require('../../common/evt-mng')
const AppData = require('../../common/app-data')
const userModel = new Model('user')
const gfListModel = new Model('list')
const page = new GFPage()
const knife = {}

page.onLoad = async function(option){
  console.log('onLoad', option)
  knife.loadPromise = wait()
  appEvtMng.onMyListChange(this.loadData.bind(this))

  let gfListId = option.gfListId
  const userRecord = await app.getUserRecord()
  if(gfListId)
    await userModel.updateById(userRecord._id, {
      gfListId
    })
  else if(userRecord.gfListId)
    gfListId = userRecord.gfListId
  else
    gfListId = 'b00064a76062ec180c9b32c8349b64de'
  
  await this.loadData(gfListId)
  this.reset() // 异步，但不等待（时间太长）
  knife.loadPromise.resolve()
}

page.loadData = async function(listId){
  const { name, list } = await gfListModel.findById(listId)
  this.setData({
    name, list
  })
}

page.onShow = async function(){
  console.log('onShow')
  await knife.loadPromise
  const newGFListId = AppData.getNewGFListId()
}

let resetting = false
page.reset = async function(){
  console.log('reset')
  if(resetting){
    toast('急？')
    return
  }

  resetting = true
  await __reset.call(this)
  resetting = false
}

page.showAnswer = function(answer){
  console.log('showAnswer')
  if(!answer) throw 'answer 不能为空'
  this.setData({ answer })
}

page.toMenu = function(){
  nav2('/page/menu/index')
}

function __reset(){
  console.log('__reset')
  const tarIndex = Math.floor(Math.random() * 4)
  const tar = this.data.list[tarIndex]
  return gfTimeout.haha(2000, [
    () => {
      this.showAnswer(3)
    },
    () => {
      this.showAnswer(2)
    },
    () => {
      this.showAnswer(1)
    },
    () => {
      this.showAnswer(tar.name)
    }
  ])
}

Page(page)