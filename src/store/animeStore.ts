import { ref } from 'vue'
import { animeCatalog } from '../data/animeCatalog'
import type { Anime } from '../data/animeCatalog'

const catalog = ref<Anime[]>(animeCatalog)
const myList = ref<Anime[]>([])

export function useAnimeStore() {
    function addToList(anime: Anime) {
        const exists = myList.value.some(a => a.id === anime.id)
        if (!exists) {
            myList.value.push(anime)
        }
    }

    function removeFromList(id: number) {
        myList.value = myList.value.filter(a => a.id !== id)
    }

    return {
        catalog,
        myList,
        addToList,
        removeFromList
    }
}
