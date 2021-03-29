const db = wx.cloud.database()

module.exports = class {
  constructor(name){
    this.collection = db.collection(name)
  }

  async getById(id){
    return (await this.collection.doc(id).get()).data
  }

  create(data){
    return this.collection.add({ data })
  }

  async update(data){
    return this.collection.doc(data._id).update({ data })
  }
}