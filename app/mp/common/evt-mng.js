// 事件
function EvtMng(){
  const map = {}
  return {
    on(name, handler){
      if(!map[name])
        map[name] = []
      map[name].push(handler)
    },
    emit(name, evt){
      const hList = map[name] || []
      return Promise.all(hList.map( h => h(evt) ))
    }
  }
}

// 全局事件管理
const __mng = EvtMng()
const appEvtMng = { // 凡需要的事件，均注册在这里（就不会乱注册了）
  onMyListChange: h => __mng.on('myListChange', h),
  emitMyListChange: e => __mng.emit('myListChange', e)
}
appEvtMng.EvtMng = EvtMng

module.exports = appEvtMng