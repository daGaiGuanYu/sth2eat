const { GFPage, setPageTitle, nav2 } = require('../../../common/index')

const page = new GFPage()
const knife = {}

page.onLoad = function(){
  const option = nav2.lastOption
  setPageTitle(option.title)
  this.setData({ value: option.value })
  knife.evtmng = this.getOpenerEventChannel()
}

Page(page)