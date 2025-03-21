import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import { Preferences } from '@capacitor/preferences';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login' // Redirigir al login inicialmente
  },
  {
    path: '/login',
    component: LoginPage // Ruta para la página de login
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta: {
          requiresAuth: true // Requiere autenticación
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: {
          requiresAuth: true // Requiere autenticación
        }
      },
    
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuthStatus();
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

// Función para verificar el estado de autenticación
async function checkAuthStatus() {
  const { value: isLogged } = await Preferences.get({ key: 'isLoggedIn' });
  const { value: loginTime } = await Preferences.get({ key: 'loginTime' });

  if (isLogged === 'true' && loginTime) {
    const currentTime = Date.now();
    const sessionDuration = 3 * 60 * 1000; // 3 minutos
    return (currentTime - parseInt(loginTime)) < sessionDuration;
  }
  return false;
}

export default router;
