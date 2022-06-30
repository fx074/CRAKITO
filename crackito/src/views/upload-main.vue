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
import axios from 'axios';

export default {
  methods: {
    FileUploadOnchange() {
      [this.file] = this.$refs.file.files;
    },
    submitForm() {
      const reader = new FileReader();
      const formData = new FormData();

      reader.onload = async (e) => {
        const salt = CryptoJS.lib.WordArray.random(128 / 8);
        const clee = CryptoJS.PBKDF2(
          Math.floor(Math.random() * 25555).toString(),
          salt,
          {
            keySize: 256 / 32,
            iterations: 1000,
          },
        );
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
        };
        this.ciphered = CryptoJS.AES.encrypt(e.target.result, clee.toString());
        formData.append('ciphered', this.ciphered);
        try {
          console.log(formData);
          await axios.post('http://crypto-carousel.com:3000/upload', formData[0], config);
        } catch (err) {
          console.log(err);
          console.log('Something went wrong !!!');
        }
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
