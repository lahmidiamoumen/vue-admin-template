<template>
  <div class="app-container">
     <div class="filter-container" style="float:right">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Ajouter un evaluateure
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Nom" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.nom }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="Prenom">
        <template slot-scope="{row}">
            <span>{{ row.prenom }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" label="Telephon">
        <template slot-scope="{row}">
            <span>{{ row.telephone }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="240px" label="Email">
        <template slot-scope="{row}">
            <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Créé a">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ timeSince(scope.row.createdAt)}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Fonction" width="110">
        <template slot-scope="{row}">
            {{ row.fonction }}
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Objectif">
        <template slot-scope="{row}">
            <span>{{ row.etablissement }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Adresse">
        <template slot-scope="{row}">
            <span>{{ row.adresse }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Grade">
        <template slot-scope="{row}">
            <span>{{ row.grade }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Actif">
        <template slot-scope="{row}">
            <span>{{ row.actif }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="Username">
        <template slot-scope="{row}">
            <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Status de compte" width="120">
        <template slot-scope="{row}">
          <el-button v-if="row.actif" size="mini" type="danger" @click="handleModifyStatus(row, false)">
            Désactiver
          </el-button>
          <el-button v-if="!row.actif" size="mini" type="success" @click="handleModifyStatus(row, true)">
            Activer
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="createData()">
          Confirm
        </el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { fetchList } from '@/api/user'
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleCreate(){

    },
    handleModifyStatus(row, status) {
      row.actif = status
      this.$message({
        message: status ? 'Compte Activer' : 'Compte Désactiver',
        type: 'success'
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.items
        this.total = Number.isNaN(parseInt(response.data.total)) ? 0 : parseInt(response.data.total)
        this.listLoading = false
      })
    },
    timeSince(date) { return new Date(date).toLocaleString().split(', ')[0]}
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
