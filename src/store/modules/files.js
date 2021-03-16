
const state = {
  declarationAssurance: '',
  lettreMandat: '',
  avisFavorableComiteEthique: '',
  synopsisProtocole: '',
  protocoleFinal: '',
  crf: '',
  rcp: '',
  ficheInformationPatient: '',
  modeleFinancier: '',
  autorisation: '',
  paiement: '',
  approbations: ''
}

const mutations = {
  SET_declarationAssurance: (state, token) => {
    state.declarationAssurance = token
  },
  SET_lettreMandat: (state, token) => {
    state.lettreMandat = token
  },
  SET_avisFavorableComiteEthique: (state, token) => {
    state.avisFavorableComiteEthique = token
  },
  SET_synopsisProtocole: (state, token) => {
    state.synopsisProtocole = token
  },
  SET_protocoleFinal: (state, token) => {
    state.protocoleFinal = token
  },
  SET_crf: (state, adresse) => {
    state.crf = adresse
  },
  SET_rcp: (state, etablissement) => {
    state.rcp = etablissement
  },
  SET_ficheInformationPatient: (state, telephone) => {
    state.ficheInformationPatient = telephone
  },
  SET_modeleFinancier: (state, avatar) => {
    state.modeleFinancier = avatar
  },
  SET_paiement: (state, roles) => {
    state.paiement = roles
  },
  SET_autorisation: (state, roles) => {
    state.autorisation = roles
  },
  SET_approbations: (state, roles) => {
    state.approbations = roles
  }
}

const actions = {
  declarationAssurance({ commit }, data) {
    commit('SET_declarationAssurance', data)
  },
  lettreMandat({ commit }, data) {
    commit('SET_lettreMandat', data)
  },
  avisFavorableComiteEthique({ commit }, data) {
    commit('SET_avisFavorableComiteEthique', data)
  },
  synopsisProtocole({ commit }, data) {
    commit('SET_synopsisProtocole', data)
  },
  protocoleFinal({ commit }, data) {
    commit('SET_protocoleFinal', data)
  },
  crf({ commit }, data) {
    commit('SET_crf', data)
  },
  rcp({ commit }, data) {
    commit('SET_rcp', data)
  },
  ficheInformationPatient({ commit }, data) {
    commit('SET_ficheInformationPatient', data)
  },
  modeleFinancier({ commit }, data) {
    commit('SET_modeleFinancier', data)
  },
  autorisation({ commit }, data) {
    commit('SET_autorisation', data)
  },
  paiement({ commit }, data) {
    commit('SET_paiement', data)
  },
  approbations({ commit }, data) {
    commit('SET_approbations', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
