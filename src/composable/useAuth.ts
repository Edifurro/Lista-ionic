// composables/useAuth.ts
import { ref } from 'vue';
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';

export const useAuth = () => {
  const router = useRouter();
  const isAuthenticated = ref(false);

  const checkAuth = async () => {
    const { value: isLogged } = await Preferences.get({ key: 'isLoggedIn' });
    const { value: loginTime } = await Preferences.get({ key: 'loginTime' });

    if (isLogged === 'true' && loginTime) {
      const currentTime = Date.now();
      const sessionDuration = 3 * 60 * 1000; // 3 minutos

      if (currentTime - parseInt(loginTime) < sessionDuration) {
        isAuthenticated.value = true;
        return true;
      }
    }
    
    isAuthenticated.value = false;
    return false;
  };

  return { isAuthenticated, checkAuth };
};