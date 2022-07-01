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
      );

      reader.onload = async (e) => {
        this.ciphered = CryptoJS.AES.encrypt(e.target.result, clee.toString());

        const cipheredBLOB = new Blob([this.ciphered.toString()], {
          type: 'text/plain',
        });
        const form = new FormData();
        // eslint-disable-next-line
        const fileName = this.file.name + '.encr';

        form.append('ciphered', cipheredBLOB, fileName);

        axios.post('http://crypto-carousel.com:3000/upload', form, {
          headers: {
            ContentType: 'multipart/form-data',
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      reader.readAsDataURL(this.file);
    },
  },
  data() {
    return {
      file: null,
      ciphered: null,
      deciphered: null,
    };
  },
};
</script>
