import { createEssai } from '@/api/essai'

const state = {
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
    date: '',
    avis: undefined
  },
  assurance: {
    denomination: '',
    numero: ''
  },
  status: ''
}

const mutations = {
  SET_ID: (state, token) => {
    state.ref = token
  },
  SET_STATE: (state, token) => {
    state.titre = token.titre //Object.assign({}, token)
    state.objectif= token.objectif,
    state.rechercheBeneficeIndividuel= token.rechercheBeneficeIndividuel,
    state.phaseExperimentationClinique= token.phaseExperimentationClinique,
    state.essai = token.essai
    state.etudeObservationnelle= token.etudeObservationnelle,
    state.etudeBioequivalence= token.etudeBioequivalence,
    state.datePrevuDebut= token.datePrevuDebut,
    state.dureePrevuDebut= token.dureePrevuDebut,
    state.medicament= token.medicament,
    state.medicamentEtudie= token.medicamentEtudie,
    state.medicamentReference= token.medicamentReference,
    state.placebo= token.placebo,
    state.personne= token.personne,
    state.commite= token.commite,
    state.assurance = token.assurance
    state.status= token.status
  }
}

const actions = {
  createEssai({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_STATE', data)

      resolve()
      createEssai(data).then(response => {
        commit('SET_STATE', data)
        commit('SET_ID', response.data.essai.id)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
