<script setup>
import {ref, computed, onMounted} from 'vue'

const query = ref('')
const my_anime = ref([])
const search_results = ref([])

const my_anime_asc = computed(() => {
  return my_anime.value.sort((a, b) => {
    return a.date_added.localeCompare(b.date_added)
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
    // if input field empty, set search to empty array
    search_results.value = []
  }
}

const addAnime = anime => {
  // close search box when we add anime
  search_results.value = []
  query.value = ''

  // https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch
  my_anime.value.push({
    id: anime.mal_id,
    title: anime.title,
    img: anime.images.jpg.small_image_url,
    watched_episodes: 0,
    total_episodes: anime.episodes,
    date_added: Date.now(),
    isCompleted: false
  })

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
// const deleteAnime
// const completeAnime

onMounted(() => {
  my_anime.value = JSON.parse(localStorage.getItem('my_anime')) || []
})
</script>

<template>
  <main>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40" height="40"/>
    <h1>Vue Anime Tracker</h1>

    <form @submit.prevent="searchAnime">
      <input 
      type="text"  
      placeholder="search for an anime..."
      v-model="query"
      @input="handleInput"
      /> 
      <button type="submit">Search</button>
    </form>
  </main>

  <div v-if="search_results" class="anime-search-results">
    <div class="search-result" v-for="anime in search_results" :key="anime.mal_id">
      <img :src="anime.images.jpg.small_image_url"/>
      <div class="details">
        <h3>{{ anime.title }}</h3>
        <pre>{{ anime.synopsis }}</pre>
      </div>
    </div>
  </div>

  <section>
    <h2>My Anime</h2>
    
    <div class="my-anime-container">
      <div class="my-anime">
        <img/>
        <p>Dragon Ball</p>

        <div>
          <p>58/153</p>
          <button class="increment-btn">+</button>
          <button class="decrement-btn">-</button>  
        </div>
        
      </div>
    </div>

  </section>

</template>

<style scoped>
.my-anime {
  display: inline-flex;
  justify-content: space-between;
  width: 80vh;
  background-color: #3e3e3e;
  padding: 1.5rem;
  border-radius: 1rem;
}
</style>
