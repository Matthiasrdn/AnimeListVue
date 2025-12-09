import narutoImg from '../assets/anime/naruto.jpg'
import onePieceImg from '../assets/anime/one-piece.jpg'
import aotImg from '../assets/anime/aot.jpg'
import demonSlayerImg from '../assets/anime/demon-slayer.jpg'
import jjkImg from '../assets/anime/jjk.jpg'
import mhaImg from '../assets/anime/mha.jpg'
import fmaImg from '../assets/anime/fma.jpg'
import deathNoteImg from '../assets/anime/death-note.jpg'
import hxhImg from '../assets/anime/hxh.jpg'
import haikyuuImg from '../assets/anime/haikyuu.jpg'
import tokyoGhoulImg from '../assets/anime/tokyo-ghoul.jpg'
import saoImg from '../assets/anime/sao.jpg'

export interface Anime {
    id: number
    title: string
    description: string
    imageUrl: string

    year: number
    type: 'Série' | 'Film'
    episodes: number | null
    status: 'En cours' | 'Terminé'
    genres: string[]
    themes: string[]
    studio: string
    origin: string
    ageRating: string
    durationPerEpisode: string
}

export const animeCatalog: Anime[] = [
    {
        id: 1,
        title: 'Naruto',
        description: "Un ninja qui rêve de devenir Hokage et d'être reconnu par son village.",
        imageUrl: narutoImg,

        year: 2002,
        type: 'Série',
        episodes: 220,
        status: 'Terminé',
        genres: ['Action', 'Aventure', 'Ninja'],
        themes: ['Rivalité', 'Amitié', 'Détermination'],
        studio: 'Studio Pierrot',
        origin: 'Manga',
        ageRating: '12+',
        durationPerEpisode: '24 min'
    },
    {
        id: 2,
        title: 'One Piece',
        description: 'Luffy veut devenir Roi des pirates et trouver le One Piece.',
        imageUrl: onePieceImg,

        year: 1999,
        type: 'Série',
        episodes: null,
        status: 'En cours',
        genres: ['Action', 'Aventure', 'Fantaisie'],
        themes: ['Pirates', 'Rêve', 'Exploration'],
        studio: 'Toei Animation',
        origin: 'Manga',
        ageRating: '12+',
        durationPerEpisode: '24 min'
    },
    {
        id: 3,
        title: 'Attack on Titan',
        description: "L'humanité se bat contre des titans mangeurs d'hommes.",
        imageUrl: aotImg,

        year: 2013,
        type: 'Série',
        episodes: 87,
        status: 'Terminé',
        genres: ['Action', 'Drame', 'Dark Fantasy'],
        themes: ['Guerre', 'Mystère', 'Survie'],
        studio: 'Wit Studio / MAPPA',
        origin: 'Manga',
        ageRating: '16+',
        durationPerEpisode: '24 min'
    },
    {
        id: 4,
        title: 'Demon Slayer',
        description: 'Tanjiro devient pourfendeur de démons pour sauver sa sœur.',
        imageUrl: demonSlayerImg,

        year: 2019,
        type: 'Série',
        episodes: null,
        status: 'En cours',
        genres: ['Action', 'Fantastique'],
        themes: ['Démons', 'Famille', 'Vengeance'],
        studio: 'ufotable',
        origin: 'Manga',
        ageRating: '15+',
        durationPerEpisode: '24 min'
    },
    {
        id: 5,
        title: 'Jujutsu Kaisen',
        description: 'Itadori ingère un doigt maudit et rejoint les exorcistes de fléaux.',
        imageUrl: jjkImg,

        year: 2020,
        type: 'Série',
        episodes: null,
        status: 'En cours',
        genres: ['Action', 'Surnaturel'],
        themes: ['Malédictions', 'Démons', 'École de sorciers'],
        studio: 'MAPPA',
        origin: 'Manga',
        ageRating: '16+',
        durationPerEpisode: '24 min'
    },
    {
        id: 6,
        title: 'My Hero Academia',
        description: "Dans un monde de héros, Deku veut devenir le numéro 1 malgré sa naissance sans alter.",
        imageUrl: mhaImg,

        year: 2016,
        type: 'Série',
        episodes: null,
        status: 'En cours',
        genres: ['Action', 'Super-héros'],
        themes: ['Pouvoirs', 'Héroïsme', 'École'],
        studio: 'Bones',
        origin: 'Manga',
        ageRating: '12+',
        durationPerEpisode: '24 min'
    },
    {
        id: 7,
        title: 'Fullmetal Alchemist: Brotherhood',
        description: 'Deux frères alchimistes cherchent la pierre philosophale après une transmutation ratée.',
        imageUrl: fmaImg,

        year: 2009,
        type: 'Série',
        episodes: 64,
        status: 'Terminé',
        genres: ['Action', 'Aventure', 'Fantaisie'],
        themes: ['Alchimie', 'Fraternité', 'Politique'],
        studio: 'Bones',
        origin: 'Manga',
        ageRating: '14+',
        durationPerEpisode: '24 min'
    },
    {
        id: 8,
        title: 'Death Note',
        description: 'Light trouve un carnet qui permet de tuer en écrivant le nom des gens.',
        imageUrl: deathNoteImg,

        year: 2006,
        type: 'Série',
        episodes: 37,
        status: 'Terminé',
        genres: ['Thriller', 'Surnaturel'],
        themes: ['Justice', 'Manipulation', 'Psychologie'],
        studio: 'Madhouse',
        origin: 'Manga',
        ageRating: '16+',
        durationPerEpisode: '23 min'
    },
    {
        id: 9,
        title: 'Hunter x Hunter',
        description: 'Gon souhaite devenir Hunter et retrouver son père.',
        imageUrl: hxhImg,

        year: 2011,
        type: 'Série',
        episodes: 148,
        status: 'Terminé',
        genres: ['Action', 'Aventure'],
        themes: ['Exploration', 'Amitié', 'Compétition'],
        studio: 'Madhouse',
        origin: 'Manga',
        ageRating: '12+',
        durationPerEpisode: '23 min'
    },
    {
        id: 10,
        title: 'Haikyuu!!',
        description: 'Hinata rêve de devenir un grand joueur de volley malgré sa petite taille.',
        imageUrl: haikyuuImg,

        year: 2014,
        type: 'Série',
        episodes: null,
        status: 'En cours',
        genres: ['Sport', 'Comédie', 'Drame'],
        themes: ['Équipe', 'Dépassement de soi', 'Rivalité'],
        studio: 'Production I.G',
        origin: 'Manga',
        ageRating: '10+',
        durationPerEpisode: '24 min'
    },
    {
        id: 11,
        title: 'Tokyo Ghoul',
        description: 'Kaneki devient mi-humain mi-goule après une transplantation inattendue.',
        imageUrl: tokyoGhoulImg,

        year: 2014,
        type: 'Série',
        episodes: 24,
        status: 'Terminé',
        genres: ['Dark Fantasy', 'Horreur'],
        themes: ['Dualité', 'Identité', 'Société'],
        studio: 'Studio Pierrot',
        origin: 'Manga',
        ageRating: '16+',
        durationPerEpisode: '24 min'
    },
    {
        id: 12,
        title: 'Sword Art Online',
        description: 'Des joueurs sont piégés dans un MMORPG mortel où la mort in-game est définitive.',
        imageUrl: saoImg,

        year: 2012,
        type: 'Série',
        episodes: null,
        status: 'En cours',
        genres: ['Action', 'Sci-Fi', 'Romance'],
        themes: ['VR', 'MMORPG', 'Survie'],
        studio: 'A-1 Pictures',
        origin: 'Light Novel',
        ageRating: '12+',
        durationPerEpisode: '24 min'
    }
]
