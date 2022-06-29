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
                      <router-link to="/" class="nav_prim">Accueil </router-link>
                      <router-link to="/upload" class="nav_prim">Envoyer un fichier </router-link>
                      <router-link to="/receive" class="nav_link">Récupérer un fichier</router-link>
                    </nav>
                    <router-view/>
                </div>
            </div>
        </div>
    </header>
    <div class="container_sf">
      <div class="send_file">
        <p class="sf_title">Récupérer un fichier</p>
        <p class="sf_des">Un façon simple et sécurisé de partager et récupérer vos fichiers</p>
        <div class="sf_contour">
          <form action="/Upload" method="post" enctype="multipart/form-data" class="sf_form">
            <div class="search-wrapper">
              <label><input type="text" class="searchbar" placeholder="Entrer le code"/></label>
            </div>
            <button type="submit" class="send_btn">Chercher</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import '../assets/style/ReceiveStyle.css';
</style>
