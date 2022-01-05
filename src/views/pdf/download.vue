<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
    <div ref="content" class="node-article-content">
      <h3>Essai clinique</h3>
       <blockquote>

      <el-skeleton v-if="essaiss.createdAt === ''" :rows="5" animated />

      <table v-else class="balance">
				<tr>
					<th><span>Référence:</span></th>
					<td><span>{{ essaiss.ref | getId }} </span></td>
				</tr>
        <tr>
					<th><span>Date de constitution:</span></th>
					<td><span>{{ date(Date.now())}}</span></td>
				</tr>
				<tr>
					<th><span>Promoteur:</span></th>
					<td><span >{{ name}} {{ prenom}}</span></td>
				</tr>
				<tr>
					<th><span >Objectif:</span></th>
					<td><span>{{ essaiss.objectif}}</span></td>
				</tr>
        <tr>
					<th><span >Titre:</span></th>
					<td><span>{{ essaiss.titre}}</span></td>
				</tr>
			</table>
       </blockquote>
      <!-- card body -->
    
  
          <h1 style="font-size: 20px; padding: 0 17px">Annexe B</h1>
         <el-form ref="essaiss" :model="essaiss"  class="form-container">
                <dl class="table-display">
                  <dt>Titre de l'essai</dt>
                  <dd>{{essaiss.titre}}</dd>
                  <dt>Objectif</dt>
                  <dd>{{essaiss.objectif}}</dd>
                  <dt>Recherche avec bénéfice individuel direct</dt>
                  <dd>{{essaiss.rechercheBeneficeIndividuel ? 'Oui' : 'Non'}}</dd>
                  <dt>Phase d'expérimentation clinique</dt>
                  <dd>{{essaiss.phaseExperimentationClinique}}</dd>
                </dl>
                <dl class="table-display">
                  <dt>Essai</dt>
                  <dd>
                    <ul>
                      <li v-for="(item, index) in essaiss.essai" :key="index">
                        {{item}}
                      </li>
                    </ul>
                  </dd>  
                  <dt>Etude de bioéquivalence</dt>
                  <dd>{{essaiss.etudeBioequivalence}}</dd>
                  <dt>Etude Observationnelle</dt>
                  <dd>
                    <ul>
                      <li v-for="(item, index) in Array.isArray(essaiss.etudeObservationnelle) ? essaiss.etudeObservationnelle : [essaiss.etudeObservationnelle]" :key="index">
                        {{item}}
                      </li>
                    </ul>
                  </dd>  
                  <dt>Date prévue pour le début de la recherche</dt>
                  <dd>
                      {{essaiss.dureePrevuDebut}}
                  </dd>
                  <dt>Durée prévue</dt>
                  <dd>{{essaiss.dureePrevuDebut}}</dd>
                </dl>

               
               
            <p style="clear: left;padding: 12px"> </p>
            <h2  content-position="left">MEDICAMENT OU PRODUIT ÉTUDIÉ</h2>
            <el-table :data="essaiss.medicamentEtudie" align="center" style="width: 100%">
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
            <h2>MEDICAMENT OU PRODUIT DE REFERENCE</h2>
            <br>
            <dl class="table-display">
              <dt>Dénomination spéciale</dt>
              <dd>{{essaiss.medicamentReference.denominationSpeciale}}</dd>

              <dt>Dénomination scientifique et DCI du (des) principe(s) actif(s)</dt>
              <dd>{{essaiss.medicamentReference.DCI}}</dd>

              <dt>Forme pharmaceutique</dt>
              <dd>{{essaiss.medicamentReference.formePharmaceutique}}</dd>
            </dl>

            <dl class="table-display">
              <dt>Composition qualitative et quantitative en principe actifs</dt>
              <dd>{{essaiss.medicamentReference.compositionQualitativeQuantitative}}</dd>

              <dt>Posologie</dt>
              <dd>{{essaiss.medicamentReference.posologie}}</dd>

              <dt>Fabricant(s)</dt>
              <dd>{{essaiss.medicamentReference.fabricant}}</dd>
            </dl>
            <br>
            <br>
            <p style="clear: left;padding: 12px"> </p>
            <h2  content-position="left">INVESTIGATEUR(S)</h2>
              <el-link v-if="essaiss.investigateurFile" type="primary" target="_blank" :href="`/${essaiss.investigateurFile}`">Fichier des investigateur</el-link>
              <el-table :data="essaiss.investigateur" align="center" style="width: 100%">
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
                <h2>PLACEBO</h2>
                <dt>Forme pharmaceutique</dt>
                <dd>{{essaiss.placebo.formePharmaceutique}}</dd>
                <dt>Fabricant(s) nom(s) ou dénomination(s) et lieu(x) de fabrication</dt>
                <dd>{{essaiss.placebo.fabricant}}</dd>
            </dl>    
            <dl class="table-display">
              <h2>PERSONNES SE PRETANT A LA RECHERCHE</h2>
                <dt>Nombre prévu de personnes</dt>
                <dd>{{essaiss.personne.prevu}}</dd>
                <dt>Indication thérapeutique</dt>
                <dd>{{essaiss.personne.therapeutique}}</dd>
                <dt>Principaux critères d'inclusion</dt>
                <dd>{{essaiss.personne.criteres}}</dd>
                <dt>Durée du traitement ou de la participation par personne</dt>
                <dd>{{essaiss.personne.duree}}</dd>
            </dl>
            
            <p style="clear: left;padding: 12px"> </p>

           <h2> COMITE D'ETHIQUE </h2>
            <dl class="table-display">     
                <dt>Comité (nom et adresse)</dt>
                <dd>{{essaiss.commite.info}}</dd>
                <dt>Avis</dt>
                <dd>{{essaiss.commite.avis}}</dd>
                <dt>Date de l'avis</dt>
                <dd>
                  {{essaiss.commite.avis}}
                </dd>
            </dl>
            <br>
            <p style="clear: left;padding: 12px"> </p>

            <h2> ASSURANCE </h2>
            <dl class="table-display">     
                <dt>Entreprise d'assurance (nom ou dénomination)</dt>
                <dd>{{ essaiss.assurance ? essaiss.assurance.denomination : 'Vide'}}</dd>
                <dt>Numéro du contrat souscrit</dt>
                <dd>{{ essaiss.assurance ? essaiss.assurance.numero : 'Vide'}}</dd>
            </dl>     
        </el-form>
    <br>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['essaiss','prenom', 'name']),
  data() {
    return {
      article: '',
      fullscreenLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  filters: {
    getId(id){
      return id ? 'EC_' +  String(id).padStart(6, '0') : 'EC_000000';
    }
  },
  methods: {
    date(date) {
      return new Date(date).toLocaleDateString("fr-FR",  {year: 'numeric', month: 'long', day: 'numeric' })
    },
    fetchData() {
        document.title = 'Plans for the Next Iteration of Vue.js'
        setTimeout(() => {
          this.fullscreenLoading = false
          this.$nextTick(() => {
            window.print()
          })
        }, 3000)
    }
  }
}
</script>

<style lang="scss">
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

@mixin clearfix {
  &:before {
    display: table;
    content: '';
    clear: both;
  }

  &:after {
    display: table;
    content: '';
    clear: both;
  }
}

.main-article {
  padding: 20px;
  margin: 0 auto;
  display: block;
  width: 740px;
  background: #fff;
}

.article__heading {
  position: relative;
  padding: 0 0 20px;
  overflow: hidden;
}

.article__heading__title {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 27px;
  line-height: 48px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
}

.node-article-content {
  margin: 20px 0 0;
  @include clearfix;
  font-size: 16px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 30px;
  font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;

  &> :last-child {
    margin-bottom: 0;
  }

  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  p {
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    line-height: 1.58;
    letter-spacing: -.003em;

  }

  ul {
    margin-bottom: 30px;
  }

  li {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;

    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
    margin-left: 30px;
    margin-bottom: 14px;
  }

  a {
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .84) 100%, rgba(0, 0, 0, 0) 0);
    background-size: 1px 1px;
    background-position: 0 calc(1em + 1px);
    padding: 0 6px;
  }

  code {
    background: rgba(0, 0, 0, .05);
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    display: inline-block;
  }

  img {
    border: 0;
  }

  /* 解决 IE6-7 图片缩放锯齿问题 */
  img {
    -ms-interpolation-mode: bicubic;
  }

  blockquote {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: italic;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
    border-left: 3px solid rgba(0, 0, 0, .84);
    padding-left: 20px;
    margin-left: -23px;
    padding-bottom: 2px;
  }

  a {
    text-decoration: none;
  }

  h2,
  h3,
  h4 {
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -.015em;
    margin: 53px 0 0;
  }

  h4 {
    font-size: 26px;
  }
}
</style>
