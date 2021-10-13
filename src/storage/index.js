//封装操作localstorage本地存储方法
var storage = {
      set(key,value) {
            localStorage.setItem(key,JSON.stringify(value))
      },
      get(key){
            return localStorage.getItem(key) != 'undefined' ? JSON.parse(localStorage.getItem(key)) : undefined
      },
      getForIndex(index) {
            return localStorage.key(index)
      },
      getKeys(){
            let items = this.getAll()
            let keys = []
            for(let index = 0;index<items.length;index++) {
                  keys.push(items[index].key)
            }
            return keys
      },
      getLength(){
            return localStorage.length
      },
      getSupport(){
            return (typeof (Storage!=='undefined'))
      },
      remove(key) {
            localStorage.clear();
      },
      getAll(){
            let len = localStorage.length;//获取长度
            let arr = new Array(len)//定义数据集
            for(let i =0;i<len;i++){
                  let getKey = localStorage.key(i);

                  let getVal = localStorage.getItem(getKey);

                  arr[i] = {
                        'key':getKey,
                        'val':getVal
                  }
            }
            return arr
      }
}

export default storage