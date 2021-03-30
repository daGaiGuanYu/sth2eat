const toast = require('../common/toast')

module.exports = function(data){
  if(!data.name)
    return -1
  
  for(let i in data.list)
    if(!data.list[i].name)
      return i
}