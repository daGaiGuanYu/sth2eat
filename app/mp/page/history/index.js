const { GFPage, showActionSheet, nav2, showLoading, toast } = require('../../common/index')
const Model = require('../../db-util/model')
const userApi = require('../../api/user')

const model = new Model('list')
const userModel = new Model('user')
const page = new GFPage()

page.onLoad = function(){
  this.loadData()
}

page.loadData = async function(noty){
  const userinfo = await userApi.getUserRecord()
  const list = await Promise.all(
    userinfo.list.map(id => model.findById(id))
  )
  this.setData({ list })
  if(noty)
    toast('数据已刷新')
}

page.onTapItem = function(e){
  const { id, index } = e.currentTarget.dataset
  showActionSheet([
    ['详情', () => {
      nav2('/page/list-info/index?id=' + id)
    }],
    ['拷贝', () => {
      nav2('/page/form/index?copyId=' + id)
    }],
    ['删除', async () => {
      showLoading('等着！')
      const userRecord = await userApi.getUserRecord()
      if(userRecord.list[index] != id) { // 删除时，数据已发生变动
        wx.hideLoading()
        return wx.showModal({
          title: '数据滞后，需要刷新',
          confirmText: '刷新数据',
          success: async res => {
            if(res.confirm)
              this.loadData(true)
          }
        })
      }
      userRecord.list.splice(index, 1)
      await userModel.updateById(userRecord._id, {
        list: userRecord.list
      })
      await this.loadData()
      wx.hideLoading()
      toast('删了')
    }],
    ['使用', () => userApi.setCurrentList(id) ]
  ])
}

Page(page)