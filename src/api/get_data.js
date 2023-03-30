import request from '@/utils/request'

export function searchTyphoon(data) {
  return request({
    url: '/searchTyphoon/',
    method: 'post',
    data: data
  })
}

