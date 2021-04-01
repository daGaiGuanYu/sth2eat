const Model = require('../../db-util/model')
const { GFPage, setPageTitle } = require('../../common/index')

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

Page(page)