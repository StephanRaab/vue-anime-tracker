<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Anime</RouterLink>
        <RouterLink to="/manga">Manga</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

header{
  display: flex;
  justify-content: center;
}
</style>
