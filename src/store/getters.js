const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  size: state => state.app.size,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  name: state => state.user.nom,
  declarationAssurance: state => state.files.declarationAssurance,
  lettreMandat: state => state.files.lettreMandat,
  avisFavorableComiteEthique: state => state.files.avisFavorableComiteEthique,
  synopsisProtocole: state => state.files.synopsisProtocole,
  protocoleFinal: state => state.files.protocoleFinal,
  crf: state => state.files.crf,
  rcp: state => state.files.rcp,
  ficheInformationPatient: state => state.files.ficheInformationPatient,
  modeleFinancier: state => state.files.modeleFinancier,
  autorisation: state => state.files.autorisation,
  paiement: state => state.files.paiement,
  approbations: state => state.files.approbations
}
export default getters
