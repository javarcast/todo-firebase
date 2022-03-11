import { db, timestampValue } from '@/utils/firebase';
import { ref } from 'vue';
import { useAuth } from '@vueuse/firebase';
export const useDB = () => {
  const todos =  db.collection('todos');
  const loading = ref(false);
  const {user} = useAuth();

  const getToDos = async () => {
    try {
      loading.value = true;
      const resp = await todos.where('uid', '==', user.value.uid).get();
      return resp.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      return {
        error,
        res: true,
      }
    } finally {
      loading.value = false
    }
  }

  const addToDo = async (text) => {
    try {
        const todo = {
          text: text,
          date: timestampValue(),
          status: false,
          uid: user.value.uid,
        }

        const resp = await todos.add(todo);
        return {
          id: resp.id,
          ...todo
        }
    } catch (error) {
      return {
        error,
        res: true,
      }
    }
  }


  const deleteToDo = async(id) => {
    try {
      await todos.doc(id).delete();

      return {
        res:false,
      }
    } catch (error) {
      return {
        error,
        res:true,
      }
    }
  }

  const modifyTodo = async(todo) => {
    try {
        await todos.doc(todo.id).update({
          status: !todo.status,
        })
        return {
          res: false,
        }
    } catch (error) {
      return {
        error,
        res: true
      }
    }
  }
  return { getToDos, loading, addToDo, deleteToDo, modifyTodo }
}