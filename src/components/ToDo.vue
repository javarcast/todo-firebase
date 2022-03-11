<template>
  <div class="card shadow-sm mb-2">
    <div class="card-body">
      <p class="m-0" :class="{'text-muted text-decoration-line-through': todo.status}">
        {{todo.text}}
      </p>
      <div class="mt-2">
        <button @click="modifyTD(todo)" :disabled="blockButton" :class="todo.status? 'btn-success': 'btn-warning'" class="btn mx-1">
          {{todo.status ? 'Finished': 'Pending'}}
        </button>
        <button :disabled="blockButton" @click="deleteTD(todo.id)" class="btn btn-danger mx-1">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { defineProps, inject, ref } from 'vue';
  import { useDB } from '@/hooks/useDB';

  const props = defineProps({ todo: Object});
  const { deleteToDo, modifyTodo }  = useDB();
  const error = inject('error');
  const todos = inject('todos');
  const blockButton = ref(false)

  const modifyTD = async(todo) => {
    blockButton.value = true;
    const resp = await modifyTodo(todo);

    if(resp.res) {
      error.value = resp.error
      return;
    }

    todos.value = todos.value.map(item => 
    (item.id === todo.id)? {...item, status:!todo.status} : item);

    blockButton.value = false;
  }

  const deleteTD = async(id) => {
    blockButton.value = true;
    const resp = await deleteToDo(id)

    if(resp.res) {
      error.value = resp.error;
      return
    }

    todos.value = todos.value.filter(todo => todo.id !== id);
    blockButton.value= false;
  }
</script>

<style scoped>
 .todo-finish {
   text-decoration: line-through;
 }
</style>