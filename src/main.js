import 'es6-promise/auto'
import {
  validateSession,
  isTicketSubAccount,
  logout,
  getCompanyID,
  redirectUrl
} from './utils'
import debounce from 'lodash-es/debounce'

// const DEFAULT_INTERVAL = 1000 * 60 * 2
const DEFAULT_INTERVAL = 1000 * 30 * 1
let isActionFlag = true

function bootstrap () {
  addActionListener(assignActionFlag)
  setInterval(healthCheck, DEFAULT_INTERVAL)
}

function addActionListener () {
  return document.addEventListener(
    'click',
    debounce(assignActionFlag, 500),
    true
  )
}

function assignActionFlag () {
  console.log('user has been click...')
  isActionFlag = true
}

function healthCheck () {
  if (isTicketSubAccount()) {
    console.log('fetch backend to validateSession...')
    validateSession(isActionFlag)
      .then(data => {
        if (data.expired) {
          console.log('expired!!!, should be logout...')
          const companyID = getCompanyID()
          logout().then(data => {
            redirectUrl(companyID)
          })
        }
        console.log('session is not expired...')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        isActionFlag = null
      })
  }
}

bootstrap()
