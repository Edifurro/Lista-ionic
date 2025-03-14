<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gatitas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="presentacion" style="text-align: center; margin: 3% 20px 2%  ;">
        <p>
          En esta página encontrarás una lista de gatitas con sus respectivas imágenes y descripciones.
        </p>
        <hr class="divider" />
      </div>
      <div class="card-container">
        <ion-card v-for="(cat, index) in cats" :key="index" class="cat-card">
          <img :alt="cat.breed" :src="cat.image" class="card-image" />
          <ion-card-header>
            <ion-card-title>{{ cat.breed }}</ion-card-title>
            <ion-card-subtitle>{{ cat.subtitle }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            {{ cat.description }}
          </ion-card-content>
        </ion-card>
        <p style="text-align: center; margin: 10% auto 1px;"> todas las gatitas maullan igual que angel miau </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import catsData from '@/assets/cats.json'; // Asegúrate de que el archivo JSON esté en la carpeta correcta

const cats = catsData.map(cat => ({
  ...cat,
  image: new URL(`../assets/${cat.image}`, import.meta.url).href
}));
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.cat-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  height: 200px; /* Ajusta la altura de la imagen */
  object-fit: contain; /* Asegura que la imagen cubra el espacio sin distorsionarse */
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