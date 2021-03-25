<template>
  <div class="dashboard-editor-container">
    <el-card shadow="never" :body-style="{ padding: '20px',borderRadius: '4px' }">
      <dl>
        <dt><strong>Date de creation</strong></dt>
        <dd>{{ date(postForm.createdAt)}}</dd>
      </dl>
      <dl>
        <dt><strong>Cree par</strong></dt>
        <dd>{{ postForm.createdBy.nom}} {{ postForm.createdBy.prenom}}</dd>
      </dl>
       <dl>
        <dt><strong>Objectif</strong></dt>
        <dd>{{ postForm.objectif}}</dd>
      </dl>
       <dl>
        <dt><strong>Titre</strong></dt>
        <dd>{{ postForm.titre}}</dd>
      </dl>
      <!-- card body -->
    </el-card>
    
    <el-collapse :accordion="false" >
      <el-collapse-item>
        <template slot="title">
          <span style="font-size: 20px; padding: 0 17px">Annex B</span>
        </template>
         <el-form ref="postForm" :model="postForm"  class="form-container">
          <div style="padding: 12px">
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px 60px',marging: '20px' }">
              <el-col :span="24">
                <el-form-item style="margin-bottom: 40px;" prop="titre">
                  <MDinput :value="postForm.titre" disabled :maxlength="100" required>
                    Titre de l'essai
                  </MDinput>
                </el-form-item>

                <el-form-item label="Objectif" required prop="objectif">
                  <el-input :value="postForm.objectif" disabled type="textarea" />
                </el-form-item>

                <el-form-item label="Recherche avec bénéfice individuel direct :" required prop="rechercheBeneficeIndividuel" size="small">
                  <el-radio-group  :value="postForm.rechercheBeneficeIndividuel">
                    <el-radio :label="postForm.rechercheBeneficeIndividuel" border size="mini">{{ postForm.rechercheBeneficeIndividuel ? 'Oui' : 'Non'}}</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="Phase d'expérimentation clinique :" required prop="phaseExperimentationClinique" size="small">
                  <el-radio-group  :value="postForm.phaseExperimentationClinique">
                    <el-radio :label="postForm.phaseExperimentationClinique" border size="mini" />
                  </el-radio-group>
                </el-form-item>

                <el-card shadow="never" :body-style="{ padding: '20px' }">
                  <div slot="header">
                    <span>Essai</span>
                  </div>
                  <el-col :span="16" :offset="2">
                    <template>
                      <el-form-item label="Essai:" required prop="essai" size="small">
                        <el-select :value="postForm.essai" disabled placeholder="Select" style="width: 90%;">
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="16" :offset="2">
                    <el-form-item label="autre, à préciser :">
                      <el-input :value="postForm.essai" disabled :rows="1" style="width: 90%;" type="textarea" class="article-textarea" autosize placeholder="Aa..." />
                    </el-form-item>
                  </el-col>
                </el-card>
                <br>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Etude de bioéquivalence" required>
                      <el-input :value="postForm.etudeBioequivalence" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>

                <div class="postInfo-container">
                  <el-row>
                    <el-col :span="8" :offset="0">
                      <el-form-item label="Date prévue pour le début de la recherche">
                        <el-date-picker :value="displayTime" type="date" format="yyyy-MM-dd" style="width: 90%;" placeholder="Select date and time" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="Durée prévue">
                        <el-input-number :value="postForm.dureePrevuDebut" disabled :min="0" size="medium" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>

              </el-col>
            </el-card>
            <br>
            <el-table :data="postForm.medicamentEtudie" align="center" style="width: 100%">
            <el-table-column label="Dénomination spéciale" width="200px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.denominationSpeciale }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Nom de code" width="110px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.nomDeCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Dénomination scientifique/D.C.I" width="200px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.DCI }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Composition quali / quanti" width="160px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.compositionQualitativeQuantitative }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Posologie" width="110px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.Posologie }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Principe actif " width="110px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.principeActif }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Fabricant(s)" width="110px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.fabricant }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Algérie" width="80px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.Algerie }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Etranger" width="80px" align="center">
              <template slot-scope="{row}">
                  <span>{{ row.Etranger }}</span>
              </template>
            </el-table-column>
          </el-table>  
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">MEDICAMENT OU PRODUIT DE REFERENCE</span>
              </div>

              <el-row :gutter="0">
                <el-col :span="10" :offset="0">
                  <el-form-item label="Dénomination spéciale" label-width="360px">
                    <el-input :value="postForm.medicamentReference.denominationSpeciale" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="Dénomination scientifique et DCI du (des) principe(s) actif(s)" label-width="360px">
                <el-input :value="postForm.medicamentReference.DCI" style="width:60%" disabled />
              </el-form-item>

              <el-form-item label="Forme pharmaceutique" label-width="360px">
                <el-input disabled :value="postForm.medicamentReference.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
              </el-form-item>

              <el-form-item label="Composition qualitative et quantitative en principe actifs" label-width="360px">
                <el-input disabled :value="postForm.medicamentReference.compositionQualitativeQuantitative" placeholder="en utilisants les dénominations communes internationales" style="width:60%" />
              </el-form-item>

              <el-form-item label="Posologie  " label-width="360px" required>
                <el-input disabled :value="postForm.medicamentReference.posologie" style="width:60%" />
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input disabled :value="postForm.medicamentReference.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

            </el-card>
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
              <p class="headon">INVESTIGATEUR(S)</p><br>
              <el-table :data="postForm.investigateur" align="center" style="width: 100%">
                <el-table-column label="Nom(s) et Prénom(s)" width="220px" align="center">
                  <template slot-scope="{row}">
                      <span>{{ row.fullname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Qualité" width="220px" align="center">
                  <template slot-scope="{row}">
                      <span>{{ row.qualite }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Lieu de réalisation" width="220px" align="center">
                  <template slot-scope="{row}">
                      <span>{{ row.lieu }}</span>
                  </template>
                </el-table-column>
              </el-table>  
            </el-card>
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">PLACEBO</span>
              </div>

              <el-form-item label="Forme pharmaceutique" label-width="360px">
                <el-input disabled :value="postForm.placebo.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input disabled :value="postForm.placebo.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

            </el-card>
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">PERSONNES SE PRETANT A LA RECHERCHE</span>
              </div>

              <el-form-item label="Nombre prévu de personnes" label-width="360px">
                <el-input-number :value="postForm.personne.prevu" disabled :min="0" size="medium" placeholder="Aa..." style="width:60%" />
              </el-form-item>

              <el-form-item label="Indication thérapeutique" label-width="360px">
                <el-input disabled :value="postForm.personne.therapeutique" placeholder="Aa..." style="width:60%" />
              </el-form-item>

              <el-form-item label="Principaux critères d'inclusion" label-width="360px">
                <el-input disabled :value="postForm.personne.criteres" placeholder="Aa..." style="width:60%" />
              </el-form-item>

              <el-form-item label="Durée du traitement ou de la participation par personne" label-width="360px">
                <el-input-number :value="postForm.personne.duree" :min="0" disabled size="medium" placeholder="Aa..." style="width:60%" />
              </el-form-item>
            </el-card>

            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">COMITE D'ETHIQUE</span>
              </div>

              <el-form-item label="Comité (nom et adresse)" label-width="360px">
                <el-input disabled :value="postForm.commite.info" placeholder="Aa..." style="width:60%" />
              </el-form-item>
              <el-form-item label="Date de l'avis" label-width="360px">
                <el-date-picker :value="displayComiteDate" disabled type="date" format="yyyy-MM-dd" style="width:60%" placeholder="Select date and time" />
              </el-form-item>
            </el-card>
            <br> 
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <br>
    <el-collapse v-model="activeName" accordion >
      <el-collapse-item title="Fichies" name="name2"> 
        <template slot="title">
          <span class="headon"> Mes fichiers</span>
        </template>
        <div style="padding: 40px">
          <FileUploaderEdit :remrque="postForm.declarationAssurance.remarque" :has-remark="postForm.declarationAssurance.hasRemark" :value="postForm.declarationAssurance.value" commit="declarationAssurance" context-description="Lettre mandat du sponsor à la CRO" />
          <FileUploaderEdit :remrque="postForm.lettreMandat.remarque" :has-remark="postForm.lettreMandat.hasRemark" :value="postForm.lettreMandat.value" commit="lettreMandat" context-description="Attestation d'assurance" />
          <FileUploaderEdit :remrque="postForm.avisFavorableComiteEthique.remarque" :has-remark="postForm.avisFavorableComiteEthique.hasRemark" :value="postForm.avisFavorableComiteEthique.value" commit="avisFavorableComiteEthique" context-description="Avis favorable du comité d'éthique" />
          <FileUploaderEdit :remrque="postForm.synopsisProtocole.remarque" :has-remark="postForm.synopsisProtocole.hasRemark" :value="postForm.synopsisProtocole.value" commit="synopsisProtocole" context-description="Synopsis du protocole en français" />
          <FileUploaderEdit :remrque="postForm.protocoleFinal.remarque" :has-remark="postForm.protocoleFinal.hasRemark" :value="postForm.protocoleFinal.value" commit="protocoleFinal" context-description="Protocole final et tous les amendements" />
          <FileUploaderEdit :remrque="postForm.crf.remarque" :has-remark="postForm.crf.hasRemark" :value="postForm.rcp.value" commit="rcp" context-description="Brochure investigateur ou RCP du produit le cas échéant" />
          <FileUploaderEdit :remrque="postForm.rcp.remarque" :has-remark="postForm.rcp.hasRemark" :value="postForm.crf.value" commit="crf" context-description="CRF et tout autre documentation qui sera fournie au patient" />
          <FileUploaderEdit :remrque="postForm.ficheInformationPatient.remarque" :has-remark="postForm.ficheInformationPatient.hasRemark" :value="postForm.approbations.value" commit="approbations" context-description="Approbations des autorités compétentes dans d'autres pays, le cas échéant" />
          <FileUploaderEdit :remrque="postForm.modeleFinancier.remarque" :has-remark="postForm.modeleFinancier.hasRemark" :value="postForm.ficheInformationPatient.value" commit="ficheInformationPatient" context-description="Fiche d'information du patient et formulaire de consentement éclairé" />
          <FileUploaderEdit :remrque="postForm.autorisation.remarque" :has-remark="postForm.autorisation.hasRemark" :value="postForm.modeleFinancier.value" commit="modeleFinancier" context-description="Modèle de contrat financier des médecins participants" />
          <FileUploaderEdit :remrque="postForm.paiement.remarque" :has-remark="postForm.paiement.hasRemark" :value="postForm.autorisation.value" commit="autorisation" context-description="Autorisation de mise sur le marché algérienne ou celle du pays d'origine" />
          <FileUploaderEdit :remrque="postForm.approbations.remarque" :has-remark="postForm.approbations.hasRemark" :value="postForm.paiement.value" commit="paiement" context-description=" Quittance de paiement / preuve de paiement des frais d'essais cliniques." />
        </div>
        
      </el-collapse-item>
    </el-collapse>
    
    <el-tooltip placement="top" content="Retour vers le haut de la page">
      <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import FileUploaderEdit from '@/components/Mine/FileUploaderEdit'
import MDinput from '@/components/MDinput'
import { fetchArticle } from '@/api/essai'

const defaultForm = {
  titre: '',
  objectif: '',
  rechercheBeneficeIndividuel: true,
  phaseExperimentationClinique: '',
  essai: '',
  etudeBioequivalence: '',
  datePrevuDebut: '',
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
  medicamentEtudie: [],
  investigateur: [],
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
  createdAt: '',
  createdBy: '',
  commite: {
    info: '',
    date: ''
  },
  status: ''
}


export default {
  name: 'ArticleDetail',
  components: { MDinput, BackToTop, FileUploaderEdit },
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
      activeName: ['name2'],
      postForm: Object.assign({}, defaultForm)
    }
  },
  created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchEssai(id)
  },
  methods: {
    date(date) {
      return new Date(date).toUTCString()
    },
    fetchEssai(id) {
      fetchArticle(id).then(response => {
          this.postForm = Object.assign({}, response.data.essai)
      })
    },
    submitForm() { 
      const data = { ...this.postForm, ...this.$store.state.files }
      console.log(data)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('essais/createEssai', data).then(() => {
            this.$notify({
              title: 'published',
              message: 'success',
              type: 'success',
              duration: 2000
            })
            this.loading = false
          }).catch((err) => {
            console.log(err)
            this.$notify({
              title: 'Error',
              message: err,
              type: 'error',
              duration: 2000
            })
            this.loading = false
            console.log(err)
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    displayTime: {
      get() {
        return (+new Date(this.postForm.datePrevuDebut))
      },
      set(val) {
        this.postForm.datePrevuDebut = new Date(val)
      }
    },
    displayComiteDate: {
      get() {
        return (+new Date(this.postForm.commite.date))
      },
      set(val) {
        this.postForm.commite.date = new Date(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload__tip {
  color: #a3a5a9;
  margin-top: 2px;
}

.el-card {
  margin-bottom: 18px;
}
.el-card__body {
    padding: 20px 10px;
}

.el-collapse-item__header {
  padding: 0 30px i !important;
  font-size: 22px !important;
}

.headon {
  font-size: 20px;
  padding: 0 17px;
  /* font-family: 'Raleway'; */
}

.dashboard-editor-container {
  background-color: #fcfcfc;
  min-height: 100vh;
  padding: 50px 60px 0px;
  padding-bottom: 80px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
