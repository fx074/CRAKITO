<template>
  <h1>File Upload !</h1>
  <div class="container">
    <div>
      <label>File
        <input type="file" ref="file" v-on:change="FileUploadOnchange( $event )" />
      </label>
      <button v-on:click="submitForm()">Upload</button>
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
