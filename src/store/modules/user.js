import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  id: '',
  nom: '',
  prenom: '',
  username: '',
  email: '',
  fonction: '',
  auProfilDe: '',
  adresse: '',
  etablissement: '',
  telephone: '',
  roles: []
}

const mutations = {
  SET_ID: (state, token) => {
    state.id = token
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, token) => {
    state.nom = token
  },
  SET_PRENOM: (state, token) => {
    state.prenom = token
  },
  SET_USERNAME: (state, token) => {
    state.username = token
  },
  SET_FONC: (state, token) => {
    state.fonction = token
  },
  SET_PROFIL: (state, token) => {
    state.auProfilDe = token
  },
  SET_ADDR: (state, adresse) => {
    state.adresse = adresse
  },
  SET_ETABL: (state, etablissement) => {
    state.etablissement = etablissement
  },
  SET_TELE: (state, telephone) => {
    state.telephone = telephone
  },
  SET_EMAIL: (state, avatar) => {
    state.email = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const token = 'Bearer ' + response.data.token
        console.log(response.data)
        commit('SET_ID', response.data.userId)
        if(!response.data.emailVerified ) {
          reject("email not verified")
        } else if(!response.data.actif){
          reject("account not activated")
        } else {
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        console.log({getInfo:data})

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { _id, nom, prenom, fonction, etablissement, adresse, telephone, email, auProfilDe, userName, grade } = data.user

        // roles must be a non-empty array
        if (!grade) {
          reject('getInfo: roles must be a non-null array!')
        }
        console.log(nom)

        commit('SET_ID', _id)
        commit('SET_NAME', nom)
        commit('SET_PRENOM', prenom)
        commit('SET_USERNAME', userName)
        commit('SET_FONC', fonction)
        commit('SET_PROFIL', auProfilDe)
        commit('SET_ETABL', etablissement)
        commit('SET_TELE', telephone)
        commit('SET_NAME', nom)
        commit('SET_EMAIL', email)
        commit('SET_ADDR', adresse)
        commit('SET_ROLES', [grade])
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERNAME', '')
        commit('SET_PRENOM', '')
        commit('SET_FONC', '')
        commit('SET_PROFIL', '')
        commit('SET_ETABL', '')
        commit('SET_TELE', '')
        commit('SET_NAME', '')
        commit('SET_EMAIL', '')
        removeToken()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
