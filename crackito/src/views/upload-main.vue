<template>
  <h1>File Upload !</h1>
  <div class="container">
    <div>
      <label>File
        <input type="file" name="file" id="file" v-on:change="FileUploadOnchange()" />
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
      return null;
    },
  },
};
</script>
