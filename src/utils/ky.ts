import ky from 'ky'

let opts = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const request = ky.extend(opts)

export default request
