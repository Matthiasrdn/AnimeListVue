import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AnimePage from '../components/AnimePage.vue'
import AnimeDetailPage from '../components/AnimeDetailPage.vue'
import MyListPage from '../components/MyListPage.vue'
import QuizPage from '../components/Quiz.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/catalog', component: AnimePage },
        { path: '/my-list', component: MyListPage },
        { path: '/animes/:id', component: AnimeDetailPage },
        { path: '/quiz', component: QuizPage }
    ]
})

export default router
