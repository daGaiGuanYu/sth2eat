const { GFPage } = require('../../common/index')
const Model = require('../../db-util/model')

const page = new GFPage()
const app = getApp()
const model = new Model('to_eat')

page.onLoad = async function(){
  console.log('onLoad')
  const userinfo = await app.getUserRecord()
  this.setData({
    list: await model.find({
      _openid: userinfo._openid
    })
  })
}

page.onTapItem = function(id){
}

Page(page)