<template>
  <div class="dashboard-editor-container">
    <el-collapse :accordion="false" >
      <el-collapse-item>
        <template slot="title">
          <span style="font-size: 20px; padding: 0 17px">Annex B</span>
        </template>
      <!-- <div class="form-container">
                    
          <table>
            <tr>
              <td class="el-form-item__label"><h4>Titre de l'essai</h4></td>
              <td style="font-size: 15px">{{postForm.titre}}</td>
            </tr>
            <tr>
              <td> <h6>Objectif</h6></td>
              <td>{{ postForm.objectif }}</td>
            </tr>  
            <tr>
              <td>Recherche avec bénéfice individuel direct :</td>
              <td>{{ postForm.rechercheBeneficeIndividuel }}</td>
            </tr>
            <tr>
              <td>Phase d'expérimentation clinique :</td>
              <td>{{ postForm.phaseExperimentationClinique }}</td>
            </tr>
            <tr>
              <td>Essai</td>
              <td>{{ postForm.essai }}</td>
            </tr>
            <tr>
              <td>Etude de bioéquivalence</td>
              <td>{{ postForm.etudeBioequivalenc }}</td>
            </tr>
            <tr>
              <td>Date prévue pour le début de la recherche</td>
              <td>{{ postForm.dureePrevuDebut }}</td>
            </tr>
            <tr>
              <td>Durée prévue</td>
            </tr>
            <tr>
              <td>Dénomination spéciale</td>
              <td>{{ postForm.medicamentEtudie.denominationSpeciale }}</td>
            </tr>
            <tr>
              <td>Nom de code</td>
              <td>{{ postForm.medicamentEtudie.nomDeCode }}</td>
            </tr>
            <tr>
              <td>Dénomination scientifique et D.C.I du (des) principe(s) actif(s)</td>
              <td>{{ postForm.medicamentEtudie.DCI }}</td>
            </tr>
            <tr>
              <td>Composition qualitative et quantitative</td>
              <td>{{ postForm.medicamentEtudie.compositionQualitativeQuantitative }}</td>
            </tr>
          </table>

        </div> -->
        <el-form ref="postForm" :model="postForm"  class="form-container">
          <div style="padding: 12px">
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px 60px',marging: '20px' }">
              <el-col :span="24">
                <el-form-item style="margin-bottom: 40px;" prop="titre">
                  <MDinput v-model="postForm.titre" disabled :maxlength="100" required>
                    Titre de l'essai
                  </MDinput>
                </el-form-item>

                <el-form-item label="Objectif" required prop="objectif">
                  <el-input v-model="postForm.objectif" disabled type="textarea" />
                </el-form-item>

                <el-form-item label="Recherche avec bénéfice individuel direct :" required prop="rechercheBeneficeIndividuel" size="small">
                  <el-radio-group  v-model="postForm.rechercheBeneficeIndividuel">
                    <el-radio :label="postForm.rechercheBeneficeIndividuel" border size="mini">{{ postForm.rechercheBeneficeIndividuel ? 'Oui' : 'Non'}}</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="Phase d'expérimentation clinique :" required prop="phaseExperimentationClinique" size="small">
                  <el-radio-group  v-model="postForm.phaseExperimentationClinique">
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
                        <el-select v-model="postForm.essai" disabled placeholder="Select" style="width: 90%;">
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="16" :offset="2">
                    <el-form-item label="autre, à préciser :">
                      <el-input v-model="postForm.essai" disabled :rows="1" style="width: 90%;" type="textarea" class="article-textarea" autosize placeholder="Aa..." />
                    </el-form-item>
                  </el-col>
                </el-card>
                <br>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Etude de bioéquivalence" required>
                      <el-input v-model="postForm.etudeBioequivalence" disabled />
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
                        <el-input-number v-model="postForm.dureePrevuDebut" disabled :min="0" size="medium" />
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
                    <el-input v-model="postForm.medicamentEtudie.denominationSpeciale" disabled/>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="0">
                  <el-form-item label="Nom de code" label-width="180px">
                    <el-input v-model="postForm.medicamentEtudie.nomDeCode" disabled/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="Dénomination scientifique et D.C.I du (des) principe(s) actif(s)" label-width="360px">
                <el-input v-model="postForm.medicamentEtudie.DCI" disabled style="width:56%" />
              </el-form-item>

              <el-form-item label="Composition qualitative et quantitative" label-width="360px">
                <el-input v-model="postForm.medicamentEtudie.compositionQualitativeQuantitative" disabled style="width:56%" />
              </el-form-item>

              <el-form-item label="Posologie" label-width="360px">
                <el-input v-model="postForm.medicamentEtudie.Posologie" disabled style="width:40%" />
              </el-form-item>

              <el-form-item label="Principe actif nouveau : " label-width="360px" required>
                <el-radio-group v-model="postForm.medicamentEtudie.principeActif" disabled label-width="360px" size="mini">
                  <el-radio :label="true"> Oui </el-radio>
                  <el-radio :label="false"> Non </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input v-model="postForm.medicamentEtudie.fabricant" disabled placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

              <el-row :gutter="20">
                <el-col :span="5" :offset="0"><h1 class="el-upload__tip" style="float: right;">D.E ou A.M.M</h1></el-col>
                <el-col :span="18" :offset="0"> <el-divider direction="horizontal" style="width:50%" width="50%" content-position="left" /></el-col>
              </el-row>

              <el-form-item label="Algérie :" required size="small" label-width="360px">
                <el-radio-group v-model="postForm.medicamentEtudie.Algerie" disabled>
                  <el-radio :label="postForm.medicamentEtudie.Algerie" border size="mini" />
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="postForm.medicamentEtudie.Algerie === 'non'" label="Etranger " label-width="360px">
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
                    <el-input v-model="postForm.medicamentReference.denominationSpeciale" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="Dénomination scientifique et DCI du (des) principe(s) actif(s)" label-width="360px">
                <el-input v-model="postForm.medicamentReference.DCI" style="width:60%" disabled />
              </el-form-item>

              <el-form-item label="Forme pharmaceutique" label-width="360px">
                <el-input disabled v-model="postForm.medicamentReference.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
              </el-form-item>

              <el-form-item label="Composition qualitative et quantitative en principe actifs" label-width="360px">
                <el-input disabled v-model="postForm.medicamentReference.compositionQualitativeQuantitative" placeholder="en utilisants les dénominations communes internationales" style="width:60%" />
              </el-form-item>

              <el-form-item label="Posologie  " label-width="360px" required>
                <el-input disabled v-model="postForm.medicamentReference.posologie" style="width:60%" />
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input disabled v-model="postForm.medicamentReference.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

            </el-card>
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">PLACEBO</span>
              </div>

              <el-form-item label="Forme pharmaceutique" label-width="360px">
                <el-input disabled v-model="postForm.placebo.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input disabled v-model="postForm.placebo.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

            </el-card>
            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">PERSONNES SE PRETANT A LA RECHERCHE</span>
              </div>

              <el-form-item label="Nombre prévu de personnes" label-width="360px">
                <el-input-number v-model="postForm.personne.prevu" disabled :min="0" size="medium" placeholder="Aa..." style="width:60%" />
              </el-form-item>

              <el-form-item label="Indication thérapeutique" label-width="360px">
                <el-input disabled v-model="postForm.personne.therapeutique" placeholder="Aa..." style="width:60%" />
              </el-form-item>

              <el-form-item label="Principaux critères d'inclusion" label-width="360px">
                <el-input disabled v-model="postForm.personne.criteres" placeholder="Aa..." style="width:60%" />
              </el-form-item>

              <el-form-item label="Durée du traitement ou de la participation par personne" label-width="360px">
                <el-input-number v-model="postForm.personne.duree" :min="0" disabled size="medium" placeholder="Aa..." style="width:60%" />
              </el-form-item>
            </el-card>

            <br>
            <el-card shadow="hover" class="app-container" :body-style="{ padding: '20px'}">
              <div slot="header">
                <span class="el-upload__tip">COMITE D'ETHIQUE</span>
              </div>

              <el-form-item label="Comité (nom et adresse)" label-width="360px">
                <el-input disabled v-model="postForm.commite.info" placeholder="Aa..." style="width:60%" />
              </el-form-item>
              <el-form-item label="Date de l'avis" label-width="360px">
                <el-date-picker v-model="displayComiteDate" disabled type="date" format="yyyy-MM-dd" style="width:60%" placeholder="Select date and time" />
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
          <span style="font-size: 20px; padding: 0 17px">Mes fichiers</span>
        </template>
        <div style="padding: 40px">
          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Lettre mandat du sponsor à la CRO</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Attestation d'assurance</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Avis favorable du comité d'éthique</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px">Synopsis du protocole en français</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Protocole final et tous les amendements</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Brochure investigateur ou RCP du produit le cas échéant</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >CRF et tout autre documentation qui sera fournie au patient</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Approbations des autorités compétentes dans d'autres pays, le cas échéant </span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Fiche d'information du patient et formulaire de consentement éclairé </span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" > </span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>Modèle de contrat financier des médecins participants</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" >Autorisation de mise sur le marché algérienne ou celle du pays d'origine </span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>

          <el-card shadow="never" :body-style="{ padding: '10px' }">
            <div slot="header">
              <span style="font-size: 18px" > Quittance de paiement / preuve de paiement des frais d'essais cliniques.</span>   
              <p v-if="postForm.lettreMandat.hasRemark" style="font-size: 15px"><span style="color: #E6A23C; margin-right: 8px;font-size: 16px"><b> Remarque</b>
              </span>{{ postForm.lettreMandat.remarque }}</p>
            </div>
            <el-link type="primary" :href="postForm.lettreMandat.value">Voire fichier</el-link>
          </el-card>
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
import MDinput from '@/components/MDinput'
import { fetchArticle } from '@/api/essai'

const defaultForm = {
  // Files
  declarationAssurance: { value:'', hasRemark: false, remarque: ''},
  lettreMandat: { value:'', hasRemark: false, remarque: ''},
  avisFavorableComiteEthique: { value:'', hasRemark: false, remarque: ''},
  synopsisProtocole: { value:'', hasRemark: false, remarque: ''},
  protocoleFinal: { value:'', hasRemark: false, remarque: ''},
  crf: { value:'', hasRemark: false, remarque: ''},
  rcp: { value:'', hasRemark: false, remarque: ''},
  ficheInformationPatient: { value:'', hasRemark: false, remarque: ''},
  modeleFinancier: { value:'', hasRemark: false, remarque: ''},
  autorisation: { value:'', hasRemark: false, remarque: ''},
  paiement: { value:'', hasRemark: false, remarque: ''},
  approbations: { value:'', hasRemark: false, remarque: ''},
  // Annex B
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
      console.log(id)
      this.fetchEssai(id)
  },
  methods: {
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
  text-align: center;
  font-size: 19px;
  font-weight: 100;
  color: #4a4a4a;
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
