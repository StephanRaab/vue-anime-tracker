<script setup>

</script>

<template>
  <section>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <h1>Vue Anime Tracker</h1>

    <form>
      <input type="text"  placeholder="search for an anime..."> <button>Search</button>
    </form>


  </section>

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
