import { readFileSync, writeFileSync, existsSync } from 'fs'
import { observable, IObservableArray, autorun, IObservable } from 'mobx'

//var urlData: string[] = []
export interface IUrlItem {
  url: string
}
export var urlData: IObservableArray<IUrlItem> = observable.array([])

export var systemState = observable({
  running: false,
})

var inited = false

const startInfo = '# Clipper Host Info Start'
const endInfo = '# Clipper Host Info End'
const hostPath = './testHost' //'C:/Windows/System32/drivers/etc/hosts'

export const addUrl: (url: string) => void = (url) => {
  urlData.push({ url })
}

export const initUrlData: () => void = () => {
  if (!existsSync('./data.config')) {
    console.log('data config not exist, created')
    writeFileSync('./data.config', '')
  }

  console.log('init url data from config')
  const data = readFileSync('./data.config', { flag: 'r' })
  const res = data.toString()
  console.log(`success load file, ${res}`)
  //urlData = res.split('\n').filter((val) => val.length > 0)
  urlData.clear()
  res
    .split('\n')
    .filter((val) => val.length > 0)
    .map((val) => {
      return { url: val }
    })
    .forEach((val) => {
      urlData.push(val)
    })

  inited = true
}

export const writeToHost: () => boolean = () => {
  var hostInfo = readFileSync(hostPath, {
    flag: 'r',
  })
    .toString()
    .split('\n')
  const sidx = hostInfo.findIndex((val) => val == startInfo)
  const eidx = hostInfo.findIndex((val) => val == endInfo)
  if (sidx != -1 && eidx != -1 && eidx > sidx) {
    hostInfo = hostInfo.filter((val, idx) => {
      return idx < sidx || idx > eidx
    })
  }
  hostInfo = [
    ...hostInfo,
    startInfo,
    ...urlData.map((val) => {
      return `127.0.0.1 ${val}`
    }),
    endInfo,
  ]
  try {
    writeFileSync(hostPath, hostInfo.join('\n'), { flag: 'w' })
  } catch (e) {
    console.log(e)
    return false
  }
  return true
}

export const clearHost: () => boolean = () => {
  var hostInfo = readFileSync(hostPath, {
    flag: 'r',
  })
    .toString()
    .split('\n')
  const sidx = hostInfo.findIndex((val) => val == startInfo)
  const eidx = hostInfo.findIndex((val) => val == endInfo)
  if (sidx != -1 && eidx != -1 && eidx > sidx) {
    hostInfo = hostInfo.filter((val, idx) => {
      return idx < sidx || idx > eidx
    })
    try {
      writeFileSync(hostPath, hostInfo.join('\n'), { flag: 'w' })
    } catch (e) {
      console.log(e)
      return false
    }
  }
  return true
}

autorun(() => {
  console.log(urlData.map((val) => val.url).join(';'))
})

initUrlData()
