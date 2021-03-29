const { GFPage, toast, gfTimeout, nav2 } = require('../../common/index')

const app = getApp()
const db = wx.cloud.database()
const userModel = db.collection('user')
const page = new GFPage()
const data = page.data

data.list = [
  {
    name: '情'
  },{
    name: '新'
  },{
    name: '面'
  },{
    name: '黄'
  },{
    name: '不吃'
  }
]

page.onLoad = async function(option){
  console.log('onLoad', option)
  let toEatId = option.toEatId
  const userRecord = await app.getUserRecord()
  if(toEatId)
    await userModel.doc(userRecord._id).update({
      data: {
        toEatId
      }
    })
  else if(userRecord.toEatId)
    toEatId = userRecord.toEatId
  else
    return nav2('/page/form/index')

  this.reset()
}

let resetting = false
page.reset = async function(){
  console.log('reset')
  if(resetting){
    toast('急？')
    return
  }

  resetting = true
  await __reset.call(this)
  resetting = false
}

page.showAnswer = function(answer){
  console.log('showAnswer')
  if(!answer) throw 'answer 不能为空'
  this.setData({ answer })
}

function __reset(){
  console.log('__reset')
  const tarIndex = Math.floor(Math.random() * 4)
  const tar = this.data.list[tarIndex]
  return gfTimeout.haha(2000, [
    () => {
      this.showAnswer(3)
    },
    () => {
      this.showAnswer(2)
    },
    () => {
      this.showAnswer(1)
    },
    () => {
      this.showAnswer(tar.name)
    }
  ])
}

Page(page)