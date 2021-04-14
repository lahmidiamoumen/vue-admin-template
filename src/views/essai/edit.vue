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
          <div style="padding: 20px 70px">
            <el-card shadow="never" :body-style="{ padding: '20px' }">
                  <div slot="header">
                    <span>Essai</span>
                  </div>
                <el-form-item style="margin-bottom: 40px;" prop="titre">
                  <MDinput :value="postForm.titre" disabled :maxlength="100" style="width: 90%;" >
                    Titre de l'essai
                  </MDinput>
                </el-form-item>

                <el-form-item label="Objectif"  prop="objectif" label-width="360px">
                  <el-input :value="postForm.objectif" disabled type="textarea" style="width: 90%;color: #333" />
                </el-form-item>

                <el-form-item label="Recherche avec bénéfice individuel direct :"  prop="rechercheBeneficeIndividuel" label-width="360px" size="small">
                  <el-radio-group  :value="postForm.rechercheBeneficeIndividuel">
                    <el-radio :label="postForm.rechercheBeneficeIndividuel" border size="mini">{{ postForm.rechercheBeneficeIndividuel ? 'Oui' : 'Non'}}</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="Phase d'expérimentation clinique :" label-width="360px"  prop="phaseExperimentationClinique" size="small">
                  <el-radio-group  :value="postForm.phaseExperimentationClinique">
                    <el-radio :label="postForm.phaseExperimentationClinique" border size="mini" />
                  </el-radio-group>
                </el-form-item>

                  <el-form-item label="Essai:"  label-width="360px" >
                    <el-input :value="postForm.essai" disabled placeholder="Select" style="width: 90%;"/>
                  </el-form-item>
                
                  <el-form-item label="Etude de bioéquivalence" label-width="360px" >
                    <el-input :value="postForm.etudeBioequivalence" disabled style="width: 90%;"/>
                  </el-form-item>
                  <el-form-item label="Etude Observationnelle:" label-width="360px" >
                    <el-input :value="postForm.etudeObservationnelle" disabled style="width: 90%;"/>
                  </el-form-item>
                  <el-row>
                    <el-col :span="8" :offset="4">
                      <el-form-item label="Date prévue pour le début de la recherche" >
                        <el-date-picker :value="displayTime" disabled type="date" format="yyyy-MM-dd" style="width: 90%;" placeholder="Select date and time" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="Durée prévue">
                        <el-input-number :value="postForm.dureePrevuDebut" disabled :min="0" size="medium" />
                      </el-form-item>
                    </el-col>
                  </el-row>

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
            <el-divider content-position="left">MEDICAMENT OU PRODUIT DE REFERENCE</el-divider>
            <br>
              <el-form-item label="Dénomination spéciale" label-width="360px">
                <el-input :value="postForm.medicamentReference.denominationSpeciale" disabled />
              </el-form-item>

              <el-form-item label="Dénomination scientifique et DCI du (des) principe(s) actif(s)" label-width="360px">
                <el-input :value="postForm.medicamentReference.DCI" style="width:60%" disabled />
              </el-form-item>

              <el-form-item label="Forme pharmaceutique" label-width="360px">
                <el-input disabled :value="postForm.medicamentReference.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
              </el-form-item>

              <el-form-item label="Composition qualitative et quantitative en principe actifs" label-width="360px">
                <el-input disabled :value="postForm.medicamentReference.compositionQualitativeQuantitative" placeholder="en utilisants les dénominations communes internationales" style="width:60%" />
              </el-form-item>

              <el-form-item label="Posologie  " label-width="360px" >
                <el-input disabled :value="postForm.medicamentReference.posologie" style="width:60%" />
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input disabled :value="postForm.medicamentReference.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

            <br>
            <el-divider content-position="left">INVESTIGATEUR(S)</el-divider>
            <br>
              <el-link v-if="postForm.investigateurFile" type="primary" :href="`http://localhost:8080/${postForm.investigateurFile}`">Fichier des investigateur</el-link>
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
            <br>
            <el-divider content-position="left">PLACEBO</el-divider>
              <el-form-item label="Forme pharmaceutique" label-width="360px">
                <el-input disabled :value="postForm.placebo.formePharmaceutique" placeholder="pharmacopée" style="width:60%" />
              </el-form-item>

              <el-form-item label="Fabricant(s)" label-width="360px">
                <el-input disabled :value="postForm.placebo.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" style="width:60%" />
              </el-form-item>

            <br>
            <el-divider content-position="left">PERSONNES SE PRETANT A LA RECHERCHE</el-divider>
            <br>

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
            <el-divider content-position="left">COMITE D'ETHIQUE</el-divider>
            <br>
              <el-form-item label="Comité (nom et adresse)" label-width="360px">
                <el-input disabled :value="postForm.commite.info" placeholder="Aa..." style="width:60%" />
              </el-form-item>
              <el-form-item label="Date de l'avis" label-width="360px">
                <el-date-picker :value="displayComiteDate" disabled type="date" format="yyyy-MM-dd" style="width:60%" placeholder="Select date and time" />
              </el-form-item>
            <br> 
          </el-card>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <br>
    <el-collapse  accordion >
      <el-collapse-item title="Fichies" > 
        <template slot="title">
          <span class="headon"> Mes fichiers</span>
        </template>
        <div v-if="(postForm.evaluatedBy && postForm.evaluatedBy === id) || (postForm.createdBy._id === id) ||  roles.includes('valid')" style="padding: 40px">
          <FileUploaderEdit :doc.sync="postForm.declarationAssurance" commit="declarationAssurance" context-description="Lettre mandat du sponsor à la CRO" />
          <FileUploaderEdit :doc.sync="postForm.lettreMandat" commit="lettreMandat" context-description="Attestation d'assurance" />
          <FileUploaderEdit :doc.sync="postForm.avisFavorableComiteEthique" commit="avisFavorableComiteEthique" context-description="Avis favorable du comité d'éthique" />
          <FileUploaderEdit :doc.sync="postForm.synopsisProtocole" commit="synopsisProtocole" context-description="Synopsis du protocole en français" />
          <FileUploaderEdit :doc.sync="postForm.protocoleFinal" commit="protocoleFinal" context-description="Protocole final et tous les amendements" />
          <FileUploaderEdit :doc.sync="postForm.crf" commit="rcp" context-description="Brochure investigateur ou RCP du produit le cas échéant" />
          <FileUploaderEdit :doc.sync="postForm.rcp" commit="crf" context-description="CRF et tout autre documentation qui sera fournie au patient" />
          <FileUploaderEdit :doc.sync="postForm.ficheInformationPatient" commit="approbations" context-description="Approbations des autorités compétentes dans d'autres pays, le cas échéant" />
          <FileUploaderEdit :doc.sync="postForm.modeleFinancier" commit="ficheInformationPatient" context-description="Fiche d'information du patient et formulaire de consentement éclairé" />
          <FileUploaderEdit :doc.sync="postForm.autorisation" commit="modeleFinancier" context-description="Modèle de contrat financier des médecins participants" />
          <FileUploaderEdit :doc.sync="postForm.paiement" commit="autorisation" context-description="Autorisation de mise sur le marché algérienne ou celle du pays d'origine" />
          <FileUploaderEdit :doc.sync="postForm.approbations" commit="paiement" context-description=" Quittance de paiement / preuve de paiement des frais d'essais cliniques." />
        </div>
        <div v-else style="text-align: center">
          Vous n'avez pas le droit de consulter les documents de cet esaai
        </div>
        
      </el-collapse-item>
    </el-collapse>

    <br>
    <el-card v-if="(postForm.evaluatedBy && postForm.evaluatedBy === id && postForm.status !== 'evalue') ||  roles.includes('valid') && postForm.status !== 'valide'" shadow="hover" :body-style="{ padding: '20px' }">
      <div style="float: right; padding: 20px">
        <el-button :disabled="roles.includes('valid') && postForm.status !== 'evalue'" type="success" style=" width: 200px" size="big" @click="aproved()">
          Approuvé
        </el-button>
      </div>
    </el-card>
    
    
    <el-tooltip placement="top" content="Retour vers le haut de la page">
      <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import FileUploaderEdit from '@/components/Mine/FileUploaderEdit'
import MDinput from '@/components/MDinput'
import { fetchArticle, aprroveEval, aprroveValid } from '@/api/essai'
import { mapGetters } from 'vuex'

const defaultForm = {
  titre: '',
  objectif: '',
  rechercheBeneficeIndividuel: true,
  phaseExperimentationClinique: '',
  essai: '',
  etudeBioequivalence: '',
  etudeObservationnelle: '',
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
  investigateurFile: '',
  personne: {
    prevu: 0,
    therapeutique: '',
    criteres: '',
    duree: 0
  },
  createdAt: '',
  createdBy: '',
  evaluatedBy: undefined,
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
    return {
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
    aproved() {
      if( this.roles.includes('valid') ) {
          aprroveValid(this.$route.params && this.$route.params.id).then((response) => {
            if( response.data.essai > 0) {
              this.$notify({
                title: 'Succès',
                message: "l'essai clinique validité",
                type: 'success',
                duration: 2000
              })
            }
            else {
              this.$notify({
                title: 'Erreur',
                message: "l'essai clinique non évalué",
                type: 'error',
                duration: 2000
              })
            } 
          })
      }
      else if(this.postForm.declarationAssurance.status === 'aprouve' &&
          this.postForm.lettreMandat.status === 'aprouve' &&
          this.postForm.avisFavorableComiteEthique.status === 'aprouve' &&
          this.postForm.synopsisProtocole.status === 'aprouve' &&
          this.postForm.protocoleFinal.status === 'aprouve' &&
          this.postForm.crf.status === 'aprouve' &&
          this.postForm.rcp.status === 'aprouve' &&
          this.postForm.ficheInformationPatient.status === 'aprouve' &&
          this.postForm.modeleFinancier.status === 'aprouve' &&
          this.postForm.autorisation.status === 'aprouve' &&
          this.postForm.paiement.status === 'aprouve' &&
          this.postForm.approbations.status === 'aprouve') {
              aprroveEval(this.$route.params && this.$route.params.id).then((response) => {
                if( response.data.essai > 0) {
                  this.$notify({
                    title: 'Succès',
                    message: "l'essai clinique évalué",
                    type: 'success',
                    duration: 2000
                  })
                } 
              })
        } else {
          this.$notify({
            title: 'Erreur',
            message: "Approuvés tous les fichiers d'abord",
            type: 'error',
            duration: 2000
          })
        }
    }
  },
  computed: {
    ...mapGetters(['id', 'roles']),
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

.el-input.is-disabled .el-input__inner{
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #333 !important;
  cursor: initial;
}


.dashboard-editor-container {
  background-color: #fcfcfc;
  min-height: 100vh;
  padding: 50px 60px 0px;
  padding-bottom: 80px;
  
    .el-textarea.is-disabled .el-textarea__inner{
      color: #333
    }
    .el-input.is-disabled .el-input__inner {
      color: #333;
    }
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
dl {
  display: flex;
  flex-flow: row wrap;
}
dt {
  flex-basis: 20%;
  padding: 8px;
  font-size: 14px;
  color: #333;
  background: #f9f9f9;
  text-align: right;
}
dd {
  flex-basis: 70%;
  flex-grow: 1;
  margin: 0;
  padding: 8px;
  border-bottom: 0.1px solid #f1f1f1;
}
</style>
