<template>
  <div class="dashboard-editor-container">
    <aside>
      <b> ANNEXE B </b>
      Declaration D'intention   de realisation d'essai d'un produit pharmaceutique.
    </aside>
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="330px">
      <div class="createPost-main-container">
        <el-steps class="app-container" :active="2" finish-status="success" align-center>
          <el-step title="Etape 1" description="les fichiers à fournir" />
          <el-step title="Etape 2" description="Formulaire d'annexe - B" />
          <el-step title="Etape 3" description="Soumission du dossier" />
        </el-steps>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="titre">
              <MDinput v-model="postForm.titre" :maxlength="100" required>
                Titre de l'essai
              </MDinput>
            </el-form-item>

            <el-form-item label="Objectif" required prop="objectif">
              <el-input v-model.lazy="postForm.objectif" type="textarea" />
            </el-form-item>

            <el-form-item label="Recherche avec bénéfice individuel direct :" required prop="rechercheBeneficeIndividuel" size="small">
              <el-radio-group v-model.lazy="postForm.rechercheBeneficeIndividuel">
                <el-radio :label="true" border size="mini">Oui</el-radio>
                <el-radio :label="false" border size="mini">Non</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Phase d'expérimentation clinique :" required prop="phaseExperimentationClinique" size="small">
              <el-radio-group v-model.lazy="postForm.phaseExperimentationClinique">
                <el-radio label="Phase I" border size="mini" />
                <el-radio label="Phase IIa" border size="mini" />
                <el-radio label="Phase IIb" border size="mini" />
                <el-radio label="Phase III" border size="mini" />
                <el-radio label="Phase IV" border size="mini" />
              </el-radio-group>
            </el-form-item>

            <el-row :gutter="0">
              <br>
                <template>
                <el-form-item label="Essai:" >
                  <el-col :span="22" :offset="0">
                    <el-drag-select multiple v-model.lazy="postForm.essai" filterable placeholder="Select ou préciser un autre..." style="width: 700px;">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-drag-select>
                    </el-col>
                    <!-- <el-col :span="1" :offset="1" class="line">ou</el-col>
                    <el-col :span="11" :offset="0">
                        <el-input v-model.lazy="postForm.essai" :rows="1" placeholder="autre, à préciser :" type="textarea" class="article-textarea" autosize />
                    </el-col> -->
                </el-form-item>
                </template>
            </el-row>
             <el-row :gutter="0">
              <br>
                <template>
                <el-form-item label="Etude Observationnelle:"  >
                  <el-col :span="22" :offset="0">
                    <el-drag-select v-model.lazy="postForm.etudeObservationnelle" filterable multiple placeholder="Select ou préciser un autre.." style="width: 700px;">
                      <el-option
                        v-for="item in optionEtude"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-drag-select>
                    <!-- <el-select v-model.lazy="postForm.etudeObservationnelle" filterable placeholder="Select" style="width: 100%;">
                      <el-option
                        v-for="item in optionEtude"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> -->
                    </el-col>
                    <!-- <el-col :span="1" :offset="1" class="line">ou</el-col>
                    <el-col :span="11" :offset="0">
                        <el-input v-model.lazy="postForm.etudeObservationnelle" :rows="1" placeholder="autre, à préciser :" type="textarea" class="article-textarea" autosize />
                    </el-col> -->
                </el-form-item>
                </template>
            </el-row>
            <br>
            <el-form-item label="Etude de bioéquivalence">
              <el-input v-model.lazy="postForm.etudeBioequivalence" />
            </el-form-item>
            <div class="postInfo-container">
              <el-row :gutter="0">
                <el-col :span="12" :offset="0">
                  <el-form-item label="Date prévue pour le début de la recherche" prop="datePrevuDebut" required>
                    <el-date-picker v-model.lazy="displayTime" type="date" format="yyyy-MM-dd" style="width: 250px;" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="Durée prévue" prop="dureePrevuDebut" required label-width="200px">
                    <el-input-number v-model.lazy="postForm.dureePrevuDebut" style="width: 170px;" :min="0" size="medium" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-col>
        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', width: '100%'}">
          <p class="headon">MEDICAMENT OU PRODUIT ETUDIE</p><br>
          <div class="filter-container">
            <el-button class="filter-item" style="float: right; margin-right: 60px" type="primary" icon="el-icon-edit" @click="handleCreate">
              Ajouter
            </el-button>
          </div>
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
          
         <!--  <el-form-item label="Dénomination spéciale">
            <el-input v-model.lazy="postForm.medicamentEtudie.denominationSpeciale" />
          </el-form-item>
          <el-form-item label="Nom de code">
            <el-input v-model.lazy="postForm.medicamentEtudie.nomDeCode" />
          </el-form-item>
          <el-form-item label="Dénomination scientifique et D.C.I du (des) principe(s) actif(s)" >
            <el-input v-model.lazy="postForm.medicamentEtudie.DCI" />
          </el-form-item>

          <el-form-item label="Composition qualitative et quantitative" >
            <el-input v-model.lazy="postForm.medicamentEtudie.compositionQualitativeQuantitative" />
          </el-form-item>

          <el-form-item label="Posologie" >
            <el-input v-model.lazy="postForm.medicamentEtudie.Posologie" />
          </el-form-item>

          <el-form-item label="Principe actif nouveau : "  required>
            <el-radio-group v-model.lazy="postForm.medicamentEtudie.principeActif"  size="mini">
              <el-radio :label="true"> Oui </el-radio>
              <el-radio :label="false"> Non </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Fabricant(s)" >
            <el-input v-model.lazy="postForm.medicamentEtudie.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" />
          </el-form-item>
          <br>
          <el-divider content-position="center">D.E ou A.M.M</el-divider>

          <el-form-item label="Algérie :" required size="small" >
            <el-radio-group v-model.lazy="postForm.medicamentEtudie.Algerie">
              <el-radio label="oui" border size="mini" />
              <el-radio label="non" border size="mini" />
              <el-radio label="refus" border size="mini" />
              <el-radio label="suspension" border size="mini" />
              <el-radio label="retrait" border size="mini" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Etranger " >
            <el-input v-model.lazy="postForm.medicamentEtudie.Etranger" :disabled="postForm.medicamentEtudie.Algerie !== 'non'" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" />
          </el-form-item> -->

        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
         <p class="headon">MEDICAMENT OU PRODUIT DE REFERENCE</p>
        <br>
          <el-form-item label="Dénomination spéciale" prop="produitDenomination" >
            <el-input v-model.lazy="postForm.medicamentReference.denominationSpeciale" />
          </el-form-item>
          <el-form-item label="Dénomination scientifique et DCI du (des) principe(s) actif(s)"  prop="produitDCI">
            <el-input v-model.lazy="postForm.medicamentReference.DCI" />
          </el-form-item>

          <el-form-item label="Forme pharmaceutique" prop="produitPharmaceutique">
            <el-input v-model.lazy="postForm.medicamentReference.formePharmaceutique" placeholder="pharmacopée" />
          </el-form-item>

          <el-form-item label="Composition qualitative et quantitative en principe actifs" prop="produitComposition">
            <el-input v-model.lazy="postForm.medicamentReference.compositionQualitativeQuantitative" placeholder="en utilisants les dénominations communes internationales" />
          </el-form-item>

          <el-form-item label="Posologie  " prop="produitPosologie" >
            <el-input v-model.lazy="postForm.medicamentReference.posologie" />
          </el-form-item>

          <el-form-item label="Fabricant(s)" prop="produitFabricant" >
            <el-input v-model.lazy="postForm.medicamentReference.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" />
          </el-form-item>

        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
          <p class="headon">PLACEBO</p> <br>
          <el-form-item label="Forme pharmaceutique" prop="placeboPharmaceutique">
            <el-input v-model.lazy="postForm.placebo.formePharmaceutique" placeholder="pharmacopée" />
          </el-form-item>
          <el-form-item label="Fabricant(s)" prop="placeboFabricant">
            <el-input v-model.lazy="postForm.placebo.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" />
          </el-form-item>

        </el-card>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
          <p class="headon">INVESTIGATEUR(S)</p><br>
          <div class="filter-container">
            
            <el-upload
              class="upload-demo"
              style="float: right; margin: 0px 8px"
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
                <el-button size="small" type="primary">télécharger un fichier</el-button>
              <div slot="tip" class="el-upload__tip"> pdf fichies moins de 5mb</div>
            </el-upload>
            <el-button class="filter-item" size="small" style="float: right" type="primary" icon="el-icon-edit" @click="handleInvestigateur">
              Ajouter
            </el-button>
          </div>
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
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
          <p class="headon">PERSONNES SE PRETANT A LA RECHERCHE</p>
          <br>

          <el-form-item label="Nombre prévu de personnes" required prop="personne.prevu" >
            <el-input-number v-model.lazy="postForm.personne.prevu" :min="0" size="medium" placeholder="Aa..." style="width:200px" />
          </el-form-item>

          <el-form-item label="Durée du traitement ou de la participation par personne" prop="personne.duree" required>
            <el-input-number v-model.lazy="postForm.personne.duree" :min="0" size="medium" placeholder="Aa..." style="width:200px" />
          </el-form-item>

          <el-form-item label="Indication thérapeutique" prop="personne.therapeutique" >
            <el-input v-model.lazy="postForm.personne.therapeutique" placeholder="Aa..." />
          </el-form-item>

          <el-form-item label="Principaux critères d'inclusion" prop="personne.criteres" required>
            <el-input v-model.lazy="postForm.personne.criteres" placeholder="Aa..." />
          </el-form-item>

        </el-card>

        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
          <p class="headon">COMITE D'ETHIQUE</p>
          <br>
          <el-form-item label="Comité (nom et adresse)" >
            <el-input v-model.lazy="postForm.commite.info" placeholder="Aa..." />
          </el-form-item>
          <el-form-item label="Avis "   size="small">
              <el-radio-group v-model.lazy="postForm.commite.avis">
                <el-radio :label="'favorable'" border size="mini">Favorable</el-radio>
                <el-radio :label="'défavorable'" border size="mini">Défavorable</el-radio>
              </el-radio-group>
            </el-form-item>
          <el-form-item label="Date de l'avis" >
            <el-date-picker v-model.lazy="displayComiteDate" type="date" format="yyyy-MM-dd"  placeholder="Selectionnez la dete" />
          </el-form-item>
        </el-card>
        <br>
        <br>
        <el-card shadow="hover" class="app-container" :body-style="{ padding: '0px', paddingRight: '60px'}">
          <p class="headon">ASSURANCE</p>
          <br>
          <el-form-item label="Entreprise d'assurance (nom ou dénomination) " >
            <el-input v-model.lazy="postForm.assurance.denomination" placeholder="Aa..." />
          </el-form-item>
          <el-form-item label="Numéro du contrat souscrit" >
            <el-input v-model.lazy="postForm.assurance.numero" placeholder="Aa..." />
          </el-form-item>
          
        </el-card>
        <br>
        <el-card shadow="never" class="app-container" :body-style="{ padding: '5px'}">
          <el-form-item style="float: right;margin: 40px">
            <router-link :to="'/essai/index'" class="link-type" style="margin:8px"><el-button> Etape précédente </el-button> </router-link>
            <el-button type="primary" @click="submitForm()">Etape suivante</el-button>
          </el-form-item>
        </el-card>

      </div>

    </el-form>

    <el-dialog title="INVESTIGATEUR(S)" :visible.sync="dialogInvestigateurVisible" width="900px">
      <el-form ref="investigateurForm" :rules="rules" :model="postInvestigateur" label-position="right" label-width="270px" style="padding: 0px 10px">
        <el-form-item label="Nom(s) et Prénom(s)" prop="fullname">
          <el-input v-model.lazy.lazy="postInvestigateur.fullname" />
        </el-form-item>
        <el-form-item label="Qualité" prop="qualite">
          <el-input v-model.lazy.lazy="postInvestigateur.qualite" />
        </el-form-item>
        <el-form-item label="Lieu de réalisation" prop="lieu">
          <el-input v-model.lazy.lazy="postInvestigateur.lieu" />
        </el-form-item>
      </el-form>
      <div slot="footer" >
        <el-button @click="dialogInvestigateurVisible = false">
          Anuuler
        </el-button>
        <el-button type="primary" @click="createInvestigateur()">
          Ajouter
        </el-button>
      </div>
    </el-dialog>
    

    <el-dialog title="MEDICAMENT OU PRODUIT ETUDIE" :visible.sync="dialogFormVisible" width="900px">
      <el-form ref="dataForm" :rules="rules" :model="postMedicamentEtude" label-position="right" label-width="270px" style="padding: 0px 10px">
          <el-form-item label="Dénomination spéciale" >
            <el-input v-model.lazy="postMedicamentEtude.denominationSpeciale"  />
          </el-form-item>
        
          <el-form-item label="Nom de code" prop="medicamentCode">
            <el-input v-model.lazy="postMedicamentEtude.nomDeCode" />
          </el-form-item>
          <el-form-item label="Dénomination scientifique et D.C.I du (des) principe(s) actif(s)" prop="medicamentDCI">
            <el-input v-model.lazy="postMedicamentEtude.DCI" />
          </el-form-item>

          <el-form-item label="Composition qualitative et quantitative" >
            <el-input v-model.lazy="postMedicamentEtude.compositionQualitativeQuantitative" />
          </el-form-item>

          <el-form-item label="Posologie" >
            <el-input v-model.lazy="postMedicamentEtude.Posologie" />
          </el-form-item>

          <el-form-item label="Principe actif nouveau : "  required>
            <el-radio-group v-model.lazy="postMedicamentEtude.principeActif"  size="mini">
              <el-radio :label="true"> Oui </el-radio>
              <el-radio :label="false"> Non </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Fabricant(s)" >
            <el-input v-model.lazy="postMedicamentEtude.fabricant" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" />
          </el-form-item>
          <br>
          <el-divider content-position="center">D.E ou A.M.M</el-divider>

          <el-form-item label="Algérie :" required size="meduim" label-width="90px">
            <el-radio-group v-model.lazy="postMedicamentEtude.Algerie">
              <el-radio label="oui" border size="mini" />
              <el-radio label="non" border size="mini" />
              <el-radio label="refus" border size="mini" />
              <el-radio label="suspension" border size="mini" />
              <el-radio label="retrait" border size="mini" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Etranger" label-width="90px">
            <el-input v-model.lazy="postMedicamentEtude.Etranger" :disabled="!postMedicamentEtude.Algerie.includes('non')" placeholder="nom(s) ou dénomination(s) et lieu(x) de fabrication" />
          </el-form-item>
      </el-form>
      <div slot="footer" >
        <el-button @click="dialogFormVisible = false">
          Anuuler
        </el-button>
        <el-button type="primary" @click="createData()">
          Ajouter
        </el-button>
      </div>
    </el-dialog>
    <el-tooltip placement="top" content="Retour vers le haut de la page">
      <back-to-top :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>
<script>
import BackToTop from '@/components/BackToTop'
import MDinput from '@/components/MDinput'
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import router from '@/router';
import { mapGetters } from 'vuex'


const investigateur= {
  fullname: '',
  qualite: '',
  lieu: ''
};

const medicamentEtude = {
  denominationSpeciale: '',
  nomDeCode: '',
  DCI: '',
  compositionQualitativeQuantitative: '',
  posologie: '',
  principeActif: false,
  fabricant: '',
  Algerie: '',
  Etranger: 'Non'
}
const defaultForm = {
  titre: '',
  objectif: '',
  rechercheBeneficeIndividuel: true,
  phaseExperimentationClinique: '',
  essai: [],
  etudeBioequivalence: '',
  etudeObservationnelle: [],
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
  investigateurFile: '',
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
    date: undefined,
    avis: undefined
  },
  assurance: {
    denomination: '',
    numero: ''
  },
  status: ''
}

const optionEtude = [  {
    value: 'Pharmacovigilance',
    label: 'Pharmacovigilance'
  },{
    value: 'Pharmacoépidémiologie',
    label: 'Pharmacoépidémiologie'
  },{
    value: 'Cohorte',
    label: 'Cohorte'
  },{
    value: 'Prévalence',
    label: 'Prévalence'
  },{
    value: 'Pharmacoéconomie',
    label: 'Pharmacoéconomie'
  },{
    value: 'Cas-témoins',
    label: 'Cas-témoins'
  }
]

const optionEssai = [{
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
]

export default {
  name: 'ArticleDetail',
  components: { MDinput, BackToTop, ElDragSelect },
  
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Ce champ est obligatoire'))
      } else {
        callback()
      }
    }
    return {
      myHeaders: { 'authorization': this.$store.state.user.token },
      uploadPercentage: 0,
      fileList: [],
      options: optionEssai,
      optionEtude: Object.assign({}, optionEtude),
      postForm: Object.assign({}, defaultForm),
      postMedicamentEtude: Object.assign({}, medicamentEtude),
      postInvestigateur: Object.assign({}, investigateur),
      loading: false,
      userListOptions: [],
      dialogFormVisible: false,
      dialogInvestigateurVisible: false,
      rules: {
        titre: [{  required: true, trigger: 'blur',validator: validateRequire }],
        objectif: [{ required: true, trigger: 'blur', validator: validateRequire }],
        rechercheBeneficeIndividuel: [{ required: true, trigger: 'blur', validator: validateRequire }],
        phaseExperimentationClinique: [{ required: true, trigger: 'blur', validator: validateRequire }],
        essai: [{ }],
        etudeObservationnelle : [{ }],
        etudeBioequivalence: [{ }],
        datePrevuDebut: [{ required: true, trigger: 'blur'}],
        dureePrevue: 0,
        fullname: [{ validator: validateRequire }],
        qualite: [{ validator: validateRequire }],
        lieu: [{ validator: validateRequire }],
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
        personne: {
          prevu: [{required: true, trigger: 'blur', }],
          therapeutique: [{required: true, trigger: 'blur', validator: validateRequire}],
          criteres: [{ validator: validateRequire }],
          duree: [{ required: true, trigger: 'blur',}]
        },
        comiteInfo: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
     ...mapGetters([
      'declarationAssurance',
      'lettreMandat',
      'avisFavorableComiteEthique',
      'synopsisProtocole',
      'protocoleFinal',
      'crf',
      'rcp',
      'ficheInformationPatient',
      'modeleFinancier',
      'autorisation',
      'paiement',
      'approbations'
    ]),
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
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    handleCreate() {
      this.postMedicamentEtude = Object.assign({}, medicamentEtude),
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleInvestigateur() {
      this.postInvestigateur = Object.assign({}, investigateur),
      this.dialogInvestigateurVisible = true
      this.$nextTick(() => {
        this.$refs['investigateurForm'].clearValidate()
      })
    },
    createInvestigateur() {
      this.$refs['investigateurForm'].validate((valid) => {
        if (valid) {
          this.postForm.investigateur.unshift(this.postInvestigateur)
          this.dialogInvestigateurVisible = false
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.postForm.medicamentEtudie.unshift(this.postMedicamentEtude)
          this.dialogFormVisible = false
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.postForm.medicamentEtudie.splice(index, 1)
    },
    submitForm() {
      const data = { ...this.postForm, ...this.$store.state.files }
      this.$refs.postForm.validate(valid => {
        if(this.crf === '') {
          this.$notify({
            message: 'Vous devez télécharger le fichier CRF d\'abord.',
            type: 'warning'
          })
        } else if(this.avisFavorableComiteEthique === '' && this.postForm.commite.avis === 'favorable') {
          this.$notify({
            message: "Vous devez télécharger l'Avis favorable du comité d'éthique d'abord.",
            type: 'warning'
          })
        } else if(this.ficheInformationPatient === '') {
          this.$notify({
            message: "Vous devez télécharger la fiche d'information du patient et formulaire de consentement éclairé.",
            type: 'warning'
          })
        } else if(this.declarationAssurance === '') {
          this.$notify({
            message: "Vous devez télécharger Attestation d'assurance.",
            type: 'warning'
          }) 
        } else if(this.paiement === '') {
          this.$notify({
            message: "Vous devez télécharger la quittance de paiement .",
            type: 'warning'
          })
        } 

        else  if ( this.postForm.investigateur === [] && this.postForm.investigateurFile === ''){
          this.$notify({
            message: 'le cahmp investigateur est vide!',
            type: 'warning'
          })
        } else 
        if (valid) {
          this.loading = true
          this.$store.dispatch('essais/createEssai', data).then(() => {
            // this.$notify({
            //   title: 'published',
            //   message: 'success',
            //   type: 'success',
            //   duration: 2000
            // })
            router.push('/essai-liste/soumisstion');
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
          this.$notify({
            message: 'verifier les champs obligatoire',
            type: 'warning'
          })
          console.log('error submit!!')
          return false
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
        this.$message.error('la taile de fichier est sup de 2MB!')
      }
      return isJPG && isLt2M
    },
    handelSuccess(repons, file) {
      //this.$store.dispatch(`files/${this.$props.commit}`, repons.url)
      this.postForm.investigateurFile = repons.url;
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

<style lang="scss" scoped>

.headon {
  text-align: center;
  font-size: 16px;
  font-weight: 100;
  color: #4a4a4a;
  font-family: 'Raleway';
  font-weight: bold;
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
