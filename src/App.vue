<template>
  <div>
    <h1>Mes animés</h1>

    <input v-model="newAnime" placeholder="Ajouter un animé" />
    <button @click="addAnime">Ajouter</button>

    <ul>
      <li v-for="anime in animes" :key="anime">
        {{ anime }}
        <button @click="animes = animes.filter(a => a !== anime)">X</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue"

const animes = ref([
  "Naruto",
  "One Piece",
  "Attack on Titan"
])

const newAnime = ref("")

function addAnime() {
  if (newAnime.value.trim() === "") return
  animes.value.push(newAnime.value)
  newAnime.value = ""
}
</script>
