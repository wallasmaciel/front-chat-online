import Cookies, { CookieSetOptions } from "universal-cookie"

const cookies = new Cookies()
function set(key: string, value: any, options: CookieSetOptions = {
  path: '/'
}) {
  cookies.set(key, JSON.stringify(value), options)
}

function remove(key: string, options: CookieSetOptions = {
  path: '/'
}) {
  cookies.remove(key, options)
}

function get<T>(key: string): T | null {
  let tempElement: T | null
  try {
    tempElement = cookies.get(key) as T
  } catch (err) {
    tempElement = null
  }
  // 
  return tempElement
}

function getAll<T>(): T[] {
  return JSON.parse(cookies.getAll()) as T[]
}

const cookieUtils = {
  set,
  remove,
  get,
  getAll,
}

export default cookieUtils
