import { fetchTest } from './foo'

fetchTest()
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(`error --> ${err}`)
  })