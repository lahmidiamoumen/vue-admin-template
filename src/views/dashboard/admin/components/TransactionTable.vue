<template>
<div>
  <p>Mes essais</p>
  <el-table style="width: 100%;padding-top: 15px;" v-loading="listLoading" :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="Ref" width="100px">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id" class="link-type">
            <span>{{ row.id | getId }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="300px" align="center" label="Titre">
        <template slot-scope="{row}">
            <span>{{ row.titre }}</span>
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
          <span>{{ row.objectif }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Pormoteur">
        <template slot-scope="{row}">
            <span>{{ `${row.createdBy.nom} ${row.createdBy.prenom}` }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="140">
        <template slot-scope="{row}">
          <el-tag style="width: 100%" :type="row.status | statusFilter">
            {{ row.status | statusMessage }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/essai-liste/edit/'+row._id">
            <el-button type="primary" size="mini">
              Consulter
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
//import { transactionList } from '@/api/remote-search'
import Pagination from '@/components/Pagination'
import { fetchMyListEval, fetchMyListValid } from '@/api/essai'
import { mapGetters } from 'vuex'


export default {
  components: { Pagination },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    notValid () { return !this.roles.includes('valid')}
  },
  created() {
    if (this.notValid) {
      this.getList()
    }else{
      this.getListAll()
    }
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
      const statusMap = {
        valide: 'Validé ',
        evalue: 'Évalué',
        ouvert: 'Ouvert',
        progress: 'Examen en cours',
        insatisfait: 'Insatisfait'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchMyListEval(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = Number.isNaN(parseInt(response.data.total)) ? 0 : parseInt(response.data.total)
        this.listLoading = false
      })
    },
    getListAll() {
      this.listLoading = true
      fetchMyListValid(this.listQuery).then(response => {
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
