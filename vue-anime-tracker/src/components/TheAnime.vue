<script setup>
import { ref, computed, onMounted } from 'vue'

const query = ref('')
const my_anime = ref([])
const search_results = ref([])

const my_anime_asc = computed(() => {
  return [...my_anime.value].sort((a, b) => {
    return b.date_added - a.date_added; // show newest added first
  })
})

const searchAnime = () => {
  const url = `https://api.jikan.moe/v4/anime?q=${query.value}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      search_results.value = res.data
    })
}

const handleInput = e => {
  if (!e.target.value) {
    // if input field is cleared, set search to empty array
    search_results.value = []
  }
}

const addAnime = anime => {
  // close search box when we add anime
  search_results.value = []
  query.value = ''

  const exists = my_anime.value.some(a => a.id === anime.mal_id);

  if (!exists) {
    // https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
    my_anime.value.push({
      id: anime.mal_id,
      title: anime.title,
      img: anime.images.jpg.image_url,
      watched_episodes: 0,
      total_episodes: anime.episodes,
      date_added: Date.now(),
      isCompleted: false
    })

    localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
  } else {
    alert(`${anime.title} is already in your list.`);
  }
}

const deleteAnime = anime => {
  const index = my_anime.value.findIndex(a => a.id === anime.id)
  my_anime.value.splice(index, 1)

  localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
}

const incrementWatchCount = anime => {
  anime.watched_episodes++;
  localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
}

const decrementWatchCount = anime => {
  anime.watched_episodes--;
  localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
}

// const completeAnime

onMounted(() => {
  my_anime.value = JSON.parse(localStorage.getItem('my_anime')) || []
})
</script>

<template>
    <main>
      <h1><img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />ue Anime Tracker</h1>

      <form @submit.prevent="searchAnime">
        <input type="text" placeholder="search for an anime..." v-model="query" @input="handleInput" />
        <button type="submit" class="btn">SEARCH</button>
      </form>

        <!-- search-container -->
    <div v-if="search_results" class="search-results">
      <div class="single-search-result" v-for="anime in search_results" :key="anime.mal_id">
        <img :src="anime.images.jpg.image_url" />
        <div class="details">
          <h3>{{ anime.title }} -- [{{ anime.episodes }} episodes]</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">{{ anime.synopsis.slice(0, 120) }}...</p>
          <span class="flex-1" />
          <button @click="addAnime(anime)" class="btn">Add to My Anime</button>
        </div>
      </div>
    </div>

    <!-- anime-container -->
      <div class="my-anime-container" v-if="my_anime.length > 0">
        <h2>My Anime</h2>
        <div v-for="anime in my_anime_asc" :key="anime.id" class="anime">
          <img :src="anime.img" />
          <h3>{{ anime.title }}</h3>

          <div class="flex-1"></div>

            <span class="progress">Progress: {{ anime.watched_episodes }}/{{ anime.total_episodes }}</span>

            <button :disabled="anime.watched_episodes == 0" class="btn" @click="decrementWatchCount(anime)">-</button>
            <button :disabled="anime.watched_episodes == anime.total_episodes" class="btn"
              @click="incrementWatchCount(anime)">+</button>
            <button class="btn delete-btn" @click="deleteAnime(anime)">Delete</button>
        </div>
      </div>
    </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  max-width: 768px;
  padding: 1.5rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

form {
  display: flex;
  max-width: 480px;
  margin: 0 auto 1.5rem;
}

form input {
  appearance: none;
  outline: none;
  border: none;
  background: #ffffff;
  display: block;
  color: #888;
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  width: 100%;
}

.btn {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
  display: block;
  padding: 0.5rem 1rem;
  font-weight: 700;
  color: #ffffff;
  background-image: linear-gradient(to right, #3FBA84 50%, #30485E 50%);
  transition: 0.4s;
  background-size: 200%;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.btn:hover {
  background-position: right;
}

.btn:disabled {
  opacity: 0.5; /* reduce opacity to indicate disabled state */
  cursor: not-allowed; /* change cursor to indicate disabled state */
}

.btn:disabled:hover {
  background-position:0
}

.delete-btn {
  background-image: linear-gradient(to right, #ba3f5e 50%, #eb46cc 50%);
}

.search-results {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-height: 480px;
  overflow-y: scroll;
  margin-bottom: 1.5rem;
}

.single-search-result {
  display: flex;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #cccccc;
  border-radius: 0.5rem;
  transition: 0.4s;
}

.single-search-result img {
  width: 150px;
  border-radius: 1rem;
  margin-right: 1rem;
}

.details {
  flex: 1 1 0%; /* make sure it keeps its sizing */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.flex-1 {
  flex: 1 1 0%;
}

.details h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.details p {
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.4;
}

.details button {
  margin-left: auto;
}

.my-anime-container h2{
  color: #888;
  font-weight: 400;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.my-anime-container .anime {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1)
}

.anime img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 1rem;
}

.anime h3 {
  color: #666;
  font-size: 1.3rem;
}

.anime .progress {
  margin-right: 1rem;
  color: #777;
}

.anime .btn:first-of-type {
  margin-right: 0.5rem;
}

.anime .btn:last-of-type {
  margin-left: 1rem;
  margin-right: 0;
}
</style>
