<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Anime</RouterLink>
        <span> | </span>
        <RouterLink to="/manga">Manga</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: #eeeeee;
}

header {
  display: flex;
  justify-content: center;
}

nav a {
  margin-bottom: 1rem;
  padding-top: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: #30485e;
  display:inline-block;
  margin-top: 1rem;
}

nav a:hover {
  color: #3fba3f;
  transition: 0.3s;
}
</style>
