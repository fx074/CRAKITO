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
                        <router-link to="/upload" class="nav_prim">Recevoir fichier </router-link>
                        <router-link to="/about" class="nav_prim">A propos </router-link>
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
            <div class="sf_button"></div>
            <label>Boum shakalaka<input type="file" name="TP7"></label>
            <button type="submit">Send</button>
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
