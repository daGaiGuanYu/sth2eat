const defaultAnswer = '……'

Page({
  data: {
    list: [
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
    ],
    answer: defaultAnswer,
    resetting: false
  },
  onShow() {
    this.reset()
  },
  __reset(){
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
  },
  showAnswer(answer = defaultAnswer){
    this.setData({
      answer
    })
  },
  reset(){
    if(this.data.resetting){
      wx.showToast({
        icon: 'none',
        title: '急？'
      })
      return
    }

    this.setData({
      resetting: true
    })
    this.__reset()
    setTimeout(() => {
      this.setData({
        resetting: false
      })
    }, 6000)
  }
})