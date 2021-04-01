const { GFPage, setPageTitle, nav2, toast } = require('../../common/index')
const Model = require('../../db-util/model')
const checkList = require('../../db-util/check-list')

const appEvtMng = require('../../common/evt-mng')
const model = new Model('list')
const userModel = new Model('user')
const api = require('../../api/user')
const page = new GFPage({
  name: '',
  list: [getItem()]
})

page.onLoad = async function(option){
  console.log('onLoad', option)
  const id = this.data.id = option.id
  const copyId = option.copyId

  setPageTitle(id?'编辑饭单':'新饭单')
  const __id = id || copyId
  if(__id){
    const record = await model.findById(__id)
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
    title: '请输入饭名',
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
  const err = checkList(this.data)
  if(err){
    if(err == -1)
      return toast.error('还没填饭单名!')
    else
      return toast.error('有个饭名没填？')
  }

  const { name, list } = this.data
  const data = { name, list }
  const id = this.data.id
  if(id) {
    await model.updateById(id, data)
    onListWrite(id)
  } else {
    const res = await model.create(data)
    onListWrite(res._id)
  }
  
  wx.navigateBack()
}

function getItem(){
  return {
    name: ''
  }
}

async function onListWrite(id){
  const userRecord = await userModel.findOne()
  if(userRecord.currentListId == id)
    appEvtMng.emitMyListChange(id)
  else if(!userRecord.currentListId)
    api.setCurrentList(id)
}

Page(page)