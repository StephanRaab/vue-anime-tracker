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
  <div>
    <main>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
      <h1>Vue Anime Tracker</h1>

      <form @submit.prevent="searchAnime">
        <input type="text" placeholder="search for an anime..." v-model="query" @input="handleInput" />
        <button type="submit">Search</button>
      </form>
    </main>

    <div v-if="search_results" class="anime-search-results">
      <div class="search-result" v-for="anime in search_results" :key="anime.mal_id">
        <img :src="anime.images.jpg.image_url" />
        <div class="details">
          <h3>{{ anime.title }}</h3>
          <pre :title="anime.synopsis" v-if="anime.synopsis">{{ anime.synopsis }}</pre>
          <span class="flex-1" />
          <button @click="addAnime(anime)">Add to My Anime</button>
        </div>
      </div>
    </div>

    <section>
      <h2>My Anime</h2>

      <div class="my-anime-container">
        <div v-for="anime in my_anime_asc" :key="anime.id">
          <img :src="anime.img" />
          <h3>{{ anime.title }}</h3>

          <div class="flex-1"></div>

          <div class="anime-progress">
            <span>Progress: {{ anime.watched_episodes }}/{{ anime.total_episodes }}</span>

            <button :disabled="anime.watched_episodes == 0" class="decrement-btn" @click="decrementWatchCount(anime)">-</button>
            <button :disabled="anime.watched_episodes == anime.total_episodes" class="increment-btn"
              @click="incrementWatchCount(anime)">+</button>

            <button class="delete-btn" @click="deleteAnime(anime)">Delete</button>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #eeeeee; 
}

main {
  margin: 0 auto;
  max-width: 768px;
  padding: 1.5rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
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

.search-btn {
  cursor: pointer;
}
</style>
