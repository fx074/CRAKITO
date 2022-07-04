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
          <div class="sf_form">
            <label>
              <div class="container_file">
                <input type="file" ref="file" v-on:change="FileUploadOnchange( $event )"
                class="sf_file"/>
              </div>
            </label>
            <button v-on:click="submitForm()"  class="send_btn">Upload</button>
            <span id="status"></span>
          </div>
        </div>
        <p>{{response_p}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
    @import '../assets/style/UploadStyle.css';
</style>

<script>
import CryptoJS from 'crypto-js';
import FormData from 'form-data';
import axios from 'axios';

export default {
  methods: {
    FileUploadOnchange() {
      [this.file] = this.$refs.file.files;
    },
    submitForm() {
      const reader = new FileReader();
      const salt = CryptoJS.lib.WordArray.random(128 / 8);
      const clee = CryptoJS.PBKDF2(
        Math.floor(Math.random() * 25555).toString(),
        salt,
        {
          keySize: 256 / 32,
          iterations: 1000,
        },
      ).toString();

      reader.onload = async (e) => {
        this.ciphered = CryptoJS.AES.encrypt(
          e.target.result,
          CryptoJS.enc.Utf8.parse(clee),
          { mode: CryptoJS.mode.ECB },
        );

        /* console.log(CryptoJS.AES.decrypt(
          this.ciphered.toString(),
          CryptoJS.enc.Utf8.parse(clee),
          { mode: CryptoJS.mode.ECB },
        ).toString(CryptoJS.enc.Utf8)); */

        const cipheredBLOB = new Blob([this.ciphered.toString()], {
          type: 'text/plain',
        });
        const form = new FormData();
        // eslint-disable-next-line
        const fileName = this.file.name + '.encr';

        form.append('ciphered', cipheredBLOB, fileName.replace(/\s/g, ''));

        axios.post('http://crypto-carousel.com:3000/upload', form, {
          headers: {
            ContentType: 'multipart/form-data',
          },
        })
          .then((res) => {
            console.log(res);
            // eslint-disable-next-line
            this.response_p = 'Votre clé unique est : ' + res.data.ref + 'ca' + clee;
          })
          .catch((err) => {
            console.log(err);
            this.response_p = 'Il y a une erreur';
          });
      };
      try {
        reader.readAsDataURL(this.file);
      } catch (err) {
        this.response_p = 'Merci de mettre un fichier';
      }
    },
  },
  data() {
    return {
      file: null,
      ciphered: null,
      deciphered: null,
      response_p: null,
    };
  },
};
</script>
