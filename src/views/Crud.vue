<template>
  <div v-if="isAuthenticated">
    <h1>crud</h1>
    <t-spinner class="text-black" v-if="loading"></t-spinner>
    <div v-else>
      <t-error v-if="showError"></t-error>
      <todo-form></todo-form>
      <to-do v-for="todo in todos" :key="todo.id" :todo="todo"></to-do>
      <p v-if="todos.length === 0">Todo's is empty :)</p>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeMount, provide, ref, computed } from 'vue';
  import { useAuth } from '@vueuse/firebase'
  import { useDB } from '@/hooks/useDB';
  import TSpinner from '@/components/TSpinner.vue';
  import TError from '@/components/TError.vue';
  import TodoForm from '@/components/TodoForm.vue';
  import ToDo from '@/components/ToDo.vue';

  const { isAuthenticated } = useAuth();
  const {getToDos, loading } = useDB();
  const todos = ref([])
  const error = ref(null)
  provide('error',error);
  provide('todos', todos)



  const showError = computed(() => error.value ? true: false);

  onBeforeMount(async() => {
    todos.value = await getToDos()
    if(todos.value.res) {
      error.value = todos.value.error;
    }
  })
</script>