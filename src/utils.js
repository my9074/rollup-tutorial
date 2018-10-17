/* eslint-disable prefer-promise-reject-errors */
import Cookies from 'cookies-js'
import jsonp from 'jsonp-promise'
import startsWith from 'lodash-es/startsWith'

const baseUrl = startsWith(location.href, 'https')
  ? `https://uc.jdcloud.com`
  : 'http://uc.jdcloud.com'

export function isSubAccount () {
  return !!Cookies.get('account')
}

export function logout () {
  // Cookies will be carried with logout jsonp in jdcloud.com domain
  const { promise } = jsonp(`${baseUrl}/subAccount/logout`)
  return promise
}

export function getCompanyID () {
  // logic copy with jdcloud-console-navi services.js
  let account = decodeURIComponent(Cookies.get('account'))
  if (account && account !== 'null') {
    account = account.replace(/\+/g, ' ')
    return account.substring(account.indexOf('@') + 2)
  }

  return ''
}

export function redirectUrl (companyID) {
  // returnUrl query is not working for the time being, standby
  const returnUrl = window.location.href
  window.location.href = `${baseUrl}/subAccount/login/${companyID}?returnUrl=${encodeURIComponent(
    returnUrl
  )}`
}

export function validateSession (actionFlag) {
  if (actionFlag) {
    const ticketId = Cookies.get('ticketId')
    const { promise } = jsonp(
      `${baseUrl}/u/subAccount/status?t=${ticketId}&renewal=true`
    )
    return promise
  } else {
    return Promise.reject('not be active')
  }
}
