import request from '../utils/request'

export default {
  search (page, size, searchMap) {
    return request({
      url: `/staff/list/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  
  add (pojo) {
    return request({
      url: `/staff`,
      method: 'post',
      data: pojo
    })
  }
}