module.exports = class {
  constructor(data){
    this.data = data || {}
  }

  updateState(name){
    this.setState({
      [name]: this.data[name]
    })
  }
}