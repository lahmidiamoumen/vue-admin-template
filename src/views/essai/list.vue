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
          <span>{{ ` ${timeSince(scope.row.createdAt)}`}}</span>
        </template>
      </el-table-column>


      <el-table-column min-width="120px" label="Objectif">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id" class="link-type">
            <span>{{ row.objectif }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column v-if="notProm" min-width="120px" label="Pormoteur">
        <template slot-scope="{row}">
            <span>{{ `${row.createdBy.nom} ${row.createdBy.prenom}` }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusMessage }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/essai-liste/edit/'+scope.row._id">
            <el-button type="primary" size="mini">
              Consulter
            </el-button>
          </router-link>
          <el-button v-if="notProm" size="mini" type="success" style="margin-left:5px" @click="handleModifyStatus(row._id)">
              S'occuper
            </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="notProm ? getListAll : getList" />
  </div>
</template>

<script>
import { fetchList, fetchListAll } from '@/api/essai'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    notProm () { return !this.roles.includes('promo')}
  },
  created() {
    if (this.notProm) {
      this.getListAll()
    }else{
      this.getList()
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        satisfait: 'success',
        ouvert: 'info',
        progress: 'info',
        insatisfait: 'danger'
      }
      return statusMap[status]
    },
    statusMessage(status) {
      const statusMap = {
        satisfait: 'satisfait',
        ouvert: 'Ouvert',
        progress: 'Examen en cours',
        insatisfait: 'insatisfait'
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
  methods: {
    handleModifyStatus(id){

    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = Number.isNaN(parseInt(response.data.total)) ? 0 : parseInt(response.data.total)
        this.listLoading = false
      })
    },
    getListAll() {
      this.listLoading = true
      fetchListAll(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = Number.isNaN(parseInt(response.data.total)) ? 0 : parseInt(response.data.total)
        this.listLoading = false
      })
    },
    timeSince(date) {
      return new Date(date).toDateString()
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
