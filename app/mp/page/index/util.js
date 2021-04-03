module.exports = {
  getRandomItem(list){
    const tarIndex = Math.floor(Math.random() * list.length)
    return list[tarIndex]
  }
}