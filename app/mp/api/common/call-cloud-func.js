module.exports = function(name, data, config){
  return wx.cloud.callFunction({
    name, data, config
  })
    .then(response => {
      return response.result
    })
}