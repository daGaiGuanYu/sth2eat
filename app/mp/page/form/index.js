const { GFPage, setPageTitle, nav2, toast } = require('../../common/index')
const api = require('../../api/to-eat')

const page = new GFPage({
  name: '',
  list: [getItem()]
})

page.onLoad = async function(option){
  console.log('onLoad', option)
  const itemId = option.itemId
  if(!itemId) {
    setPageTitle('新饭单')
  } else {
    setPageTitle('编辑饭单')
    const record = await model.findById(itemId)
    this.setData({
      name: record.name,
      list: record.list
    })
  }
}

page.addItem = function(){
  console.log('addItem')
  this.data.list.push(getItem())
  this.updateData('list')
  this.nav2input(this.data.list.length - 1)
}

page.handleTapItem = function(e){
  return this.nav2input(e.currentTarget.dataset.index)
}

page.nav2input = function(index){
  const item = this.data.list[index]
  nav2('/page/form/input/index', {
    title: '请输入饭/店名',
    value: item.name
  }, {
    confirm: value => {
      item.name = value
      this.updateData('list')
    },
    drop: () => {
      this.data.list.splice(index, 1)
      this.updateData('list')
    }
  })
}

page.submit = async function(){
  const record = await api.create(this.data)
  toast('添加成功')
}

function getItem(){
  return {
    name: ''
  }
}

Page(page)