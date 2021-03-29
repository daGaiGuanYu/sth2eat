const { GFPage, setPageTitle } = require('../../common/index')

const app = getApp()
const db = wx.database()
const toEatModel = db.collection('to_eat')
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
    const record = (await toEatModel.doc(itemId).get()).data
    this.setData({ record })
  }
}

Page(page)