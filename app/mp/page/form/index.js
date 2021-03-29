const { GFPage, toast  } = require('../../common/index')

const app = getApp()
const page = new GFPage()
const data = page.data

page.onLoad = function(itemId){
  console.log('onLoad', itemId)
}

Page(page)