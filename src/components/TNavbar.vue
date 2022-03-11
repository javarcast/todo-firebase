<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        {{userName}}
      </router-link>
      <div>
        <button v-if="!isAuthenticated" @click="signIn" class="btn btn-primary">Sign in</button>
        <div v-else>
          <router-link class="btn btn-primary mx-1" to="/crud">CRUD</router-link>
          <router-link class="btn btn-primary mx-1" to="/profile">Profile</router-link>
          <button @click=" signOut" class="btn btn-danger mx-1">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { useUser } from '@/hooks/useUser';
  import { useAuth } from '@vueuse/firebase';
  import { computed } from 'vue';

  const { signIn, signOut } = useUser();
  const { user, isAuthenticated } = useAuth();

  const userName = computed(() => {
    return isAuthenticated.value? user.value.displayName : 'Guess'
  })

</script>