import ky from 'ky'

const request = ky.extend({
  headers: {
    'Content-Type': 'application/json'
  }
})

export default request
