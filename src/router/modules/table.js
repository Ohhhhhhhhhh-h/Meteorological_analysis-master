/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table',
  name: 'Table',
  meta: {
    title: '数据查询',
    icon: 'table'
  },
  children: [
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '台风查询' }
    },
    {
      path: 'weather_complex_table',
      component: () => import('@/views/table/weather_complex_table'),
      name: 'WeatherComplexTable',
      meta: { title: '天气查询' }
    }
  ]
}
export default tableRouter
