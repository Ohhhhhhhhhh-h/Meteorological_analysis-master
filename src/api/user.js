import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/info/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout/',
    method: 'post'
  })
}

export function get_typhoon_by_id() {
  return request({
    url: '/get_typhoon_by_id/',
    method: 'post'
  })
}

