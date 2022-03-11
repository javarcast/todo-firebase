<template>
  <div class="d-flex justify-content-center modal">
    <div class="background-opacity"></div>
    <t-spinner class="text-white"></t-spinner>
  </div>
</template>
<script setup>
  import TSpinner from '@/components/TSpinner.vue';
</script>
<style scoped>
  .modal {
    position: absolute;
    z-index: 10;
    height: 100vh;
    width: 100%;
    right: auto;
    left: auto;
    top: auto;
    bottom: auto;
    box-sizing: border-box;
    align-items: center;
  }
  .background-opacity{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,.9);
  }
</style>