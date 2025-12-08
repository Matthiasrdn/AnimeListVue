import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AnimePage from '../components/AnimePage.vue'       // catalogue
import AnimeDetailPage from '../components/AnimeDetailPage.vue'
import MyListPage from '../components/MyListPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/catalog', component: AnimePage },
        { path: '/my-list', component: MyListPage },
        { path: '/animes/:id', component: AnimeDetailPage }
    ]
})

export default router
