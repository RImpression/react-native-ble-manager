import AsyncStorage from '@react-native-community/async-storage';

function clear() {
  return AsyncStorage.clear()
}

function get(key: string, defaultValue = null) {
  return AsyncStorage.getItem(key).then(
    value => {
      let val
      try {
        val = JSON.parse(value)
      } catch (e) {
        val = value
      }
      return (val !== null ? val : defaultValue)
    }
  )
}

function set(key: string, value: any) {
  return AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
}

function remove(key: string) {
  return AsyncStorage.removeItem(key)
}

function multiGet(...keys: string[]) {
  return AsyncStorage.multiGet([...keys]).then(stores => {
    const data = {}
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1])
    })
    return data
  })
}

function multiRemove(...keys: string[]) {
  return AsyncStorage.multiRemove([...keys])
}

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
}