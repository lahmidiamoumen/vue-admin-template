<template>
  <div class="dashboard-editor-container">
    <aside>
      Tous les fichiers sont obligatoire
    </aside>
    <el-steps class="app-container" :active="1" finish-status="success" align-center>
      <el-step title="Etape 1" description="les fichiers à fournir" />
      <el-step title="Etape 2" description="Formulaire d'annex - B" />
      <el-step title="Etape 3" description="Soumission du dossier" />
    </el-steps>
    <br>
    <el-row class="components-container" :gutter="20">
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="lettreMandat" :view="lettreMandat === ''" commit="lettreMandat" context-description="Lettre mandat du sponsor à la CRO" />
      </el-col>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="declarationAssurance" :view="declarationAssurance === ''" commit="declarationAssurance" context-description="Attestation d'assurance" />
      </el-col>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="avisFavorableComiteEthique" :view="avisFavorableComiteEthique === ''" commit="avisFavorableComiteEthique" context-description="Avis favorable du comité d'éthique" />
      </el-col>

      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="synopsisProtocole" :view="synopsisProtocole === ''" commit="synopsisProtocole" context-description="Synopsis du protocole en français" />
      </el-col>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="protocoleFinal" :view="protocoleFinal === ''" commit="protocoleFinal" context-description="Protocole final et tous les amendements" />
      </el-col>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="rcp" :view="rcp === ''" commit="rcp" context-description="Brochure investigateur ou RCP du produit le cas échéant" />
      </el-col>

      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="crf" :view="crf === ''" commit="crf" context-description="CRF et tout autre documentation qui sera fournie au patient" />
      </el-col>

      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="approbations" :view="approbations === ''" commit="approbations" context-description="Approbations des autorités compétentes dans d'autres pays, le cas échéant" />
      </el-col>

      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="ficheInformationPatient" :view="ficheInformationPatient === ''" commit="ficheInformationPatient" context-description="Fiche d'information du patient et formulaire de consentement éclairé" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="modeleFinancier" :view="modeleFinancier === ''" commit="modeleFinancier" context-description="Modèle de contrat financier des médecins participants" />
      </el-col>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="autorisation" :view="autorisation === ''" commit="autorisation" context-description="Autorisation de mise sur le marché algérienne ou celle du pays d'origine" />
      </el-col>
      <el-col :sm="{span: 24}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}" :offset="0">
        <FileUploader :file="paiement" :view="paiement === ''" commit="paiement" context-description=" Quittance de paiement / preuve de paiement des frais d'essais cliniques." />
      </el-col>
    </el-row>

    <div class="app-container">
      <el-card shadow="never" class="app-container" :body-style="{ padding: '5px', textAlign: 'right'}">
        <el-tooltip placement="top" content="Completez tous les champs obligatoire">
          <router-link :to="'/essai-liste/create'" class="link-type">
            <el-button :disabled="!viewed()" style="margin-top: 12px;" @click="next">Etape suivante</el-button>
          </router-link>
        </el-tooltip>
      </el-card>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileUploader from '@/components/Mine/FileUploader.vue'

export default {
  name: 'Guide',
  components: {
    FileUploader
  },
  data() {
    return {
      active: 0
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
    ])
  },
  methods: {
    viewed() {
      return true
      /* this.declarationAssurance !== '' &&
      this.lettreMandat !== '' &&
      this.avisFavorableComiteEthique !== ''
      && this.synopsisProtocole !== '' &&
      this.protocoleFinal !== '' &&
      this.crf !== '' &&
      this.rcp !== '' &&
      this.ficheInformationPatient !== '' &&
      this.modeleFinancier !== '' &&
      this.autorisation !== '' &&
      this.paiement !== '' && this.approbations !== '' */
    },
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: #fcfcfc;
  min-height: 100vh;
  padding: 50px 60px 0px;
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
