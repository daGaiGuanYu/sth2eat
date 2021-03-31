const db = wx.cloud.database()

class Model {
  constructor(name){
    this.collection = db.collection(name)
  }

  async findById(id){
    return (await this.collection.doc(id).get()).data
  }

  async find(where = {}){
    return (await this.collection.where(where).get()).data
  }

  findNotDeleted(where = {}){
    where.deletedAt = null
    return this.find(where)
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

  async updateById(id, data){
    return this.collection.doc(id).update({ data })
  }
}

Model._ = db.command

module.exports = Model