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
          <div class="search-wrapper">
            <label>
              <input type="text" class="searchbar" placeholder="Entrer le code" ref="code" />
            </label>
          </div>
          <button v-on:click="receiveForm()" class="send_btn">Chercher</button>
          <a href="" ref="link_dl" class="send_btn">Download !</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import '../assets/style/ReceiveStyle.css';
</style>

<script>
import axios from 'axios';

export default {
  methods: {
    receiveForm() {
      // 1175893768ca8796609f12b9e4392f916fd11e752d0a9ccb687b9ffe40f46c046a87621b2742
      console.log(this.$refs.code.value);
      const code = this.$refs.code.value.toString();
      const ref = code.substring(0, code.length - 66);
      const key = code.substring(code.length - 64, code.length);
      // eslint-disable-next-line
      axios.get('http://crypto-carousel.com:3000/download/file/' + ref)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.response_p = 'Il y a une erreur';
        });
      console.log(ref);
      console.log(key);
    },
  },
  data() {
    return {
      ref: null,
    };
  },
};
</script>
