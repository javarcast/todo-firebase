<template>
  <loading-spinner v-if="loading"></loading-spinner>
  <div v-else>
    <t-navbar></t-navbar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
  import TNavbar from '@/components/TNavbar.vue';
  import LoadingSpinner from '@/components/LoadingSpinner.vue';
  import { firebase } from '@/utils/firebase';
import { onMounted, ref } from 'vue';

  const loading = ref(false)

  onMounted(async() => {
    loading.value = true;

    await firebase.getCurrentUser();
    loading.value = false;
  })
</script>