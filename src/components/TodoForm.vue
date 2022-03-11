<template>
  <form @submit.prevent="sendTodo">
    <input v-model.trim="text" type="text" placeholder="Enter para agregar todo" class="form-control my-3">
  </form>
</template>

<script setup>
  import { inject, ref } from 'vue';
  import { useDB } from '@/hooks/useDB';

  const { addToDo } = useDB();
  const text = ref('');
  const todos = inject('todos')
  const error = inject('error')

  const sendTodo = async() => {
    if(!text.value.trim()) {
      console.log('text is empty!')
      return;
    }

    const todo = await addToDo(text.value);
    if(todo.res) {
      error.value= todo.error;
      text.value = '';
      return
    }
    todos.value.push(todo);
    text.value = '';
  }
</script>