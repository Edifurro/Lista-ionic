<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perritas</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <!-- Contenido solo visible cuando está autenticado -->
      <div v-if="isAuthenticated">
        <div class="presentacion" style="text-align: center; margin: 3% 20px 2%;">
          <p>
            En esta página encontrarás una lista de perritas con sus respectivas imágenes y descripciones.
          </p>
          <hr class="divider" />
        </div>
        
        <div class="card-container">
          <ion-card v-for="(dog, index) in dogs" :key="index" class="dog-card">
            <img :alt="dog.breed" :src="dog.image" class="card-image" />
            <ion-card-header>
              <ion-card-title>{{ dog.breed }}</ion-card-title>
              <ion-card-subtitle>{{ dog.subtitle }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              {{ dog.description }}
            </ion-card-content>
          </ion-card>
        </div>
        
        <h6 style="text-align: center; margin-bottom: 2%;">Todas se parecen a Angel</h6>
      </div>


 
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/vue';
import { warning } from 'ionicons/icons';
import dogsData from '@/assets/dogs.json';
import { useAuth } from '@/composable/useAuth'; // Asegúrate de tener este composable

const router = useRouter();
const { isAuthenticated, checkAuth } = useAuth();

// Cargar datos de perritas
const dogs = dogsData.map(dog => ({
  ...dog,
  image: new URL(`../assets/${dog.image}`, import.meta.url).href
}));

// Verificar autenticación al cargar
checkAuth();

const redirectToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.not-authenticated {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-card {
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  margin: 20px 0;
  color: var(--ion-color-medium);
}
</style>