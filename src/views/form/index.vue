<template>
  <div class="app-container">
    <div class="filter-container" >
      <aside>
      La liste des promoteurs
    </aside>
    </div>

    <el-dialog title="Evaluateur" :visible.sync="chnagerMDPopen" width="600px">
      <el-form label-position="right" style="width: 400px margin-left:50px">
        <el-form-item label="Choisir un nouveau mot de passe">
          <el-input v-model="changer.mdp" style="width:300px" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chnagerMDPopen = false">
          Annuler
        </el-button>
        <el-button type="primary" @click="chnagerMDPCaller()">
          Sauvgarder
        </el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="Nom" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.nom }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Prenom">
        <template slot-scope="{ row }">
          <span>{{ row.prenom }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" label="Téléphone">
        <template slot-scope="{ row }">
          <span>{{ row.telephone }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="Email">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" label="Créé a">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ timeSince(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Fonction" width="110">
        <template slot-scope="{ row }">
          {{ row.fonction }}
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="120px" label="Objectif">
        <template slot-scope="{ row }">
          <span>{{ row.etablissement }}</span>
        </template>
      </el-table-column> -->

      <el-table-column min-width="120px" label="Adresse">
        <template slot-scope="{ row }">
          <span>{{ row.adresse }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Actif">
        <template slot-scope="{ row }">
          <span>{{ row.actif }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="Nom d’utilisateur">
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Status du compte" width="120">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.actif"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row, false)"
          >
            Désactiver
          </el-button>
          <el-button
            v-if="!row.actif"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, true)"
          >
            Activer
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Mdp" width="120">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.actif"
            size="mini"
            @click="chnagerMDPDialagoue(row)"
          >
          Changer
          </el-button>
        </template>
      </el-table-column> 
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { activateAccount, fetchList,changeMDPcall } from '@/api/user'
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
      chnagerMDPopen: false,
      changer: {
        id: undefined,
        mdp: undefined
      },
      list: [],
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
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
    chnagerMDPCaller() {
      changeMDPcall(this.changer).then((response) => {
        if( response.data.user > 0) { 
          this.changer.id = undefined
          this.changer.mdp = undefined
          this.chnagerMDPopen = false
          this.$message({
            message: 'Mot de passe changé avec succès',
            type: 'success'
          })``
        }
      })
    },
    chnagerMDPDialagoue(row) {
      this.changer.id = row._id
      this.chnagerMDPopen = true
    },
    handleModifyStatus(row, status) {
      row.actif = status
      activateAccount({status: status}, row._id).then(() => {
        this.$message({
          message: status ? 'Compte Activer' : 'Compte Désactiver',
          type: 'success'
        })
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((response) => {
        console.log(response)
        this.list = response.data.items
        this.total = Number.isNaN(parseInt(response.data.total))
          ? 0
          : parseInt(response.data.total)
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
  padding-right: 100px
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px
}
</style>
