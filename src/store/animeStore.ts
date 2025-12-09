import { ref } from 'vue'
import { animeCatalog } from '../data/animeCatalog'
import type { Anime } from '../data/animeCatalog'

export interface MyListItem {
    id: number
    title: string
    imageUrl: string
    note: number
    comment: string
}

const catalog = ref<Anime[]>(animeCatalog)
const myList = ref<MyListItem[]>([])

function addToListWithNote(anime: Anime, note: number, comment: string) {
    const existing = myList.value.find(a => a.id === anime.id)

    if (existing) {
        existing.note = note
        existing.comment = comment
    } else {
        myList.value.push({
            id: anime.id,
            title: anime.title,
            imageUrl: anime.imageUrl,
            note,
            comment
        })
    }
}

function removeFromList(id: number) {
    myList.value = myList.value.filter(a => a.id !== id)
}

export function useAnimeStore() {
    return {
        catalog,
        myList,
        addToListWithNote,
        removeFromList
    }
}
