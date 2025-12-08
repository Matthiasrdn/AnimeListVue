<template>
  <div class="page">
    <h1>Catalogue d'animés</h1>

    <div class="cards">
      <div
        v-for="anime in catalog"
        :key="anime.id"
        class="card"
      >
        <h2>{{ anime.title }}</h2>
        <p class="rating">{{ anime.rating }} / 10</p>
        <p class="description">
          {{ anime.description }}
        </p>

        <div class="actions">
          <button @click="addToList(anime)">Ajouter à ma liste</button>
          <button @click="goToDetail(anime.id)">Voir la fiche</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAnimeStore } from '../store/animeStore'
import type { Anime } from '../data/animeCatalog'

const router = useRouter()
const { catalog, addToList } = useAnimeStore()

function goToDetail(id: number) {
  router.push(`/animes/${id}`)
}
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.card {
  background: #ffffff;
  color: #111;
  border-radius: 10px;
  padding: 12px;
}

.rating {
  color: #e67e22;
  font-weight: 600;
  margin-bottom: 4px;
}

.description {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
}

button:first-child {
  background: #22c55e;
  color: #111;
}

button:last-child {
  background: #2563eb;
  color: #fff;
}
</style>
