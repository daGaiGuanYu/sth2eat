module.exports = function(data = {}){
  this.data = data
  this.updateData = function(name){
    this.setData({
      [name]: this.data[name]
    })
  }

  this.gfInput = function(e){
    const key = e.target.dataset.name
    this.setData({
      [key]: e.detail.value
    })
  }
}