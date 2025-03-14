<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perritas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="presentacion" style="text-align: center; margin: 3% 20px 2%  ;">
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
    <h6 style="text-align: center; margin-bottom: 2%;"> todas se parecen a angel </h6>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import dogsData from '@/assets/dogs.json';

const dogs = dogsData.map(dog => ({
  ...dog,
  image: new URL(`../assets/${dog.image}`, import.meta.url).href
}));
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.dog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  height: 200px; /* Ajusta la altura de la imagen */
  object-fit: contain ; /* Asegura que la imagen cubra el espacio sin distorsionarse */
  background-color: white;
}

.divider {
  height: 2px;
  background-color: #faa404;
  margin: 20px auto;
  border-radius: 1px;
  width: 30%;
}

ion-card-content {
  flex-grow: 1; /* Asegura que el contenido ocupe el espacio restante */
}
</style>