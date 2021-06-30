<template>
  <div class="dashboard-editor-container">
    <el-card shadow="never" :body-style="{ padding: '20px',borderRadius: '4px' }">

      <el-skeleton v-if="postForm.createdAt === ''" :rows="5" animated />
      <table v-else class="balance">
				<tr>
					<th><span contenteditable>Référence:</span></th>
					<td><span>{{ postForm.id | getId }} </span></td>
				</tr>
        <tr>
					<th><span contenteditable>Date de constitution:</span></th>
					<td><span>{{ date(postForm.createdAt)}}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Promoteur:</span></th>
					<td><span contenteditable>{{ postForm.createdBy.nom}} {{ postForm.createdBy.prenom}}</span></td>
				</tr>
				<tr>
					<th><span contenteditable>Objectif:</span></th>
					<td><span>{{ postForm.objectif}}</span></td>
				</tr>
        <tr>
					<th><span contenteditable>Titre:</span></th>
					<td><span>{{ postForm.titre}}</span></td>
				</tr>
			</table>
      <!-- card body -->
    </el-card>
    
    <el-collapse :accordion="false" >
      <el-collapse-item>
        <template slot="title">
          <span style="font-size: 20px; padding: 0 17px">Annexe B</span>
        </template>
         <el-form ref="postForm" :model="postForm"  class="form-container">
          <div style="padding: 20px 70px">
            <el-card shadow="never" :body-style="{ padding: '20px' }">
                  <div slot="header">
                    <span>Essai</span>
                  </div>

                <dl class="table-display">
                  <dt>Titre de l'essai</dt>
                  <dd>{{postForm.titre}}</dd>
                  <dt>Objectif</dt>
                  <dd>{{postForm.objectif}}</dd>
                  <dt>Recherche avec bénéfice individuel direct</dt>
                  <dd>{{postForm.rechercheBeneficeIndividuel ? 'Oui' : 'Non'}}</dd>
                  <dt>Phase d'expérimentation clinique</dt>
                  <dd>{{postForm.phaseExperimentationClinique}}</dd>
                </dl>
                <dl class="table-display">
                  <dt>Essai</dt>
                  <dd>
                    <ul>
                      <li v-for="(item, index) in postForm.essai" :key="index">
                        {{item}}
                      </li>
                    </ul>
                  </dd>  
                  <dt>Etude de bioéquivalence</dt>
                  <dd>{{postForm.etudeBioequivalence}}</dd>
                  <dt>Etude Observationnelle</dt>
                  <dd>
                    <ul>
                      <li v-for="(item, index) in Array.isArray(postForm.etudeObservationnelle) ? postForm.etudeObservationnelle : [postForm.etudeObservationnelle]" :key="index">
                        {{item}}
                      </li>
                    </ul>
                  </dd>  
                  <dt>Date prévue pour le début de la recherche</dt>
                  <dd>
                      <el-date-picker :value="displayTime" size="small" :editable="false" type="date" format="yyyy-MM-dd" style="width: 200px;"/>
                  </dd>
                  <dt>Durée prévue</dt>
                  <dd>{{postForm.dureePrevuDebut}}</dd>
                </dl>

               
               
            <p style="clear: left;">- </p>
            <el-divider  content-position="left">MEDICAMENT OU PRODUIT ÉTUDIÉ</el-divider>
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
            <el-table-column label="Dénomination scientifique/D.C.I" width="250px" align="center">
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
            <dl class="table-display">
              <dt>Dénomination spéciale</dt>
              <dd>{{postForm.medicamentReference.denominationSpeciale}}</dd>

              <dt>Dénomination scientifique et DCI du (des) principe(s) actif(s)</dt>
              <dd>{{postForm.medicamentReference.DCI}}</dd>

              <dt>Forme pharmaceutique</dt>
              <dd>{{postForm.medicamentReference.formePharmaceutique}}</dd>
            </dl>

            <dl class="table-display">
              <dt>Composition qualitative et quantitative en principe actifs</dt>
              <dd>{{postForm.medicamentReference.compositionQualitativeQuantitative}}</dd>

              <dt>Posologie</dt>
              <dd>{{postForm.medicamentReference.posologie}}</dd>

              <dt>Fabricant(s)</dt>
              <dd>{{postForm.medicamentReference.fabricant}}</dd>
            </dl>
            <br>
            <br>
            <p style="clear: left;">- </p>
            <el-divider  content-position="left">INVESTIGATEUR(S)</el-divider>
              <el-link v-if="postForm.investigateurFile" type="primary" target="_blank" :href="`/${postForm.investigateurFile}`">Fichier des investigateur</el-link>
              <el-table :data="postForm.investigateur" align="center" style="width: 100%">
                <el-table-column label="Nom(s) et Prénom(s)" width="220px" align="center">
                  <template slot-scope="{row}">
                      <span>{{ row.fullname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="Qualité" width="220px"  align="center">
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
            <dl class="table-display">
                <el-divider content-position="left">PLACEBO</el-divider>
                <dt>Forme pharmaceutique</dt>
                <dd>{{postForm.placebo.formePharmaceutique}}</dd>
                <dt>Fabricant(s) nom(s) ou dénomination(s) et lieu(x) de fabrication</dt>
                <dd>{{postForm.placebo.fabricant}}</dd>
            </dl>    
            <dl class="table-display">
              <el-divider content-position="left">PERSONNES SE PRETANT A LA RECHERCHE</el-divider>
                <dt>Nombre prévu de personnes</dt>
                <dd>{{postForm.personne.prevu}}</dd>
                <dt>Indication thérapeutique</dt>
                <dd>{{postForm.personne.therapeutique}}</dd>
                <dt>Principaux critères d'inclusion</dt>
                <dd>{{postForm.personne.criteres}}</dd>
                <dt>Durée du traitement ou de la participation par personne</dt>
                <dd>{{postForm.personne.duree}}</dd>
            </dl>
            
            <p style="clear: left;">- </p>

            <el-divider content-position="left">COMITE D'ETHIQUE</el-divider>
            <dl class="table-display">     
                <dt>Comité (nom et adresse)</dt>
                <dd>{{postForm.commite.info}}</dd>
                <dt>Avis</dt>
                <dd>{{postForm.commite.avis}}</dd>
                <dt>Date de l'avis</dt>
                <dd>
                  <el-date-picker size="small" :value="displayComiteDate" :editable="false" type="date" format="yyyy-MM-dd" style="width: 200px;"/>
                </dd>
            </dl>
            <br>
            <p style="clear: left;">- </p>

            <el-divider content-position="left">ASSURANCE</el-divider>
            <dl class="table-display">     
                <dt>Entreprise d'assurance (nom ou dénomination)</dt>
                <dd>{{ postForm.assurance ? postForm.assurance.denomination : 'Vide'}}</dd>
                <dt>Numéro du contrat souscrit</dt>
                <dd>{{ postForm.assurance ? postForm.assurance.numero : 'Vide'}}</dd>
            </dl>     
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
        <div v-if="(postForm.evaluatedBy && postForm.evaluatedBy === id) || (postForm.createdBy._id === id) ||  roles.includes('valid') ||  roles.includes('admin')" style="padding: 40px">
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
    date: '',
    avis: undefined
  },
  assurance: {
    denomination: '',
    numero: ''
  },
  status: ''
}


export default {
  name: 'ArticleDetail',
  components: { MDinput, BackToTop, FileUploaderEdit },
  filters: {
    getId(id){
      return id ? 'EC_' +  String(id).padStart(6, '0') : 'EC_000000';
    }
  },
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
      //return new Date(date).toLocaleDateString("fr-FR",  {year: 'numeric', month: 'long', day: 'numeric' })
      if(!date || date === 'undefined') return ''
      return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(date))
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

/* content editable */

table.meta, table.balance { width: 70%;margin: 0 auto; }
th { width: 350px;}
td {font-size: 15px;}
table.balance th { text-align: right; }

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.4em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: rgb(229, 235, 247); border-color: #BBB; margin-right: 8px; }
td { border-color: #DDD; }

// th { background: rgb(229, 235, 247); border-color: #e4e7ed; }
// td { border-color: #e4e7ed; }

dl.table-display {
	float: left;
	width: 650px;
	margin: 1em 1em;
	padding: 0;
	border-bottom: 1px solid #999;
}

.table-display dt {
	clear: left;
	float: left;
	width: 200px;
	margin: 0px;
	padding: 5px;
	border-top: 1px solid #999;
	font-weight: bold;
}

.table-display dd {
	float: left;
	width: 450px;
	margin: 0;
	padding: 5px;
	border-top: 1px solid #999;
}

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

</style>
