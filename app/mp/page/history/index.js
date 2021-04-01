const { GFPage, showActionSheet } = require('../../common/index')
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
  showActionSheet([
    ['详情', () => {}],
    ['拷贝', () => {}],
    ['设为当前饭单', () => {}]
  ])
}

Page(page)