const { GFPage, toast, gfTimeout } = require('../../common/index')

const app = getApp()
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

page.onLoad = function(toEatId){
  console.debug('onLoad')
  this.reset()
}

let resetting = false
page.reset = async function(){
  console.debug('reset')
  if(resetting){
    toast('急？')
    return
  }

  resetting = true
  await __reset.call(this)
  resetting = false
}

page.showAnswer = function(answer){
  console.debug('showAnswer')
  if(!answer) throw 'answer 不能为空'
  this.setData({ answer })
}

function __reset(){
  console.debug('__reset')
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