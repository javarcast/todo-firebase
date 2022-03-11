<template>

  <h1 v-if="isAuthenticated">{{user.displayName}}</h1>
</template>

<script setup>
  import { useAuth } from '@vueuse/firebase';

  const { user, isAuthenticated } = useAuth();
</script>