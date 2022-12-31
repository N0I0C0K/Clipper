import { observable, when, configure, autorun } from 'mobx'

configure({
  enforceActions: 'never',
})

export var systemState: {
  running: boolean
  runningTime: number
} = observable({
  running: false,
  runningTime: 0,
})

var intervalId: NodeJS.Timer | null = null

autorun(() => {
  if (systemState.running) {
    intervalId = setInterval(() => {
      systemState.runningTime += 1
    }, 1000)
    console.log(`mount ${intervalId}`)
  } else {
    console.log(`unmount ${intervalId}`)
    systemState.runningTime = 0
    clearInterval(intervalId!)
  }
})
