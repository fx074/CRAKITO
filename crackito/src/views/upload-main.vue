<template>
  <h1>File Upload !</h1>
  <div class="container">
    <div>
      <label>File
        <input type="file" ref="file" v-on:change="FileUploadOnchange( $event )" />
      </label>
      <button v-on:click="submitForm()">Upload</button>
      <span id="status"></span>
    </div>
  </div>
</template>

<style>
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
      const formData = new FormData();

      reader.onload = (e) => {
        const salt = CryptoJS.lib.WordArray.random(128 / 8);
        const clee = CryptoJS.PBKDF2(
          Math.floor(Math.random() * 25555).toString(),
          salt,
          {
            keySize: 256 / 32,
            iterations: 1000,
          },
        );
        this.ciphered = CryptoJS.AES.encrypt(e.target.result, clee.toString());
        formData.append('ciphered', this.ciphered);
        fetch('http://crypto-carousel.com:3000/Upload', { method: 'POST', body: formData })
          .then();
      };
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
