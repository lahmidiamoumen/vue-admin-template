import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/essais/getEssais',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/essais/getEssaiFullData',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createEssai(data) {
  return request({
    url: '/essais/createEssaiClinique',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
