import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/essais/getEssais',
    method: 'get',
    params: query
  })
}

export function fetchListAll(query) {
  return request({
    url: '/essais/getEssaisAll',
    method: 'get',
    params: query
  })
}

export function fetchMyListEval(query) {
  return request({
    url: '/essais/getMyEssaisEval',
    method: 'get',
    params: query
  })
}

export function getMetrics() {
  return request({
    url: '/essais/getMetrics',
    method: 'get'
  })
}

export function fetchArticle(id) {
  return request({
    url: '/essais/getEssaiFullData',
    method: 'get',
    params: { id }
  })
}

export function addRemark(id, data) {
  return request({
    url: `/essais/addRemark/${id}`,
    method: 'patch',
    data
  })
}

export function changeStatus(id, data) {
  return request({
    url: `/essais/changeStatus/${id}`,
    method: 'patch',
    data
  })
}

export function handelEssai(id) {
  return request({
    url: `/essais/handelEssai/${id}`,
    method: 'patch'
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
