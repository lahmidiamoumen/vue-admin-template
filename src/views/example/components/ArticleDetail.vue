<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-card shadow="never" class="app-container" :body-style="{ padding: '5px', textAlign: 'center'}">
          <b> ANNEXE B </b>
          Declaration D'intention   de realisation d'essai d'un produit pharmaceutique.
        </el-card>
        <el-steps class="app-container" :active="2" finish-status="success" align-center>
          <el-step title="Etape 1" description="les fichiers à fournir" />
          <el-step title="Etape 2" description="Formulaire d'annex - B" />
          <el-step title="Etape 3" description="Soumission du dossier" />
        </el-steps>
        <br>

        <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px 60px',marging: '20px' }">
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="titre">
              <MDinput v-model="postForm.titre" :maxlength="100" required>
                Titre de l'essai
              </MDinput>
            </el-form-item>

            <el-form-item label="Objectif" required prop="objectif">
              <el-input v-model="postForm.objectif" type="textarea" />
            </el-form-item>

            <el-form-item label="Recherche avec bénéfice individuel direct :" required prop="rechercheBeneficeIndividuel" size="small">
              <el-radio-group v-model="postForm.rechercheBeneficeIndividuel">
                <el-radio :label="true" border size="mini">Oui</el-radio>
                <el-radio :label="false" border size="mini">Non</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Phase d'expérimentation clinique :" required prop="phaseExperimentationClinique" size="small">
              <el-radio-group v-model="postForm.phaseExperimentationClinique">
                <el-radio label="Phase I" border size="mini" />
                <el-radio label="Phase IIa" border size="mini" />
                <el-radio label="Phase IIb" border size="mini" />
                <el-radio label="Phase III" border size="mini" />
                <el-radio label="Phase IV" border size="mini" />
              </el-radio-group>
            </el-form-item>

            <el-card shadow="never" :body-style="{ padding: '20px' }">
              <div slot="header">
                <span>Essai</span>
              </div>
              <el-col :span="16" :offset="2">
                <template>
                  <el-form-item label="Essai:" required prop="essai" size="small">
                    <el-select v-model="postForm.essai" filterable placeholder="Select" style="width: 90%;">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-col>
              <el-col :span="16" :offset="2">
                <el-form-item label="autre, à préciser :">
                  <el-input v-model="postForm.essai" :rows="1" style="width: 90%;" type="textarea" class="article-textarea" autosize placeholder="Aa..." />
                </el-form-item>
              </el-col>
            </el-card>
            <br>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Etude de bioéquivalence" required>
                  <el-input v-model="postForm.etudeBioequivalence" />
                </el-form-item>
              </el-col>
            </el-row>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8" :offset="0">
                  <el-form-item label="Date prévue pour le début de la recherche">
                    <el-date-picker v-model="displayTime" type="date" format="yyyy-MM-dd" style="width: 90%;" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="Durée prévue">
                    <el-input-number v-model="postForm.dureePrevuDebut" :min="0" size="medium" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-col>
        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
          <div slot="header">
            <span class="el-upload__tip">MEDICAMENT OU PRODUIT ETUDIE</span>
          </div>

          <el-row :gutter="0">
            <el-col :span="10" :offset="0">
              <el-form-item label="Dénomination spéciale" label-width="360px">
                <el-input v-model="postForm.medicamentEtudie.denominationSpeciale" />
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="0">
              <el-form-item label="Nom de code" label-width="180px">
                <el-input v-model="postForm.medicamentEtudie.nomDeCode" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Dénomination scientifique et D.C.I du (des) principe(s) actif(s)" label-width="360px">
            <el-input v-model="postForm.medicamentEtudie.DCI" style="width:56%" />
          </el-form-item>

          <el-form-item label="Composition qualitative et quantitative" label-width="360px">
            <el-input v-model="postForm.medicamentEtudie.compositionQualitativeQuantitative" style="width:56%" />
          </el-form-item>

          <el-form-item label="Posologie" label-width="360px">
            <el-input v-model="postForm.medicamentEtudie.Posologie" style="width:40%" />
          </el-form-item>

          <el-form-item label="Principe actif nouveau : " label-width="360px" required>
            <el-radio-group v-model="postForm.medicamentEtudie.principeActif" label-width="360px" size="mini">
              <el-radio :label="true"> Oui </el-radio>
              <el-radio :label="false"> Non </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Fabricant(s)" label-width="360px">
            <el-input v-model="postForm.medicamentEtudie.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="5" :offset="0"><h1 class="el-upload__tip" style="float: right;">D.E ou A.M.M</h1></el-col>
            <el-col :span="18" :offset="0"> <el-divider direction="horizontal" style="width:50%" width="50%" content-position="left" /></el-col>
          </el-row>

          <el-form-item label="Algérie :" required size="small" label-width="360px">
            <el-radio-group v-model="postForm.medicamentEtudie.Algerie">
              <el-radio label="oui" border size="mini" />
              <el-radio label="non" border size="mini" />
              <el-radio label="refus" border size="mini" />
              <el-radio label="suspension" border size="mini" />
              <el-radio label="retrait" border size="mini" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Etranger " label-width="360px">
            <el-input v-model="postForm.medicamentEtudie.Etranger" :disabled="postForm.medicamentEtudie.Algerie !== 'non'" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
          </el-form-item>

        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
          <div slot="header">
            <span class="el-upload__tip">MEDICAMENT OU PRODUIT DE REFERENCE</span>
          </div>

          <el-row :gutter="0">
            <el-col :span="10" :offset="0">
              <el-form-item label="Dénomination spéciale" label-width="360px">
                <el-input v-model="postForm.medicamentReference.denominationSpeciale" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Dénomination scientifique et DCI du (des) principe(s) actif(s)" label-width="360px">
            <el-input v-model="postForm.medicamentReference.DCI" style="width:60%" />
          </el-form-item>

          <el-form-item label="Forme pharmaceutique" label-width="360px">
            <el-input v-model="postForm.medicamentReference.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
          </el-form-item>

          <el-form-item label="Composition qualitative et quantitative en principe actifs" label-width="360px">
            <el-input v-model="postForm.medicamentReference.compositionQualitativeQuantitative" placeholder="en utilisants les dénominations communes internationales" style="width:60%" />
          </el-form-item>

          <el-form-item label="Posologie  " label-width="360px" required>
            <el-input v-model="postForm.medicamentReference.posologie" style="width:60%" />
          </el-form-item>

          <el-form-item label="Fabricant(s)" label-width="360px">
            <el-input v-model="postForm.medicamentReference.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
          </el-form-item>

        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
          <div slot="header">
            <span class="el-upload__tip">PLACEBO</span>
          </div>

          <el-form-item label="Forme pharmaceutique" label-width="360px">
            <el-input v-model="postForm.placebo.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
          </el-form-item>

          <el-form-item label="Fabricant(s)" label-width="360px">
            <el-input v-model="postForm.placebo.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
          </el-form-item>

        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
          <div slot="header">
            <span class="el-upload__tip">PERSONNES SE PRETANT A LA RECHERCHE</span>
          </div>

          <el-form-item label="Nombre prévu de personnes" label-width="360px">
            <el-input-number v-model="postForm.personne.prevu" :min="0" size="medium" placeholder="Aa..." style="width:60%" />
          </el-form-item>

          <el-form-item label="Indication thérapeutique" label-width="360px">
            <el-input v-model="postForm.personne.therapeutique" placeholder="Aa..." style="width:60%" />
          </el-form-item>

          <el-form-item label="Principaux critères d'inclusion" label-width="360px">
            <el-input v-model="postForm.personne.criteres" placeholder="Aa..." style="width:60%" />
          </el-form-item>

          <el-form-item label="Durée du traitement ou de la participation par personne" label-width="360px">
            <el-input-number v-model="postForm.personne.duree" :min="0" size="medium" placeholder="Aa..." style="width:60%" />
          </el-form-item>
        </el-card>

        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
          <div slot="header">
            <span class="el-upload__tip">COMITE D'ETHIQUE</span>
          </div>

          <el-form-item label="Comité (nom et adresse)" label-width="360px">
            <el-input v-model="postForm.commite.info" placeholder="Aa..." style="width:60%" />
          </el-form-item>
          <el-form-item label="Date de l'avis" label-width="360px">
            <el-date-picker v-model="displayComiteDate" type="date" format="yyyy-MM-dd" style="width:60%" placeholder="Select date and time" />
          </el-form-item>
        </el-card>
        <br>
        <el-card shadow="never" class="app-container" :body-style="{ padding: '5px'}">
          <el-form-item style="float: right;margin: 40px">
            <router-link :to="'/guide/index'" class="link-type" style="margin:8px"><el-button> Etape précédente </el-button> </router-link>
            <el-button type="primary" @click="submitForm()">Etape suivante</el-button>
          </el-form-item>
        </el-card>

      </div>

    </el-form>
    <el-tooltip placement="top" content="Retour vers le haut de la page">
      <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import MDinput from '@/components/MDinput'

const defaultForm = {
  titre: '',
  objectif: '',
  rechercheBeneficeIndividuel: true,
  phaseExperimentationClinique: '',
  essai: '',
  etudeBioequivalence: '',
  datePrevuDebut: Date.now(),
  dureePrevuDebut: 0,
  medicament: {
    Denomination: '',
    Code: '',
    DCI: '',
    Composition: '',
    Posologie: '',
    Principe: '',
    Fabrication: '',
    Algerie: '',
    Etranger: ''
  },
  medicamentEtudie: {
    denominationSpeciale: '',
    nomDeCode: '',
    DCI: '',
    compositionQualitativeQuantitative: '',
    posologie: '',
    principeActif: false,
    fabricant: '',
    Algerie: '',
    Etranger: ''
  },
  medicamentReference: {
    denominationSpeciale: '',
    DCI: '',
    formePharmaceutique: '',
    compositionQualitativeQuantitative: '',
    posologie: '',
    fabricant: ''
  },
  placebo: {
    formePharmaceutique: '',
    fabricant: ''
  },
  personne: {
    prevu: 0,
    therapeutique: '',
    criteres: '',
    duree: 0
  },
  commite: {
    info: '',
    date: Date.now()
  },
  status: ''
}

export default {
  name: 'ArticleDetail',
  components: { MDinput, BackToTop },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + ' est champ obligatoire',
          type: 'error'
        })
        callback(new Error(rule.field + ' est champ obligatoire'))
      } else {
        callback()
      }
    }
    return {
      options: [{
        value: 'Contrôlé',
        label: 'Contrôlé'
      }, {
        value: 'Multicentrique',
        label: 'Multicentrique'
      }, {
        value: 'international',
        label: 'international'
      }, {
        value: 'randomisé',
        label: 'randomisé'
      }, {
        value: 'simple insu',
        label: 'simple insu'
      }, {
        value: 'double insu',
        label: 'double insu'
      }, {
        value: 'croisé',
        label: 'croisé'
      }, {
        value: 'groupes parallèles',
        label: 'groupes parallèles'
      }, {
        value: 'ouvert',
        label: 'ouvert'
      }
      ],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        titre: [{ validator: validateRequire }],
        objectif: [{ validator: validateRequire }],
        rechercheBeneficeIndividuel: [{ validator: validateRequire }],
        phaseExperimentationClinique: [{ validator: validateRequire }],
        essai: [{ validator: validateRequire, trigger: 'blur' }],
        etudeBioequivalence: [{ validator: validateRequire }],
        datePrevuDebut: Date.now(),
        dureePrevue: 0,
        medicamentDenomination: [{ validator: validateRequire }],
        medicamentCode: [{ validator: validateRequire }],
        medicamentDCI: [{ validator: validateRequire }],
        medicamentComposition: [{ validator: validateRequire }],
        medicamentPosologie: [{ validator: validateRequire }],
        medicamentPrincipe: [{ validator: validateRequire }],
        medicamentFabrication: [{ validator: validateRequire }],
        medicamentAlgerie: [{ validator: validateRequire }],
        medicamentEtranger: [{ validator: validateRequire }],
        produitDenomination: [{ validator: validateRequire }],
        produitDCI: [{ validator: validateRequire }],
        produitPharmaceutique: [{ validator: validateRequire }],
        produitComposition: [{ validator: validateRequire }],
        produitPosologie: [{ validator: validateRequire }],
        produitFabrication: [{ validator: validateRequire }],
        placeboPharmaceutique: [{ validator: validateRequire }],
        placeboFabricant: [{ validator: validateRequire }],
        personPrevu: 0,
        personTherapeutique: [{ validator: validateRequire }],
        personCriteres: [{ validator: validateRequire }],
        personDuree: 0,
        comiteInfo: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.datePrevuDebut))
      },
      set(val) {
        this.postForm.datePrevuDebut = new Date(val)
      }
    },
    displayComiteDate: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.commite.date))
      },
      set(val) {
        this.postForm.commite.date = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {

    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
