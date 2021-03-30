const Model = require('../db-util/model')
const model = new Model('to_eat')
const itemModel = new Model('item')

module.exports = {
  async create(data){
    const result = await itemModel.createBatch(data.list)
    return await model.create({
      name: data.name,
      list: result.map( record => record._id )
    })
  }
}