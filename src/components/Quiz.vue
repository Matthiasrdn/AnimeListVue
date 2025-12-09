<template>
  <div class="quiz-page">
    <h1>Quiz AniShelf</h1>

    <div v-if="finished" class="result-box">
      <h2>Résultat</h2>
      <p>Tu as obtenu <strong>{{ score }}</strong> / {{ questions.length }}</p>

      <button class="btn primary" @click="restart">Rejouer</button>
    </div>

    <div v-else class="question-box" v-if="currentQuestion">
      <h2 class="question-title">
        Question {{ currentIndex + 1 }} / {{ questions.length }}
      </h2>

      <p class="question-text">{{ currentQuestion.question }}</p>

      <div class="choices">
        <button
          v-for="choice in currentQuestion.choices"
          :key="choice"
          class="choice-btn"
          :class="{
            correct: answered && choice === currentQuestion.answer,
            wrong: answered && choice === selected && choice !== currentQuestion.answer
          }"
          @click="selectChoice(choice)"
          :disabled="answered"
        >
          {{ choice }}
        </button>
      </div>

      <div v-if="answered" class="next-box">
        <button class="btn secondary" @click="nextQuestion">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  question: string
  choices: string[]
  answer: string
}

const QUESTIONS_PER_GAME = 10

const fullQuestions: Question[] = [
  // NARUTO
  {
    question: "Dans Naruto, qui est le Quatrième Hokage ?",
    choices: ["Hiruzen Sarutobi", "Minato Namikaze", "Tobirama Senju", "Hashirama Senju"],
    answer: "Minato Namikaze"
  },
  {
    question: "Quel démon à queues est scellé dans Naruto au début de la série ?",
    choices: ["Shukaku", "Kurama", "Gyūki", "Matatabi"],
    answer: "Kurama"
  },
  {
    question: "Quel est le nom de la technique emblématique de Naruto transmise par Jiraya ?",
    choices: ["Chidori", "Rasengan", "Raikiri", "Rasenshuriken"],
    answer: "Rasengan"
  },
  {
    question: "Lors de l'examen Chûnin, contre qui Naruto se bat-il en 1v1 dans l'arène ?",
    choices: ["Gaara", "Neji", "Kiba", "Rock Lee"],
    answer: "Neji"
  },
  {
    question: "Quel membre de l'équipe 7 maîtrise le Sharingan ?",
    choices: ["Naruto", "Sakura", "Sasuke", "Shikamaru"],
    answer: "Sasuke"
  },
  {
    question: "Quel est le vrai nom de l'organisation criminelle qui rassemble Itachi, Kisame, Pain, etc. ?",
    choices: ["Akatsuki", "Root", "Anbu Noir", "Otokage"],
    answer: "Akatsuki"
  },
  {
    question: "Quel est le lien entre Naruto et le Quatrième Hokage ?",
    choices: ["Son oncle", "Son père", "Son grand frère", "Aucun lien"],
    answer: "Son père"
  },

  // ONE PIECE
  {
    question: "Quel est le nom complet du capitaine de l'équipage du Chapeau de paille ?",
    choices: ["Monkey D. Luffy", "Portgas D. Ace", "Gol D. Roger", "Shanks Le Roux"],
    answer: "Monkey D. Luffy"
  },
  {
    question: "Quel personnage prépare les repas sur le Thousand Sunny ?",
    choices: ["Zoro", "Sanji", "Usopp", "Chopper"],
    answer: "Sanji"
  },
  {
    question: "Dans One Piece, quel est le nom de l'île où Luffy recrute Chopper ?",
    choices: ["Skypiea", "Drum", "Alabasta", "Water Seven"],
    answer: "Drum"
  },
  {
    question: "Quel membre de l'équipage utilise trois sabres en combat ?",
    choices: ["Zoro", "Brook", "Nami", "Franky"],
    answer: "Zoro"
  },
  {
    question: "Quel est le nom de l'arme antique liée à la princesse Vivi et à Alabasta ?",
    choices: ["Poseidon", "Uranus", "Pluton", "Artemis"],
    answer: "Pluton"
  },
  {
    question: "Comment s'appelle le frère adoptif de Luffy qui possède le Mera Mera no Mi ?",
    choices: ["Sabo", "Usopp", "Ace", "Law"],
    answer: "Ace"
  },

  // ATTACK ON TITAN
  {
    question: "Dans Attack on Titan, quel bataillon porte l'emblème des \"Ailes de la Liberté\" ?",
    choices: ["Brigade spéciale", "Bataillon d'exploration", "Garnison", "Police militaire intérieure"],
    answer: "Bataillon d'exploration"
  },
  {
    question: "Quel est le vrai nom de famille d'Eren ?",
    choices: ["Reiss", "Ackerman", "Yeager", "Braun"],
    answer: "Yeager"
  },
  {
    question: "Quel titan Eren possède-t-il en premier ?",
    choices: ["Titan Colossal", "Titan Cuirassé", "Titan Assaillant", "Titan Féminin"],
    answer: "Titan Assaillant"
  },
  {
    question: "Qui est le détenteur du Titan Féminin ?",
    choices: ["Mikasa", "Annie", "Historia", "Sasha"],
    answer: "Annie"
  },
  {
    question: "Comment s'appelle la ville d'origine d'Eren, Mikasa et Armin ?",
    choices: ["Shiganshina", "Trost", "Mitras", "Ragako"],
    answer: "Shiganshina"
  },
  {
    question: "Quel personnage maîtrise parfaitement l'équipement tridimensionnel et est reconnu comme un génie ?",
    choices: ["Jean", "Levi", "Connie", "Erwin"],
    answer: "Levi"
  },
  {
    question: "Quel mur est brisé en premier par le Titan Colossal ?",
    choices: ["Mur Sina", "Mur Rose", "Mur Maria", "Mur Reiss"],
    answer: "Mur Maria"
  },

  // DEMON SLAYER
  {
    question: "Dans Demon Slayer, comment s'appelle la sœur de Tanjiro ?",
    choices: ["Shinobu", "Kanao", "Mitsuri", "Nezuko"],
    answer: "Nezuko"
  },
  {
    question: "Quel souffle Tanjiro utilise-t-il principalement ?",
    choices: ["Souffle de la Foudre", "Souffle de l'Eau", "Souffle du Vent", "Souffle de la Flamme"],
    answer: "Souffle de l'Eau"
  },
  {
    question: "Quel Hashira est connu comme le Pilier de la Flamme ?",
    choices: ["Rengoku", "Tengen", "Sanemi", "Giyu"],
    answer: "Rengoku"
  },
  {
    question: "Quel démon est responsable du massacre de la famille de Tanjiro ?",
    choices: ["Akaza", "Muzan Kibutsuji", "Douma", "Enmu"],
    answer: "Muzan Kibutsuji"
  },
  {
    question: "Quel personnage combat principalement avec la Respiration de la Foudre ?",
    choices: ["Inosuke", "Zenitsu", "Tanjiro", "Genya"],
    answer: "Zenitsu"
  },
  {
    question: "Inosuke porte un masque représentant quelle créature ?",
    choices: ["Un lion", "Un renard", "Un sanglier", "Un loup"],
    answer: "Un sanglier"
  },
  {
    question: "Quelle partie du corps Nezuko doit-elle protéger pour ne pas exposer ses crocs de démon ?",
    choices: ["Ses mains", "Ses yeux", "Sa bouche", "Ses oreilles"],
    answer: "Sa bouche"
  },

  // JUJUTSU KAISEN
  {
    question: "Dans Jujutsu Kaisen, comment s'appelle l'esprit maudit dont Yuji avale un doigt ?",
    choices: ["Mahito", "Sukuna", "Jogo", "Geto"],
    answer: "Sukuna"
  },
  {
    question: "Quel enseignant de l'école d'exorcistes porte un bandeau sur les yeux ?",
    choices: ["Nanami", "Gojo", "Todo", "Mechamaru"],
    answer: "Gojo"
  },
  {
    question: "Quel type de technique Nobara Kugisaki utilise-t-elle ?",
    choices: ["Marteau et clous", "Épée maudite", "Tir à l'arc", "Poings renforcés"],
    answer: "Marteau et clous"
  },
  {
    question: "Quel personnage a une obsession étrange pour les fessiers musclés ?",
    choices: ["Itadori", "Gojo", "Todo", "Nanami"],
    answer: "Todo"
  },
  {
    question: "Quel est le nom de la technique de domaine de Gojo ?",
    choices: ["Sanctuaire de l'Ombre", "Infinie Clairvoyance", "Vide Infini", "Monde Blanc"],
    answer: "Vide Infini"
  },
  {
    question: "Quel animal est associé aux shikigami de Megumi Fushiguro au début de la série ?",
    choices: ["Chiens", "Chats", "Corbeaux", "Serpents"],
    answer: "Chiens"
  },
  {
    question: "Comment s'appelle l'organisation antagoniste qui regroupe des fléaux et des sorciers renégats ?",
    choices: ["Le Noyau Maudit", "La Coalition Noire", "Les Fléaux Unis", "Elle n'a pas de nom clair"],
    answer: "Elle n'a pas de nom clair"
  },

  // MY HERO ACADEMIA
  {
    question: "Dans My Hero Academia, comment s'appelle le héros numéro 1 au début de la série ?",
    choices: ["Endeavor", "All Might", "Hawks", "Best Jeanist"],
    answer: "All Might"
  },
  {
    question: "Quel est le vrai nom de Deku ?",
    choices: ["Katsuki Bakugo", "Shoto Todoroki", "Izuku Midoriya", "Tenya Iida"],
    answer: "Izuku Midoriya"
  },
  {
    question: "Quel héros professionnel possède le pouvoir de manipuler les flammes et la glace ?",
    choices: ["Endeavor", "Shoto Todoroki", "Dabi", "All For One"],
    answer: "Shoto Todoroki"
  },
  {
    question: "Quel est le nom du pouvoir que All Might transmet à Deku ?",
    choices: ["All For One", "One For All", "Full Cowling", "Overhaul"],
    answer: "One For All"
  },
  {
    question: "Quel est le principal rival de Deku dans la classe 1-A ?",
    choices: ["Iida", "Bakugo", "Kirishima", "Tokoyami"],
    answer: "Bakugo"
  },
  {
    question: "Quel professeur de Yuei a un alter d'effacement de pouvoir ?",
    choices: ["Present Mic", "Aizawa", "Midnight", "Ectoplasm"],
    answer: "Aizawa"
  },
  {
    question: "Quel est le nom de l'organisation criminelle menée par Tomura Shigaraki ?",
    choices: ["Ligue des Vilains", "Société des Ombres", "Nouvel Ordre", "Main du Chaos"],
    answer: "Ligue des Vilains"
  },

  // FMA BROTHERHOOD
  {
    question: "Dans Fullmetal Alchemist: Brotherhood, comment s'appellent les deux frères protagonistes ?",
    choices: ["Edward et Alphonse", "Roy et Riza", "Scar et Marcoh", "Ling et Lan Fan"],
    answer: "Edward et Alphonse"
  },
  {
    question: "Quelle tentative interdite les frères Elric ont-ils réalisée enfant ?",
    choices: ["Transmutation humaine", "Création de pierre philosophale", "Transmutation de chimère parlante", "Réveil d'un homonculus"],
    answer: "Transmutation humaine"
  },
  {
    question: "Quel membre de l'armée est surnommé le \"Flame Alchemist\" ?",
    choices: ["Maes Hughes", "Roy Mustang", "Alex Armstrong", "Kimblee"],
    answer: "Roy Mustang"
  },
  {
    question: "Quel est le nom de la pierre légendaire que tout le monde cherche ?",
    choices: ["Pierre de vie", "Pierre d'immortalité", "Pierre Rouge", "Pierre philosophale"],
    answer: "Pierre philosophale"
  },
  {
    question: "Comment s'appelle la petite alchimiste qui vit dans la région de Xing ?",
    choices: ["Lan Fan", "Mei Chang", "Izumi", "Lust"],
    answer: "Mei Chang"
  },
  {
    question: "Quel homonculus porte un X sur le front et manipule des lances ?",
    choices: ["Gluttony", "Envy", "Wrath", "Scar n'est pas un homonculus"],
    answer: "Scar n'est pas un homonculus"
  },
  {
    question: "Quel membre de la famille Armstrong est officier dans l'armée d'Amestris et très musclé ?",
    choices: ["Olivier Armstrong", "Sig Curtis", "Alex Louis Armstrong", "Buccaneer"],
    answer: "Alex Louis Armstrong"
  },

  // DEATH NOTE
  {
    question: "Dans Death Note, quel est le vrai nom de L ?",
    choices: ["Light Yagami", "L Lawliet", "Ryuk", "Near"],
    answer: "L Lawliet"
  },
  {
    question: "Comment le Death Note tue-t-il une personne si aucune cause n'est précisée ?",
    choices: ["Accident", "Crise cardiaque", "Suicide", "Maladie"],
    answer: "Crise cardiaque"
  },
  {
    question: "Quel est le nom du shinigami qui accompagne Light ?",
    choices: ["Rem", "Ryuk", "Gelus", "Sidoh"],
    answer: "Ryuk"
  },
  {
    question: "Quel pseudonyme Light utilise-t-il pour agir en tant que justicier ?",
    choices: ["L", "X", "Kira", "Zero"],
    answer: "Kira"
  },
  {
    question: "Quel personnage propose à Light l'échange des yeux de shinigami ?",
    choices: ["Ryuk", "Rem", "Misa", "Near"],
    answer: "Ryuk"
  },
  {
    question: "Quel détective succède à L dans l'enquête sur Kira ?",
    choices: ["Near et Mello", "Matsuda", "Watari", "Soichiro"],
    answer: "Near et Mello"
  },
  {
    question: "Dans Death Note, que doit-on connaître d'une personne pour la tuer avec le carnet ?",
    choices: ["Son adresse", "Son nom complet", "Son visage et son nom", "Sa date de naissance"],
    answer: "Son visage et son nom"
  },

  // HUNTER X HUNTER
  {
    question: "Dans Hunter x Hunter, quel est l'objectif principal de Gon ?",
    choices: ["Devenir Hokage", "Trouver le One Piece", "Retrouver son père", "Devenir alchimiste d'État"],
    answer: "Retrouver son père"
  },
  {
    question: "Quel est le meilleur ami de Gon rencontré lors de l'examen Hunter ?",
    choices: ["Kurapika", "Killua", "Leorio", "Hisoka"],
    answer: "Killua"
  },
  {
    question: "À quel clan appartient Kurapika ?",
    choices: ["Clan Uchiha", "Clan Kurta", "Clan Zoldyck", "Clan Ackerman"],
    answer: "Clan Kurta"
  },
  {
    question: "Quel est le nom de la famille d'assassins de Killua ?",
    choices: ["Famille Phantom", "Famille Kurta", "Famille Zoldyck", "Famille York"],
    answer: "Famille Zoldyck"
  },
  {
    question: "Quel antagoniste a une obsession malsaine pour Gon et aime se battre contre les plus forts ?",
    choices: ["Chrollo", "Hisoka", "Meruem", "Illumi"],
    answer: "Hisoka"
  },
  {
    question: "Quel type de Nen Gon apprend-il principalement ?",
    choices: ["Émission", "Transformation", "Renforcement", "Spécialisation"],
    answer: "Renforcement"
  },
  {
    question: "Dans l'arc Greed Island, sur quel support se trouve le jeu ?",
    choices: ["Cartouche NES", "CD-ROM", "Jeu VR", "Jeu de cartes IRL"],
    answer: "CD-ROM"
  },

  // HAIKYUU
  {
    question: "Dans Haikyuu!!, quel poste occupe Kageyama ?",
    choices: ["Central", "Libero", "Passeur", "Receveur"],
    answer: "Passeur"
  },
  {
    question: "Quel surnom Hinata reçoit-il en référence à un ancien joueur de Karasuno ?",
    choices: ["Petit géant", "As du ciel", "Tigre bondissant", "Corbeau blanc"],
    answer: "Petit géant"
  },
  {
    question: "Quel club affronte Karasuno lors d'un match emblématique au début de la série ?",
    choices: ["Aoba Johsai", "Date Tech", "Nekoma", "Fukurodani"],
    answer: "Aoba Johsai"
  },
  {
    question: "Qui est le libero de Karasuno ?",
    choices: ["Tsukishima", "Nishinoya", "Daichi", "Asahi"],
    answer: "Nishinoya"
  },
  {
    question: "Quel est le sport pratiqué dans Haikyuu!! ?",
    choices: ["Basket-ball", "Football", "Baseball", "Volley-ball"],
    answer: "Volley-ball"
  },
  {
    question: "Quel est le principal défaut de Hinata au début de la série ?",
    choices: ["Trop petit", "Mauvaise vue", "Manque de puissance", "Peur du ballon"],
    answer: "Trop petit"
  },
  {
    question: "Quel duo est connu pour leurs attaques rapides synchronisées ?",
    choices: ["Daichi et Suga", "Hinata et Kageyama", "Tsukki et Yamaguchi", "Asahi et Nishinoya"],
    answer: "Hinata et Kageyama"
  },

  // TOKYO GHOUL
  {
    question: "Dans Tokyo Ghoul, comment s'appelle le protagoniste principal ?",
    choices: ["Kaneki Ken", "Arima Kishou", "Amon Koutarou", "Touka Kirishima"],
    answer: "Kaneki Ken"
  },
  {
    question: "Que devient Kaneki après son opération ?",
    choices: ["Un inspecteur du CCG", "Un ghoul", "Un shinigami", "Un exorciste"],
    answer: "Un ghoul"
  },
  {
    question: "Quel café sert de refuge aux ghouls bienveillants ?",
    choices: ["Café Latte", "Café Dove", "Café Anteiku", "Café Ghoul"],
    answer: "Café Anteiku"
  },
  {
    question: "Quel organe est transplanté à Kaneki, le transformant en ghoul ?",
    choices: ["Un rein", "Un oeil", "Un poumon", "Un estomac"],
    answer: "Un oeil"
  },
  {
    question: "Comment s'appelle l'organisation qui traque les ghouls ?",
    choices: ["CCG", "Jujutsu High", "NERV", "Amestris"],
    answer: "CCG"
  },
  {
    question: "Quel est le nom de la ghoul aux cheveux violets qui s'intéresse de près à Kaneki ?",
    choices: ["Touka", "Rize", "Hinami", "Eto"],
    answer: "Rize"
  },
  {
    question: "Quel est le nom de code de Kaneki lorsqu'il devient plus violent et prend une nouvelle identité ?",
    choices: ["Centipede", "Eyepatch", "Black Reaper", "Haise Sasaki"],
    answer: "Centipede"
  },

  // SWORD ART ONLINE
  {
    question: "Dans Sword Art Online, comment s'appelle le protagoniste principal ?",
    choices: ["Kirito", "Klein", "Agil", "Eugeo"],
    answer: "Kirito"
  },
  {
    question: "Comment s'appelle le premier jeu VRMMO mortel dans lequel les joueurs sont piégés ?",
    choices: ["ALO", "GGO", "SAO", "Underworld"],
    answer: "SAO"
  },
  {
    question: "Quel est le véritable nom de Kirito ?",
    choices: ["Kazuto Kirigaya", "Kirigaya Kira", "Akihiko Kayaba", "Kazuma Satou"],
    answer: "Kazuto Kirigaya"
  },
  {
    question: "Dans SAO, que se passe-t-il si un joueur meurt dans le jeu ?",
    choices: ["Il respawn à la ville de départ", "Il perd tout son équipement", "Il meurt aussi dans la réalité", "Il reste coincé en spectateur"],
    answer: "Il meurt aussi dans la réalité"
  },
  {
    question: "Comment s'appelle la guilde dirigée par Asuna dans le jeu SAO ?",
    choices: ["Knights of Blood", "Laughing Coffin", "Sleeping Knights", "Blue Radiance"],
    answer: "Knights of Blood"
  },
  {
    question: "Dans Gun Gale Online (GGO), quel type d'arme Kirito utilise-t-il principalement ?",
    choices: ["Fusil de sniper", "Double pistolet", "Épée laser", "Lance-roquettes"],
    answer: "Épée laser"
  },
  {
    question: "Quel est le rôle d'Akihiko Kayaba dans SAO ?",
    choices: ["Simple joueur", "Créateur du jeu", "Hacker externe", "Modérateur bénévole"],
    answer: "Créateur du jeu"
  }
]

const questions = ref<Question[]>([])
const currentIndex = ref(0)
const selected = ref<string | null>(null)
const answered = ref(false)
const score = ref(0)
const finished = ref(false)

function shuffle<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function initGame() {
  const shuffled = shuffle(fullQuestions)
  questions.value = shuffled.slice(0, QUESTIONS_PER_GAME)
  currentIndex.value = 0
  selected.value = null
  answered.value = false
  finished.value = false
  score.value = 0
}

const currentQuestion = computed(() => questions.value[currentIndex.value])

function selectChoice(choice: string) {
  if (answered.value || !currentQuestion.value) return
  selected.value = choice
  answered.value = true
  if (choice === currentQuestion.value.answer) {
    score.value++
  }
}

function nextQuestion() {
  if (currentIndex.value >= questions.value.length - 1) {
    finished.value = true
  } else {
    currentIndex.value++
    selected.value = null
    answered.value = false
  }
}

function restart() {
  initGame()
}

initGame()
</script>

<style scoped>
.quiz-page {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.2rem;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.question-box,
.result-box {
  background: radial-gradient(circle at top, #1f2937, #020617);
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(244, 114, 182, 0.3);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
}

.question-title {
  font-size: 1rem;
  color: #9ca3af;
}

.question-text {
  margin: 12px 0 18px;
  font-size: 1.1rem;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-btn {
  background: #111827;
  border: 1px solid rgba(148, 163, 184, 0.4);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  color: #e5e7eb;
}

.choice-btn:hover {
  border-color: rgba(244, 114, 182, 0.8);
}

.correct {
  background: rgba(34, 197, 94, 0.25);
  border-color: #22c55e !important;
  color: #22c55e !important;
}

.wrong {
  background: rgba(239, 68, 68, 0.25);
  border-color: #ef4444 !important;
  color: #ef4444 !important;
}

.next-box {
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn.primary {
  background: linear-gradient(135deg, #fb7185, #f9a8d4);
  color: #111827;
}

.btn.secondary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #eef2ff;
}
</style>
