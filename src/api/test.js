import request from '../utils/request'

const BASE_URI = '/dev-api'
/* request.get('/db.json').then(response => {
  console.log(response.data)
}) */

/* request({
  method: 'get',
  url: '/db.json'
}).then (response => {
  console.log(response.data)
}) */

export default {
  getList () {
    const req = request ({
      method: 'get',
      url: '/db.json'
    })
    return req
  }
}