const { GFPage, showActionSheet, nav2 } = require('../../common/index')
const Model = require('../../db-util/model')
const api = require('../../api/user')

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
    ['拷贝', add],
    ['使用此饭单', () => api.setCurrentList(id) ]
  ])
}

page.loadData = async function(){
  const userinfo = await app.getUserOpenidP()
  this.setData({
    list: await model.find({
      _openid: userinfo._openid
    })
  })
}

Page(page)