<template>
<div class="create-container">
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:5px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
      
  </div>
    <div class="login-form" style="padding: 0 35px">
        <el-button class=""  type="text" @click="launchDialogue()">
          Créer un compte
        </el-button>
      </div>

      <el-dialog
        title="Activation email"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form ref="dataEmail" :rules="dom" :model="email" label-position="right" style="width: 400px margin: 50px auto">
          <el-form-item label="Code de verifcation email" prop="code">
            <el-input v-model="email.code" style="width:300px" clearable />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">
            Annuler
          </el-button>
          <el-button type="primary" @click="verifyEmail()">
            Confirmer
          </el-button>
        </div>  
      </el-dialog>

      <el-dialog
        center
        title="Activation email"
        :visible.sync="dialogCompte"
        width="40%">
        <p>Votre compte est actuellement désactivé.veuillez contacter votre administrateur</p>
        
      </el-dialog>

    <el-dialog title="Créer un compte promoteur" :visible.sync="showDialog" width="650px">
      <el-form ref="dataForm" :rules="dom" :model="temp" label-position="right" label-width="200px" style="width: 400px margin: 50px auto">
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
        <el-form-item label="Etablissement">
          <el-input v-model="temp.etablissement" style="width:300px" clearable />
        </el-form-item>
        <el-form-item label="Au profil de">
          <el-input v-model="temp.auProfilDe" style="width:300px" clearable />
        </el-form-item>
        <el-form-item label="Fonction">
          <el-input v-model="temp.fonction" style="width:300px" clearable />
        </el-form-item>
        <el-form-item label="Telephone" prop="telephone">
          <el-input v-model="temp.telephone" style="width:300px" clearable />
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="temp.address" type="textarea" style="width:300px" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="createData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { createUser, activateEmail } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (validEmail(value)) {
          callback()
        } else {
          callback(new Error('Email est incorrect'))
        }
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (/[0][1-9]\d{8}/.test(value)) {
          callback()
        } else {
          callback(new Error('Numéro de téléphone incorrect.'))
        }
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('le mot de passe doit être de 8 caractères au minimum'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      showDialog: false,
      dialogCompte: false,
      email: {
        code: ''
      },
      temp: {
        email: '',
        userName: '',
        passWord: '',
        nom: '',
        prenom: '',
        fonction: '',
        etablissement: '',
        adresse: '',
        telephone: '',
        auProfilDe: '',
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
        code: [
           { required: true, message: 'ce champ est obligatoire', trigger: 'blur' },
            { min: 6, max: 6, message: '4 DIGIT', trigger: 'blur' }
        ] ,
        email: [ { required: true, message: 'Email est obligatoire', trigger: 'blur' }, { validator: validateEmail }],
        telephone: [ { validator: validatePhone }]
      },
      loginForm: {
        username: 'lahmidimoumen1',
        password: 'moka2011'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    launchDialogue() {
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields();
      })
    },
    verifyEmail() {
      this.$refs['dataEmail'].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          activateEmail(this.email,this.id).then((response) => {
            if (response.data.active) {
              this.loading = true
              this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch((err) => {
              this.$notify({
                message: err,
                type: 'error',
                duration: 2000
              })
              this.loading = false
            })
              }
            else {
              this.dialogVisible = true
            }
          })
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.showDialog = false
          createUser(this.temp).then(() => {
            const createdAt = Date.now() 
            this.list.unshift({...this.temp,createdAt })
            this.showDialog = false
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((err) => {
            if( err === 'email not verified') {
              this.dialogVisible = true
            } else if ( err === 'account not activated') {
              this.dialogCompte = true
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: mapGetters(['id'])
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container, .create-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
