const { GFPage, showActionSheet, nav2, Q, toast } = require('../../common/index')
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
    ['拷贝', () => {
      nav2('/page/form/index?copyId=' + id)
    }],
    ['设为当前饭单', () => api.setCurrentList(id) ]
  ])

  const self = this
  function drop(){
    Q('删除这饭单？', async function(){
      await model.updateById(id, {
        deletedAt: new Date()
      })
      toast('饭单 -1')
      self.loadData()
    })
  }
}

page.loadData = async function(){
  const userinfo = await app.getUserOpenidP()
  this.setData({
    list: await model.findNotDeleted({
      _openid: userinfo._openid
    })
  })
}

Page(page)