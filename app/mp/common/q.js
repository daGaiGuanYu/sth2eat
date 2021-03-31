module.exports = function(title, onConfirm, onCancel){
  wx.showModal({
    title,
    success(res){
      if(res.confirm) onConfirm()
      else if(onCancel) onCancel()
    }
  })
}