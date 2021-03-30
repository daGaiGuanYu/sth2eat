module.exports = function(data = {}){
  this.data = data
  this.updateData = function(name){
    this.setData({
      [name]: this.data[name]
    })
  }
}