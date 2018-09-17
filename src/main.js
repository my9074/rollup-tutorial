import fetchServer from './fetch'
import debounce from 'lodash-es/debounce'

let intervalId = null
let listenerId = null
let isActionFlag = null
const DEFAULT_INTERVAL = 100 * 60 * 2

function bootstrap () {
  listenerId = addActionListener(assignActionFlag)
  intervalId = setInterval(healthCheck, DEFAULT_INTERVAL)
}

function addActionListener () {
  return document.addEventListener(
    'click',
    debounce(assignActionFlag, 500),
    true
  )
}

function assignActionFlag () {
  isActionFlag = true
  console.log('click click')
}

async function healthCheck () {
  await fetchServer(isActionFlag)
  isActionFlag = null
}

bootstrap()
