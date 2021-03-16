<template>
  <div class="app-container">
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>{{ contextName }}</span>
      </div>
      <p>{{ contextDescription }}</p>
      <el-upload
        class="upload-demo"
        :action="'http://localhost:8080/api/essais/uploadEssaiClinique'"
        :on-error="handelError"
        :on-success="handelSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :on-exceed="handleExceed"
        name="file"
        :headers="myHeaders"
        :limit="1"
        accept="application/pdf"
        :file-list="fileList"
      >
        <el-button :disabled="!view" icon="el-icon-plus" size="small" type="primary">Selectionner le ficher</el-button>
        <div slot="tip" class="el-upload__tip"> pdf fichies moins de 2mb</div>
      </el-upload>
    </el-card>
  </div>

</template>
<script>

export default {
  name: 'FileUploader',
  props: {
    contextName: { type: String, default: '' },
    contextDescription: { type: String, default: '' },
    commit: { type: String, default: '' },
    view: { type: Boolean, default: true }},
  data() {
    return {
      myHeaders: { 'authorization': this.$store.state.user.token },
      uploadPercentage: 0,
      fileList: []
    }
  },
  methods: {
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
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    }
  }
}
</script>
