import { createEssai } from '@/api/essai'

const state = {
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
    date: ''
  },
  status: ''
}

const mutations = {
  SET_STATE: (state, token) => {
    state = token
  }
}

const actions = {
  createEssai({ commit }, data) {
    return new Promise((resolve, reject) => {
      createEssai(data).then(response => {
        commit('SET_STATE', data)
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
