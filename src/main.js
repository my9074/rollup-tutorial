import 'es6-promise/auto'
import {
  validateSession,
  isTicketSubAccount,
  logout,
  getCompanyID,
  redirectUrl
} from './utils'
import debounce from 'lodash-es/debounce'

const DEFAULT_INTERVAL = 1000 * 60 * 2
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
  isActionFlag = true
}

function healthCheck () {
  if (isTicketSubAccount()) {
    validateSession(isActionFlag)
      .then(data => {
        if (data.expired) {
          const companyID = getCompanyID()
          logout().then(data => {
            redirectUrl(companyID)
          })
        }
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
