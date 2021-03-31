const { GFPage, showActionSheet, nav2 } = require('../../common/index')
const Model = require('../../db-util/model')

const page = new GFPage()
const app = getApp()
const model = new Model('list')

page.onShow = function(){
  console.log('onShow')
  this.loadData()
}

page.onTapItem = function(e){
  const id = e.currentTarget.dataset.id
  showActionSheet([
    ['更新', () => {
      nav2('/page/form/index?id=' + id)
    }],
    ['删除', drop],
    ['使用此饭单', use],
    ['在此基础上新增', add]
  ])

  function drop(){
    console.log('删除')
  }
  function use(){
    console.log('use')
  }
  function add(){
    console.log('add')
  }
}

page.loadData = async function(){
  const userinfo = await app.getUserRecord()
  this.setData({
    list: await model.find({
      _openid: userinfo._openid
    })
  })
}

Page(page)