<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="navbar">
      <button class="brand" @click="$router.push('/')">
        AniShelf
      </button>
      <nav>
        <RouterLink to="/catalog">Catalogue</RouterLink>
        <RouterLink to="/my-list">Ma liste</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #111;
  border-bottom: 1px solid #333;
  position: relative;
}


.brand {
  background: none;
  border: none;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f5f5f5;
  cursor: pointer;
  padding: 6px 8px;
  transition: 0.2s ease;
}

.brand:hover {
  color: #22c55e;
}


.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.4rem;
}


nav {
  display: flex;
  gap: 18px;
}

nav a {
  color: #ddd;
  text-decoration: none;
  font-size: 0.95rem;
  transition: 0.2s;
}

nav a:hover {
  color: #22c55e;
}

nav a.router-link-active {
  color: #22c55e;
  font-weight: 600;
}


.content {
  padding: 24px;
  min-height: calc(100vh - 60px);
}
</style>
