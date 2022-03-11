import { auth, firebase } from '@/utils/firebase';
import { useRouter } from 'vue-router';

export const useUser = () => {
  const router = useRouter();

  const signIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return { signIn, signOut };
}