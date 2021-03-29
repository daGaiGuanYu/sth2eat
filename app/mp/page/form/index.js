const { GFPage, setPageTitle } = require('../../common/index')
const Model = require('../../db-util/model')

const app = getApp()
const model = new Model('to_eat')
const page = new GFPage({
  record: {
    name: '',
    list: []
  }
})
const data = page.data

page.onLoad = async function(option){
  console.log('onLoad', option)
  const itemId = option.itemId
  if(!itemId) {
    setPageTitle('新饭单')
  } else {
    setPageTitle('编辑饭单')
    const record = await model.getById(itemId)
    this.setData({ record })
  }
}

page.addItem = function(){
  console.log('addItem')
  data.record.list.push({
    name: ''
  })
  this.updateState('record')
}

Page(page)