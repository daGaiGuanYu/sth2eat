const { GFPage, setPageTitle } = require('../../common/index')
const Model = require('../../db-util/model')

const app = getApp()
const toEatModel = new Model('to_eat')
const page = new GFPage({
  record: {
    name: '',
    list: []
  }
})

page.onLoad = async function(option){
  console.log('onLoad', option)
  const itemId = option.itemId
  if(!itemId) {
    setPageTitle('新饭单')
  } else {
    setPageTitle('编辑饭单')
    const record = await toEatModel.getById(itemId)
    this.setData({ record })
  }
}

Page(page)