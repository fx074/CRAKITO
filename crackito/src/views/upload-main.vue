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
export default {
  methods: {
    FileUploadOnchange() {
      [this.file] = this.$refs.file.files;
    },
    submitForm() {
      console.log(this.file);
    }, /*
    cipherFile() {
      let reader = new FileReader();
    }, */
  },
  data() {
    return {
      file: '',
      result: '',
    };
  },
};
</script>
