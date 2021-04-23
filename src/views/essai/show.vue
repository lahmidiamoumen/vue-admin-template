<template>
  <div class="dashboard-editor-container">
    <div class="clearfix">
       <el-steps class="app-container" :active="3" finish-status="success" align-center>
          <el-step title="Etape 1" description="les fichiers à fournir" />
          <el-step title="Etape 2" description="Formulaire d'annexe - B" />
          <el-step title="Etape 3" description="Soumission du dossier" />
        </el-steps>
    </div>
    <div>
      <div class="bullshit">
        <div class="bullshit__oops">Votre dossier a été soumis avec succès</div>
        <div class="bullshit__info"> cliquez sur le bouton ci-dessous pour retourner à la page d'accueil.</div>
                  
          <router-link :to="'/essai-liste/list'" class="link-type">
            <el-button class="bullshit__return-home" style="">Page d'accueil</el-button>
          </router-link>  
      </div>
    </div>
  </div>
</template>

<script>

export default { name: 'Show'}
</script>

<style lang="scss" scoped>

.bullshit {
    margin: 0 auto;
    position: relative;
    width: 700px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #f7f7f7;
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
