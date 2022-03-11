<template>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>An error occurs: </strong> {{error}}
    <button @click="error=null" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>
<script setup>
  import { inject } from 'vue';

  const error = inject('error');
</script>