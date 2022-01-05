<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" clearable placeholder="Chercher dans titre.." style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select  v-model="listQuery.status" placeholder="Statut" clearable style="width: 90px;margin-left: 8px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves style="margin-left: 8px" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Recherche
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Télécharger 
      </el-button>
    </div>
    
    <el-table v-loading="listLoading" :data="list" border @sort-change="sortChange" fit highlight-current-row style="width: 100%">
      <el-table-column sortable="custom" prop="id" width="110px" label="Ref">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id" class="link-type">
            <span>{{ row.id | getId }}</span>
          </router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Essai" width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.essai }}</span>
        </template>
      </el-table-column> -->
      <el-table-column width="300px" label="Titre">
        <template slot-scope="{row}">
            <span>{{ row.titre }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" sortable prop="date" align="center" label="Date">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ ` ${timeSince(scope.row.createdAt)}`}}</span>
        </template>
      </el-table-column>


      <el-table-column min-width="270px" label="Objectif">
        <template slot-scope="{row}">
          <span>{{ row.objectif }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="notProm" width="210px" label="Pormoteur">
        <template slot-scope="{row}">
            <span>{{ `${row.createdBy.nom} ${row.createdBy.prenom}` }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" sortable prop="status"  label="Status" width="130px">
        <template slot-scope="{row}">
          <el-tag style="width: 100%" :type="row.status | statusFilter">
            {{ row.status | statusMessage }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id">
            <el-button :style=" notProm && notAdmin && notValid && !row.evaluatedBy ? '' : 'width: 100%' " type="primary" size="mini">
              Consulter
            </el-button>
          </router-link>
          <el-button v-if="notProm && notValid && notAdmin && !row.evaluatedBy" size="mini" type="success" style="margin-left:5px" @click="handleModifyStatus(row)">
              S'occuper 
            </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="callList" />
  </div>
</template>

<script>
import { fetchList, fetchListAll, handelEssai } from '@/api/essai'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

const statusMap = {
    valide: 'Validé ',
    evalue: 'Évalué',
    ouvert: 'Ouvert',
    progress: 'Examen en cours',
    insatisfait: 'Insatisfait'
  }
export default {
  name: 'ArticleList',
  components: { Pagination },
  directives: { waves },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    notProm () { return !this.roles.includes('promo')},
    notValid () { return !this.roles.includes('valid')},
    notAdmin () { return !this.roles.includes('admin')}
  },
  created() {
    this.callList()
  },
  filters: {
    getId(id){
      return id ? 'EC_' +  String(id).padStart(6, '0') : 'EC_000000';
    },
    statusFilter(status) {
      const statusMap = {
        valide: 'success',
        evalue: 'success',
        ouvert: 'info',
        progress: 'info',
        insatisfait: 'danger'
      }
      return statusMap[status]
    },
    statusMessage(status) {
      
      return statusMap[status]
    }
  },
  data() {
    return {
      downloadLoading: false,
      list: [],
      total: 0,
      listLoading: true,
      statusOptions: [
        { key: 'valide', value: 'Validé'},
        { key: 'evalue', value: 'Évalué'},
        { key: 'ouvert', value: 'Ouvert'},
        { key: 'progress', value: 'Examen en cours'},
        { key: 'insatisfait', value: 'Insatisfait'}],
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        status: undefined,
        sort: '-id'
      }
    }
  },
  methods: {
    callList() {
      if (this.notProm) {
        this.getListAll()
      }else{
        this.getList()
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Ref', 'Titre', 'Objectif', 'Pormoteur', 'Date']
        const filterVal = ['id', 'titre', 'objectif', 'createdBy', 'createdAt']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'Essais-cliniques'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'id') {
          return v[j] ? 'EC_' +  String(v[j]).padStart(6, '0') : 'EC_000000';
        } else if (j === 'createdAt') {
          return this.timeSince(v[j])
        } else if (j === 'createdBy') {
          return v[j].nom + ' ' + v[j].prenom
        } else {
          return v[j]
        }
      }))
    },
    handleFilter() {
      this.listQuery.page = 1
      this.callList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      } else if (prop === 'date') {
        this.sortByDate(order)
      } else if (prop === 'status') {
        this.sortByStatus(order)
      }
    },
    sortByDate(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+createdAt'
      } else {
        this.listQuery.sort = '-createdAt'
      }
      this.handleFilter()
    },
    sortByStatus(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+status'
      } else {
        this.listQuery.sort = '-status'
      }
      this.handleFilter()
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleModifyStatus(row) {
      handelEssai(row._id).then((response) => {
        if( response.data.essai) { 
            row.evaluatedBy = 'somt'
            row.status = 'progress'
            this.$notify({
              title: 'Success',
              message: response.data.essai,
              type: 'success',
              duration: 2000
            })
        }
      })
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
      return new Date(date).toLocaleDateString("fr-FR",  {year: 'numeric', month: 'long', day: 'numeric' })
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
