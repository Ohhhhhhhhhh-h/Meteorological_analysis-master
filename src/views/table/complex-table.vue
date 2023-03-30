<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start_date" class="filter-item" style="width: 200px;" type="date" placeholder="选择起始日期" value-format="timestamp" :editable="false" :default-value="last_time" />
      <el-date-picker v-model="listQuery.end_date" class="filter-item" style="width: 200px;" type="date" placeholder="选择终止日期" value-format="timestamp" :editable="false" :default-value="last_time" />
      <el-input-number v-model="listQuery.limit" :min="1" :max="500" label="数据条数" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
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
      <el-table-column label="轨迹ID" prop="locus_id" sortable align="center" width="80" />
      <el-table-column label="台风ID" prop="typhoon_id" sortable align="center" width="80" />
      <el-table-column label="名称" prop="cname" sortable align="center" width="100" />
      <el-table-column label="日期" prop="locus_time" sortable width="150px" align="center" />
      <el-table-column label="台风强度" prop="typhoon_strength" min-width="100px" />
      <el-table-column label="中心气压" prop="Central_air_pressure" min-width="100px" />
      <el-table-column label="最大风速" prop="Maximum_wind_speed" min-width="100px" />
      <el-table-column label="移动速度" prop="Movement_speed" min-width="100px" />
      <el-table-column label="经度" prop="longitude" class-name="status-col" width="100" />
      <el-table-column label="纬度" prop="latitude" class-name="status-col" width="100" />
    </el-table>
  </div>
</template>

<script>
import { searchTyphoon } from '@/api/get_data'
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
        start_date: this.last_time - 86400000,
        end_date: this.last_time,
        sort: '+id'
      },
      show_date: {
        alert_data(date) {
          debugger
        }
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
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
    // this.getTyphoon()
  },
  methods: {
    getTyphoon() {
      this.listLoading = true
      searchTyphoon(this.listQuery).then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getTyphoon()
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
