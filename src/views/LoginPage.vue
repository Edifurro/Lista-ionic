<template>
     <ion-page>
       <!-- Contenido para usuarios no autenticados -->
       <div class="ion-padding">
         <ion-grid class="ion-justify-content-center">
           <ion-row class="ion-justify-content-center">
             <ion-col size="12" size-md="6" size-lg="4">
               <ion-card>
                 <ion-card-header>
                   <ion-card-title>Iniciar Sesión</ion-card-title>
                 </ion-card-header>
   
                 <ion-card-content>
                   <form @submit.prevent="login">
                     <ion-item>
                       <ion-label position="stacked">Usuario</ion-label>
                       <ion-input 
                         v-model="username"
                         type="text"
                         required
                       ></ion-input>
                     </ion-item>
   
                     <ion-item>
                       <ion-label position="stacked">Contraseña</ion-label>
                       <ion-input
                         v-model="password"
                         type="password"
                         required
                       ></ion-input>
                     </ion-item>
   
                     <ion-button 
                       type="submit" 
                       expand="block" 
                       class="ion-margin-top"
                     >
                       Ingresar
                     </ion-button>
                   </form>
                 </ion-card-content>
               </ion-card>
   
               <ion-toast
                 :is-open="showError"
                 message="Credenciales incorrectas!"
                 duration="2000"
                 @didDismiss="showError = false"
                 color="danger"
               ></ion-toast>
             </ion-col>
           </ion-row>
         </ion-grid>
       </div>
     </ion-page>
   </template>
   
   <script setup>
   import { ref, onMounted } from 'vue';
   import { Preferences } from '@capacitor/preferences';
   import { useRouter } from 'vue-router';
   import {
     IonPage,
     IonCard,
     IonCardHeader,
     IonCardTitle,
     IonCardContent,
     IonItem,
     IonInput,
     IonButton,
     IonToast,
     IonGrid,
     IonRow,
     IonCol
   } from '@ionic/vue';
   
   const router = useRouter();
   
   // Estados reactivos
   const username = ref('');
   const password = ref('');
   const showError = ref(false);
   let sessionTimeout = null;
   
   // Credenciales válidas
   const validCredentials = {
     username: 'admin',
     password: '1234'
   };
   
   // Verificar el estado de login al cargar el componente
   onMounted(async () => {
     await checkLogin();
   });
   
   // Función de login
   const login = async () => {
     if (username.value === validCredentials.username && 
         password.value === validCredentials.password) {
       showError.value = false;
       
       // Guardar estado de login y timestamp
       await Preferences.set({ key: 'isLoggedIn', value: 'true' });
       await Preferences.set({ 
         key: 'loginTime', 
         value: Date.now().toString() 
       });
       
       // Redirigir a tabs/tab1
       router.replace('/tabs/tab1');
       
       // Configurar timeout de expiración
       sessionTimeout = setTimeout(logout, 3 * 60 * 1000);
     } else {
       showError.value = true;
       password.value = '';
     }
   };
   
   // Verificar sesión activa
   const checkLogin = async () => {
     const { value: isLoggedIn } = await Preferences.get({ key: 'isLoggedIn' });
     const { value: loginTime } = await Preferences.get({ key: 'loginTime' });
   
     if (isLoggedIn === 'true' && loginTime) {
       const currentTime = Date.now();
       const threeMinutes = 3 * 60 * 1000;
       
       if (currentTime - parseInt(loginTime) < threeMinutes) {
         // Redirigir si ya está autenticado
         router.replace('/tabs/tab1');
       } else {
         await logout();
       }
     }
   };
   
   // Función de logout
  
   </script>
   
   <style scoped>
ion-grid {
  height: 100vh; /* Usar viewport height en lugar de % */
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar horizontalmente */
}

ion-col {
  flex-grow: 0; /* Evita que se expanda demasiado */
  min-width: 300px; /* Ancho mínimo para el formulario */
  max-width: 500px; /* Ancho máximo para desktop */
  width: 100%; /* Ocupa el espacio disponible entre min y max */
}

ion-card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ocupa todo el ancho del ion-col */
}

ion-button {
  margin-top: 2rem; /* Unidad relativa mejor que % */
  min-height: 45px; /* Altura mínima para mejor tactil */
}

/* Media query para pantallas medianas/grandes */
@media (min-width: 768px) {
  ion-col {
    min-width: 400px; /* Aumentar tamaño en desktop */
    padding: 0 2rem; /* Espaciado lateral */
  }
  
  ion-button {
    margin-top: 2.5rem;
    font-size: 1.1rem;
  }
}
</style>