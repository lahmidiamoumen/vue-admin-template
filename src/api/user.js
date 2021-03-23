import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/users/liste',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
