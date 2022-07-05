<template>
  <div>
        <header>
        <div class="menu">
            <div class="inner">
                <div class="m_left">
                    <img src="../assets/logo_titre.png" alt="Le logo du site" class="m_logo" >
                </div>
                <div class="m_right">
                    <nav>
                      <router-link to="/" class="nav_link">Accueil</router-link>
                      <router-link to="/upload" class="nav_prim">Envoyer un fichier</router-link>
                      <router-link to="/receive" class="nav_prim">Récupérer un fichier</router-link>
                    </nav>
                    <router-view />
                </div>
            </div>
        </div>
    </header>
    <div class="cover_home">
      <div class="circle_1"></div>
      <div class="circle_2"></div>
      <div class="circle_3"></div>
      <div class="c_container">
        <div class="cover">
          <div class="cover_text">
            <h1>Crackito</h1>
            <h2>Partagez vos fichiers en toutes sécurité</h2>
            <p>Envoyez rapidement tout type de fichier de manière 100% sécurisée.
              Tout en respectant l'anonymat et la confidentialités des données !</p>
            <router-link to="/upload" class="cover_link">Envoyer un fichier</router-link>
            </div>
            <div class="cover_img">
              <img src="../assets/homepage_cover.png" alt="Page de couverture" class="img_cover">
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
    @import '../assets/style/HomeStyle.css';
</style>

<script>
export default {
  name: 'HomeView',
};
</script>
