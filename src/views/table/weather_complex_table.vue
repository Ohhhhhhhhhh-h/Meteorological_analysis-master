<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start_date" class="filter-item" style="width: 200px;" type="date" placeholder="选择起始日期" value-format="timestamp" :editable="false" :default-value="last_time" />
      <el-date-picker v-model="listQuery.end_date" class="filter-item" style="width: 200px;" type="date" placeholder="选择终止日期" value-format="timestamp" :editable="false" :default-value="last_time" />
      <el-input-number v-model="listQuery.limit" :min="10" :max="500" :step="10" step-strictly class="filter-item" style="width: 200px;" label="数据条数" />
      <el-input v-model="listQuery.key_word" :min="10" :max="500" :step="10" step-strictly class="filter-item" style="width: 200px;" placeholder="气象站名称" label="气象站名称" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      :default-sort="{prop: 'locus_time', order: 'descending'}"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="气象站所在地" prop="name" sortable align="center" width="80" />
      <el-table-column label="气象站ID" prop="station_id" sortable align="center" width="80" />
      <el-table-column label="气象站纬度" prop="lat" sortable align="center" width="80" />
      <el-table-column label="气象站经度" prop="lon" sortable align="center" width="100" />
      <el-table-column label="当地时间" prop="当地时间" sortable width="150px" align="center" />
      <el-table-column label="地面以上2米处的大气温度（摄氏度）" prop="T" min-width="100px" />
      <el-table-column label="气象站公布的当前天气情况" prop="WW" min-width="100px" />
      <el-table-column label="最低云层底部的高度（米）" prop="H" min-width="100px" />
      <el-table-column label="降水量（毫米）" prop="RRR" min-width="100px" />
      <el-table-column label="地面高度10~12米处的风向 （罗盘方位）" prop="DD" class-name="status-col" width="100" />
      <el-table-column label="地面高度10~12米处的平均风速 (米每秒)" prop="Ff" class-name="status-col" width="100" />
      <el-table-column label="气象站水平的大气压（毫米汞柱）" prop="Po" class-name="status-col" width="100" />
    </el-table>
  </div>
</template>

<script>
import { searchWeather } from '@/api/get_data'
import waves from '@/directive/waves' // waves directive
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  // components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      typhoon_id: 0,
      last_time: 1670835600000,
      tableKey: 0,
      list: null,
      listLoading: false,
      listQuery: {
        limit: 20,
        start_date: this.last_time - 315576000000,
        end_date: this.last_time,
        key_word: ''
      },
      temp: {
        id: undefined,
        start_date: 0,
        end_date: Number(new Date()),
        timestamp: new Date(),
        title: '',
        status: 'published'
      },
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
  },
  methods: {
    getWeather() {
      if (isNaN(this.listQuery['start_date']) || isNaN(this.listQuery['end_date'])) {
        if (this.listQuery.key_word !== '') {
          this.listLoading = true
          searchWeather(this.listQuery).then(response => {
            this.list = response.data
            this.listLoading = false
          })
        }
      } else {
        this.listLoading = true
        searchWeather(this.listQuery).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getWeather()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    }
  }
}
</script>
