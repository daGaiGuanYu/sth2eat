const { GFPage, setPageTitle, nav2 } = require('../../common/index')
const Model = require('../../db-util/model')

const app = getApp()
const model = new Model('to_eat')
const page = new GFPage({
  name: '',
  list: []
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
    this.setData({
      name: record.name,
      list: record.list
    })
  }
}

page.addItem = function(){
  console.log('addItem')
  this.data.list.push({
    name: ''
  })
  this.updateData('list')
}

page.nav2input = function(e){
  const index = e.currentTarget.dataset.index
  const item = this.data.list[index]
  nav2('/page/common/input/index', {
    title: '请输入饭/店名',
    value: item.name
  }, {
    confirm: value => {
      item.name = value
      this.updateData('list')
    }
  })
}

Page(page)