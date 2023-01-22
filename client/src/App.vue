<template>
  <!-- <div>
    <router-link to="/about">About</router-link> |
    <router-link to="/home">Home</router-link>
  </div> -->

  <router-view />
</template>

<script setup>
localStorage.setItem('authorized', 'false');
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
