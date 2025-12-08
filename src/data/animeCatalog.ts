export interface Anime {
    id: number
    title: string
    description: string
    rating: number
}

export const animeCatalog: Anime[] = [
    {
        id: 1,
        title: 'Naruto',
        description: "Un ninja qui rêve de devenir Hokage et d'être reconnu par son village.",
        rating: 8
    },
    {
        id: 2,
        title: 'One Piece',
        description: 'Luffy veut devenir Roi des pirates et trouver le One Piece.',
        rating: 10
    },
    {
        id: 3,
        title: 'Attack on Titan',
        description: "L'humanité se bat contre des titans mangeurs d'hommes.",
        rating: 9
    },
    {
        id: 4,
        title: 'Demon Slayer',
        description: 'Tanjiro devient pourfendeur de démons pour sauver sa sœur.',
        rating: 8
    }
]
