<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Essai" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.essai }}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="Titre">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id" class="link-type">
            <span>{{ row.titre }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="Date">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ timeSince(scope.row.createdAt)}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Objectif">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id" class="link-type">
            <span>{{ row.objectif }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/essai-liste/edit/'+scope.row._id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/essai'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
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
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = Number.isNaN(parseInt(response.data.total)) ? 0 : parseInt(response.data.total)
        this.listLoading = false
      })
    },
    timeSince(date) {
      date = new Date(date).toLocaleString()
      return date
/*       var seconds = Math.floor((new Date() - date) / 1000)
      var interval = seconds / 31536000
      if (interval > 1) {
        return Math.floor(interval) + ' years ago'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months ago'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days ago'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours ago'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes ago'
      }
      return Math.floor(seconds) + ' seconds ago' */
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
