const { GFPage, toast } = require('../../common/index')

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

page.onLoad = function(){
  this.reset()
}

data.resetting = false
page.reset = function(){
  if(data.resetting){
    toast('急？')
    return
  }

  data.resetting = true
  __reset.call(this)
  setTimeout(() => {
    data.resetting = false
  }, 6000)
}

page.showAnswer = function(answer){
  if(!answer) throw 'answer 不能为空'
  this.setData({ answer })
}

function __reset(){
  const tarIndex = Math.floor(Math.random() * 4)
  const tar = this.data.list[tarIndex]

  this.showAnswer(3)
  setTimeout(() => {
    this.showAnswer(2)
  }, 2000)
  setTimeout(() => {
    this.showAnswer(1)
  }, 4000)
  setTimeout(() => {
    this.showAnswer(tar.name)
  }, 6000)
}

Page(page)