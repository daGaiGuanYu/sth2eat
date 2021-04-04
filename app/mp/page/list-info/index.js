const Model = require('../../db-util/model')
const { GFPage, setPageTitle, nav2 } = require('../../common/index')
const userApi = require('../../api/user')

const model = new Model('list')
const page = new GFPage()

page.onLoad = function(option){
  this.data.id = option.id
}

page.onShow = async function(){
  const id = this.data.id
  const record = await model.findById(id)
  setPageTitle(record.name)
  this.setData({
    list: record.list
  })
}

page.use = function(){
  userApi.setCurrentList(this.data.id)
}

page.copy = function(){
  nav2('/page/form/index?copyId=' + this.data.id)
}

Page(page)