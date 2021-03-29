function _(title, icon){
  wx.showToast({
    icon, title
  })
}
function toast(title){
  _(title, 'none')
}

toast.error = function(title){
  _(title, 'error')
}
toast.loading = function(title){
  _(title, 'loading')
}
toast.success = function(title){
  _(title, 'success')
}

module.exports = toast