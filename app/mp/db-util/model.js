const db = wx.cloud.database()

module.exports = class {
  constructor(name){
    this.collection = db.collection(name)
  }

  async findById(id){
    return (await this.collection.doc(id).get()).data
  }

  async find(where){
    return (await this.collection.where(where).get()).data
  }
  async findOne(where){
    return (await this.find(where))[0]
  }

  create(data){
    return this.collection.add({ data })
  }
  createBatch(list){
    return Promise.all(list.map( record => this.create(record) ))
  }

  async update(data){
    return this.collection.doc(data._id).update({ data })
  }
}