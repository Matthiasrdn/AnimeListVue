<template>
  <div class="page">
    <h1>Ma liste</h1>

    <p v-if="myList.length === 0" class="empty">
      Vous n'avez encore ajouté aucun animé depuis le catalogue.
    </p>

    <ul v-else class="list">
      <li v-for="anime in myList" :key="anime.id">
        <div>
          <strong>{{ anime.title }}</strong>
          <span class="rating">{{ anime.rating }} / 10</span>
        </div>
        <div class="actions">
          <button @click="goToDetail(anime.id)">Voir</button>
          <button class="remove" @click="removeFromList(anime.id)">Retirer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAnimeStore } from '../store/animeStore'

const router = useRouter()
const { myList, removeFromList } = useAnimeStore()

function goToDetail(id: number) {
  router.push(`/animes/${id}`)
}
</script>

<style scoped>
.page {
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.empty {
  text-align: center;
  color: #aaa;
}

.list {
  list-style: none;
  padding-left: 0;
}

.list li {
  background: #262626;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  margin-left: 8px;
  color: #e67e22;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 5px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
}

button:not(.remove) {
  background: #2563eb;
  color: white;
}

button.remove {
  background: #ef4444;
  color: white;
}
</style>
