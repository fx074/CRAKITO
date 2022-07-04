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
          <p>{{response_p}}</p>
          <a href="" ref="link_dl" class="send_btn" style="visibility: hidden;">Download !</a>
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
import CryptoJS from 'crypto-js';

export default {
  methods: {
    receiveForm() {
      // VALEUR TEST : 1539092347ca8fae31a6264e391c804c4d4f98d4dd58bbb5f4906c7933c0dd6a1a427067208d
      const code = this.$refs.code.value.toString();
      const ref = code.substring(0, code.length - 66);
      const key = code.substring(code.length - 64, code.length);
      // eslint-disable-next-line
      axios.get('http://crypto-carousel.com:3000/download/file/' + ref)
        .then((res) => {
          if (res.data.errorHandler === 9) {
            const decipher = CryptoJS.AES.decrypt(
              res.data.file,
              CryptoJS.enc.Utf8.parse(key),
              { mode: CryptoJS.mode.ECB },
            ).toString(CryptoJS.enc.Utf8);

            this.$refs.link_dl.setAttribute('href', decipher);
            this.$refs.link_dl.setAttribute('download', res.data.filename.replace('.encr', ''));
            this.$refs.link_dl.setAttribute('style', 'visibility: show;');
            this.response_p = 'Fichier disponible !!';
          } else if (res.data.errorHandler === 10) {
            this.response_p = res.data.errorDesc;
          }
        })
        .catch((err) => {
          console.log(err);
          this.response_p = 'Il y a une erreur, le fichier n\'existe pas';
        });
    },
  },
};
</script>
