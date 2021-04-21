<template>
  <div class="app-container">
      <el-card shadow="never" :body-style="{ padding: '10px' }">
        <div slot="header">
          <span style="font-size: 18px" > {{contextDescription }}</span>
          <el-tag v-if="doc.status === 'nonaprouve' && isPromo" type="danger" style="font-size: 12px;float: right"  effect="dark">document non-approuvé</el-tag>
          <el-tag v-if="doc.status === 'aprouve'" type="success" style="font-size: 12px;float: right"  effect="dark">document approuvé</el-tag>
          <el-tag v-if="doc.status === 'corrected' && isEval" type="info" style="font-size: 12px;float: right"  effect="dark">document corrigé</el-tag>
          <dl v-if="doc.hasRemark" style="border: 0.5px splid color: #f56c6c;">
                <el-divider content-position="left"> <dt style="color: #f56c6c; margin-right: 8px;font-size: 16px"><b>Remarque</b></dt></el-divider>               
                <dd>{{doc.remarque}}</dd>
                <dd style="margin-top: 6px;">
                  <el-upload
                  v-if="isPromo"
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
        <el-link type="primary" target="_blank" :href="`/${doc.value}`">Voire document</el-link>
        <div v-if="doc.status !== 'aprouve' && isEval" style="float: right">
          <el-button type="danger" size="mini" @click="showDialog = true">
            {{doc.hasRemark ? 'Modifier' : 'Ajouter'}} remarques
          </el-button>
          <el-button type="primary" size="mini" @click="aproved()">
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
import {addRemark, changeStatus} from '@/api/essai'
import { mapGetters } from 'vuex'


export default {
  name: 'FileUploaderEdit',
  props: {
    contextDescription: { type: String, default: '' },
    commit: { type: String, default: '' },
    doc: { type: Object, default: () => ({})},
  },
  data() {
    return {
      showDialog: false,
      remrqueD: this.doc.remarque,
      hasRemarkD: this.doc.hasRemark,
      temp: { remrque: this.doc.remarque ,commit: '' },
      dom: { remrque: [{required: true, message: 'Ce champ est obligatoire', trigger: 'blur' }] },
      myHeaders: { 'authorization': this.$store.state.user.token },
      uploadPercentage: 0,
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    isPromo: { get: function() { return this.roles.includes('promo') }},
    isValid: { get: function() { return this.roles.includes('valid') }},
    isEval: { get: function() { return this.roles.includes('eval') }},
    getId: { get: function() { return this.$route.params && this.$route.params.id }}
  },
  methods: {
    aproved(){
      changeStatus(this.getId, {commit: this.commit,remrque: this.doc.remarque} ).then((response) => {
        if( response.data.essai > 0) { 
                this.$emit('update:doc', { 
                remarque: this.doc.remarque,
                hasRemark: this.doc.hasRemark,
                status: 'aprouve',
                value: this.doc.value
              })  
            }
      })
    },
    addRemarque() {
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.showDialog = false
          this.temp.commit = this.commit
          
          addRemark(this.getId,this.temp).then((response) => {
            if( response.data.essai > 0) { 
                this.$emit('update:doc', { 
                remarque: this.temp.remrque,
                hasRemark: true,
                status: 'nonaprouve',
                value: this.doc.value
              })  
            }
          }) 
        }
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'application/pdf'
      const isLt2M = file.size / 1024 / 1024 < 5
      console.log(this.myHeaders)
      if (!isJPG) {
        this.$message.error('les fichies pdf uniquement!')
      }
      if (!isLt2M) {
        this.$message.error('la taile de fichier est sup de 5MB!')
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
