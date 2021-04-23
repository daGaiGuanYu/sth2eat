const ccz = require('ccz')
const { GFPage, toast, nav2 } = require('../../common/index')
const { getRandomItem } = require('./util')
const Model = require('../../db-util/model')
const setTip = require('./tip')

const userApi = require('../../api/user')
const appEvtMng = require('../../common/evt-mng')
const gfListModel = new Model('list')
const page = new GFPage()
const data = page.data

page.onLoad = async function(option){
  console.log('onLoad', option)
  appEvtMng.onMyListChange( listId => {
    console.log('首页：更新饭单！')
    this.data.gfListId = listId
    this.loadData()
  })

  let gfListId = option.gfListId
  const userRecord = await userApi.getUserRecord()
  if(gfListId) {
    if(userRecord.currentListId != gfListId)
      await userApi.setCurrentList(gfListId, true)
  } else if(userRecord.currentListId)
    gfListId = userRecord.currentListId
  else
    gfListId = 'b00064a760643e850cbbea827c3307ee'
  this.data.gfListId = gfListId

  await this.loadData()
  this.reset() // 异步，但不等待（时间太长）
}

page.loadData = async function(){
  console.log('首页 loadData')
  setTip(this)
  const { name, list } = await gfListModel.findById(this.data.gfListId)
  this.setData({
    name, list
  })
}

data.resetting = false
page.reset = async function(){
  console.log('reset')
  const data = this.data
  if(data.resetting){
    toast('急？')
    return
  }

  this.setData({
    resetting: true
  })
  await __reset.call(this)
  this.setData({
    resetting: false
  })
}

page.showAnswer = function(answer){
  if(!answer) throw 'answer 不能为空'
  this.setData({ answer })
}

page.toMenu = function(){
  nav2('/page/menu/index')
}

page.onShareAppMessage = function(){
  return {
    title: this.data.name,
    path: '/page/index/index?gfListId=' + this.data.gfListId,
    imageUrl: '/asset/fan.png'
  }
}

function __reset(){
  console.log('__reset')
  return ccz.withoutIntervalP(5000, 50, () =>
    this.showAnswer(getRandomItem(this.data.list).name)
  )
}

Page(page)