const { GFPage, showActionSheet, nav2 } = require('../../common/index')
const Model = require('../../db-util/model')
const userApi = require('../../api/user')

const model = new Model('list')
const page = new GFPage()

page.onLoad = async function(){
  const userinfo = await userApi.getUserRecord()
  const list = await Promise.all(
    userinfo.list.map(id => model.findById(id))
  )
  this.setData({ list })
}

page.onTapItem = function(e){
  const id = e.currentTarget.dataset.id
  showActionSheet([
    ['详情', () => {
      nav2('/page/list-info/index?id=' + id)
    }],
    ['拷贝', () => {
      nav2('/page/form/index?copyId=' + id)
    }],
    ['设为当前饭单', () => {}]
  ])
}

Page(page)