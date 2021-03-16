<template>
  <div class="app-container">
    <el-steps class="app-container" :active="1" finish-status="success" align-center>
      <el-step title="Etape 1" description="les fichiers à fournir" />
      <el-step title="Etape 2" description="Formulaire d'annex - B" />
      <el-step title="Etape 3" description="Soumission du dossier" />
    </el-steps>
    <el-card shadow="never" class="app-container" :body-style="{ padding: '5px', textAlign: 'center'}">
      <i> les fichies seront téléchargés et sauvegardés dans votre compte.</i>
    </el-card>
    <br>
    <FileUploader :view="lettreMandat === ''" commit="lettreMandat" context-description="Lettre mandat du sponsor à la CRO" context-name="Lettre mandat" />
    <FileUploader :view="declarationAssurance === ''" commit="declarationAssurance" context-name="Attestation d'assurance" />
    <FileUploader :view="avisFavorableComiteEthique === ''" commit="avisFavorableComiteEthique" context-name="Avis favorable du comité d'éthique" />
    <FileUploader :view="synopsisProtocole === ''" commit="synopsisProtocole" context-name="Synopsis du protocole en français" />
    <FileUploader :view="protocoleFinal === ''" commit="protocoleFinal" context-name="Protocole final et tous les amendements" context-description="Protocole final et tous les amendements" />
    <FileUploader :view="crf === ''" commit="crf" context-description="CRF et tout autre documentation qui sera fournie au patient (publicités, fiches d'agenda, questionnaires, dépliants, instructions, etc.)" context-name="CRF" />
    <FileUploader :view="rcp === ''" commit="rcp" context-description="Brochure investigateur ou RCP du produit le cas échéant" context-name="RCP" />
    <FileUploader :view="approbations === ''" commit="approbations" context-name="Approbations des autorités compétentes dans d'autres pays, le cas échéant" />
    <FileUploader :view="ficheInformationPatient === ''" commit="ficheInformationPatient" context-name="Fiche d'information du patient et formulaire de consentement éclairé" />
    <FileUploader :view="modeleFinancier === ''" commit="modeleFinancier" context-name="Modèle de contrat financier des médecins participants" />
    <FileUploader :view="autorisation === ''" commit="autorisation" context-name="Autorisation de mise sur le marché algérienne ou celle du pays d'origine" />
    <FileUploader :view="paiement === ''" commit="paiement" context-name="Quittance de paiement" context-description="Preuve de paiement des frais d'essais cliniques." />

    <div class="app-container">
      <el-card shadow="never" class="app-container" :body-style="{ padding: '5px', textAlign: 'right'}">
        <el-tooltip placement="top" content="Completez tous les champs obligatoire">
          <router-link :to="'/example/create'" class="link-type">
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
  mounted: function() {
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
