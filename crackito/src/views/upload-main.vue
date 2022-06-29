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
                      <router-link to="/upload" class="nav_link">Envoyer un fichier </router-link>
                      <router-link to="/receive" class="nav_prim">Récupérer un fichier</router-link>
                    </nav>
                    <router-view />
                </div>
            </div>
        </div>
    </header>
    <div class="container_sf">
      <div class="send_file">
        <p class="sf_title">Envoyer un fichier</p>
        <p class="sf_des">La façon la plus simple et sécurisé d'envoyer vos fichiers</p>
        <div class="sf_contour">
          <form action="/Upload" method="post" enctype="multipart/form-data" class="sf_form">
            <div class="container_file">
              <input type="file" name="TP7" id="file" class="sf_file">
            <label for="file">Choisir un fichier</label>
            </div>
            <button type="submit" class="send_btn">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import '../assets/style/UploadStyle.css';
</style>

<script>
import CryptoJS from 'crypto-js';

export default {
  methods: {
    FileUploadOnchange() {
      [this.file] = this.$refs.file.files;
    },
    submitForm() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.ciphered = CryptoJS.AES.encrypt(e.target.result, 'TEST');
      };
      console.log(this.ciphered);
      reader.readAsDataURL(this.file);
    },
  },
  data() {
    return {
      file: null,
      ciphered: null,
    };
  },
};
</script>
