<template>
  <div class="app-container">
      <el-card shadow="never" :body-style="{ padding: '10px' }">
        <div slot="header">
          <span style="font-size: 18px" > {{contextDescription }}</span>
          <el-tag v-if="hasRemarkD" type="danger" style="font-size: 15px;float: right"  effect="dark">document non-approuvé</el-tag>
          <dl v-if="hasRemarkD" style="border: 0.5px splid color: #f56c6c;">
                <el-divider content-position="left"> <dt style="color: #f56c6c; margin-right: 8px;font-size: 16px"><b>Remarque</b></dt></el-divider>               
                <dd>{{remrqueD}}</dd>
                <dd style="margin-top: 6px;">
                  <el-upload
                    action="'"
                    :on-error="handelError"
                    :on-success="handelSuccess"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :before-remove="beforeRemove"
                    :on-exceed="handleExceed"
                    :headers="myHeaders"
                    :limit="1"
                    accept="application/pdf"
                    :file-list="fileList"
                    ref="upload">
                      <el-button slot="trigger" size="small" type="primary">Choisissez un fichie</el-button>
                      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="null">soumettre</el-button> -->
                      <div slot="tip" class="el-upload__tip">pdf uniqument moins de 2mb</div>
                  </el-upload>
                </dd>
              </dl>
        </div>
        <el-link type="primary" :href="value">Voire document</el-link>
        <div style="float: right">
          <el-button type="danger" size="mini" @click="lanuchRemarque()">
            Ajouter remarques
          </el-button>
          <el-button type="primary" size="mini" @click="false">
            Approuvé
          </el-button>
        </div>
      </el-card>
      <el-dialog title="Ajouter remarques" :visible.sync="showDialog" >
        <el-form ref="dataForm" :rules="dom" :model="temp"  style="padding: 0px 50px">
          <el-form-item label="Remarque" prop="remrque">
            <el-input v-model="temp.remrque" type="textarea" placeholder="Le document n'est pas conforme à..." :rows="3" clearable />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="addRemarque()">
            Confirm
          </el-button>
        </div>
      </el-dialog>  
  </div>

</template>
<script>
import {addRemark} from '@/api/essai'

export default {
  name: 'FileUploaderEdit',
  props: {
    contextDescription: { type: String, default: '' },
    commit: { type: String, default: '' },
    value: { type: String, default: '' },
    remrque: { type: String, default: '' },
    hasRemark: { type: Boolean, default: false }
  },
  data() {
    return {
      showDialog: false,
      remrqueD: this.remrque,
      hasRemarkD: this.hasRemark,
      temp: { remrque: '',commit: ''},
      dom: { remrque: [{required: true, message: 'Ce champ est obligatoire', trigger: 'blur' }] },
      myHeaders: { 'authorization': this.$store.state.user.token },
      uploadPercentage: 0,
      fileList: []
    }
  },
  computed: {
    getId: {
      get: function() {
        return this.$route.params && this.$route.params.id
      }
    }
  },
  methods: {
    lanuchRemarque() {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    addRemarque() {
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.showDialog = false
          this.temp.commit = this.commit
          addRemark(this.getId,this.temp).then((response) => {
            if( response.data.essai > 0){
              console.log(response.data.essai)
              this.remrqueD = this.temp.remrque
              this.hasRemarkD = true
            }
          })
          
        }
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'application/pdf'
      const isLt2M = file.size / 1024 / 1024 < 2
      console.log(this.myHeaders)
      if (!isJPG) {
        this.$message.error('les fichies pdf uniquement!')
      }
      if (!isLt2M) {
        this.$message.error('la taile de fichier est sup de 2MB!')
      }
      return isJPG && isLt2M
    },
    handelSuccess(repons, file) {
      this.$store.dispatch(`files/${this.$props.commit}`, repons.url)
      this.fileList.push(file)
    },
    handelError(err, file) {
      console.log(err)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`un seul fichier uniquement`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Annuler la transformation de ${file.name} ?`)
    }
  }
}
</script>
<style>
.el-upload{
  text-align: unset;
}
.el-upload__tip {
  color: #a3a5a9;
  margin-top: 2px;
}
.el-upload-dragger {
    margin-top: 12px;
    width: unset; 
    height: 150px;
}
.el-upload {
  width: 100%;
}
</style>
