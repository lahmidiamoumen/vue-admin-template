<template>
  <div class="app-container">
    <div class="filter-container" style="float: right">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="launchDialogue()"
      >
        Ajouter évaluateur
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="Nom" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.nom }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="Prenom">
        <template slot-scope="{ row }">
          <span>{{ row.prenom }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="240px" label="Email">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Créé a">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ ` ${timeSince(scope.row.createdAt)}` }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" label="Nom d’utilisateur">
        <template slot-scope="{ row }">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>

       <el-table-column min-width="120px" label="Actif">
        <template slot-scope="{ row }">
          <span>{{ row.actif ? 'Oui' : 'Non' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Des / Act" width="120">
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

    <el-dialog title="Evaluateur" :visible.sync="chnagerMDPopen" width="600px">
      <el-form label-position="right" style="width: 450px margin-left:50px">
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

    <el-dialog title="Evaluateur" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="dataForm" :rules="dom" :model="temp" label-position="right" label-width="160px" style="width: 400px margin-left:50px">
        <el-form-item label="Nom" prop="nom">
          <el-input v-model="temp.nom" style="width:300px" clearable />
        </el-form-item>
        <el-form-item label="Prenom" prop="prenom">
          <el-input v-model="temp.prenom" style="width:300px" clearable />
        </el-form-item>
        <el-form-item label="Nom d'utilisateur" prop="userName">
          <el-input v-model="temp.userName" style="width:300px" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="temp.email" style="width:300px" />
        </el-form-item>
        <el-form-item label="Mot de passe" prop="passWord">
          <el-input v-model="temp.passWord" style="width:300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Annuler
        </el-button>
        <el-button type="primary" @click="createData()">
          Ajouter
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchListEval, activateEval, changeMDPcall, createEval } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { validEmail } from '@/utils/validate'

export default {
  name: 'ArticleList',
  components: { Pagination },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (validEmail(value)) {
          callback()
        } else {
          callback(new Error('Invalid email'))
        }
      } else {
        callback()
      }
    }
    return {
      chnagerMDPopen: false,
      changer: {
        id: undefined,
        mdp: undefined
      },
      temp: {
        email: '',
        userName: '',
        passWord: String.fromCodePoint(...Array.from({ length: 8 }, () => Math.floor(Math.random() * 57) + 65)),
        nom: '',
        prenom: ''
      },
      list: [],
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 20,
        type: 'eval'
      },
      dom: {
        nom: [
          { required: true, message: 'Le Nom est obligatoire', trigger: 'blur' },
          { min: 3, max: 30, message: 'Le Nom doit être de 3 caractères minimum', trigger: 'blur' }
        ],
        prenom: [
          { required: true, message: 'Prenom est obligatoire', trigger: 'blur' },
          { min: 3, max: 30, message: 'Prenom doit être de 3 caractères minimum', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: 'Nom d\'utilisateur est obligatoire', trigger: 'blur' },
          { min: 6, max: 40, message: 'doit être de 6 caractères au minimum', trigger: 'blur' }
        ],
        passWord: [
           { required: true, message: 'ce champ est obligatoire', trigger: 'blur' },
          { min: 8, max: 40, message: 'le mot de passe doit être de 8 caractères minimum', trigger: 'blur' }
        ],
        email: [ { required: true, message: 'Email est obligatoire', trigger: 'blur' }, { validator: validateEmail }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    launchDialogue() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields();
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          createEval(this.temp).then(() => {
            const createdAt = Date.now() 
            this.list.unshift({...this.temp,createdAt })
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Évaluateur avec succès',
              type: 'success',
              duration: 2000
            })
          }) 
        }
      })
    },
    handleCreate() {},
    chnagerMDPCaller() {
      changeMDPcall(this.changer).then((response) => {
        if( response.data.user > 0) { 
          this.changer.id = undefined
          this.changer.mdp = undefined
          this.chnagerMDPopen = false
          this.$message({
            message: 'Mot de passe changé avec succès',
            type: 'success'
          })
        }
      })
    },
    chnagerMDPDialagoue(row) {
      this.changer.id = row._id
      this.chnagerMDPopen = true
    },
    handleModifyStatus(row, status) {
      row.actif = status
      activateEval({status: status}, row._id).then(() => {
        this.$message({
          message: status ? 'Compte Activer' : 'Compte Désactiver',
          type: 'success'
        })
      })
    },
    getList() {
      this.listLoading = true
      fetchListEval(this.listQuery).then((response) => {
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
