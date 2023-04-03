import request from '@/utils/request'

export function searchTyphoon(data) {
  return request({
    url: '/searchTyphoon/',
    method: 'post',
    data: data
  })
}

export function typhoonLineChart() {
  return request({
    url: '/typhonLinechart/',
    method: 'get'
  })
}

export function pieChart() {
  return request({
    url: '/typhonPieChart/',
    method: 'get'
  })
}

export function RainScatter() {
  return request({
    url: '/RainScatter/',
    method: 'get'
  })
}

export function searchWeather(data) {
  return request({
    url: '/searchWeather/',
    method: 'post',
    data: data
  })
}
