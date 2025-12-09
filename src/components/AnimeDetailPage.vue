<template>
  <div class="detail-page" v-if="anime">
    <div class="layout">
      <div class="poster-wrapper" v-if="anime.imageUrl">
        <img :src="anime.imageUrl" :alt="`Affiche de ${anime.title}`" class="poster" />
      </div>

      <div class="info">
        <h1 class="title">{{ anime.title }}</h1>

        <p class="description">
          {{ anime.description }}
        </p>

        <div class="meta-grid">
          <div class="meta-item">
            <span class="meta-label">Année</span>
            <span class="meta-value">{{ anime.year }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Type</span>
            <span class="meta-value">{{ anime.type }}</span>
          </div>
          <div class="meta-item" v-if="anime.episodes !== null">
            <span class="meta-label">Épisodes</span>
            <span class="meta-value">{{ anime.episodes }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Statut</span>
            <span class="meta-value">{{ anime.status }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Durée</span>
            <span class="meta-value">{{ anime.durationPerEpisode }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Âge conseillé</span>
            <span class="meta-value">{{ anime.ageRating }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Studio</span>
            <span class="meta-value">{{ anime.studio }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Origine</span>
            <span class="meta-value">{{ anime.origin }}</span>
          </div>
        </div>

        <div class="chips-group">
          <div class="chips-block" v-if="anime.genres.length">
            <div class="chips-label">Genres</div>
            <div class="chips">
              <span v-for="g in anime.genres" :key="g" class="chip">{{ g }}</span>
            </div>
          </div>

          <div class="chips-block" v-if="anime.themes.length">
            <div class="chips-label">Thèmes</div>
            <div class="chips">
              <span v-for="t in anime.themes" :key="t" class="chip chip-theme">{{ t }}</span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="btn secondary" @click="$router.back()">
            Retour
          </button>
          <button class="btn primary" @click="$router.push('/catalog')">
            Retour au catalogue
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="detail-page">
    <div class="empty">
      <p class="empty-text">Animé introuvable.</p>
      <button class="btn primary" @click="$router.push('/catalog')">
        Retour au catalogue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { animeCatalog, type Anime } from '../data/animeCatalog'

const route = useRoute()

const anime = computed<Anime | undefined>(() => {
  const id = Number(route.params.id)
  return animeCatalog.find(a => a.id === id)
})
</script>

<style scoped>
.detail-page {
  max-width: 960px;
  margin: 32px auto;
  padding: 24px;
  border-radius: 18px;
  background: radial-gradient(circle at top, #1f2937, #020617);
  border: 1px solid rgba(244, 114, 182, 0.25);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.8);
  color: #f9fafb;
}

.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.poster-wrapper {
  flex: 0 0 260px;
  max-width: 260px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85);
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.25s ease;
}

.poster-wrapper:hover .poster {
  transform: scale(1.06);
}

.info {
  flex: 1;
  min-width: 250px;
}

.title {
  margin: 0 0 10px;
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.description {
  margin: 0 0 18px;
  font-size: 0.95rem;
  color: #e5e7eb;
  opacity: 0.95;
  line-height: 1.6;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px 16px;
  margin-bottom: 14px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
}

.meta-value {
  font-size: 0.88rem;
}

.chips-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.chips-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chips-label {
  font-size: 0.8rem;
  color: #9ca3af;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.7);
}

.chip-theme {
  border-color: rgba(244, 114, 182, 0.8);
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}

.btn.primary {
  background: linear-gradient(135deg, #fb7185, #f9a8d4);
  color: #111827;
  box-shadow: 0 10px 30px rgba(249, 168, 212, 0.45);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(249, 168, 212, 0.55);
}

.btn.secondary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #eef2ff;
}

.btn.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(99, 102, 241, 0.35);
}

.empty {
  text-align: center;
}

.empty-text {
  margin-bottom: 16px;
  color: #e5e7eb;
}

@media (max-width: 640px) {
  .detail-page {
    margin: 16px;
    padding: 18px;
  }

  .poster-wrapper {
    margin: 0 auto;
  }

  .title {
    text-align: center;
  }

  .description {
    text-align: left;
  }

  .actions {
    justify-content: center;
  }
}
</style>
