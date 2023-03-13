<template>
  <nav>
    <!-- When a link in the menu is clicked, we call the makeActive method, 
        defined in the JavaScript Vue instance. It will change the value of "active". -->

    <a href="#" class="home" v-on:click="makeActive('home')">Home</a>
    <a href="#" class="about" v-on:click="makeActive('about')">About</a>
    <a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>
  </nav>
</template>

<script setup>
import router from '@/router';

function makeActive(route) {
  router.push(route);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font: 15px/1.3 'Open Sans', sans-serif;
  color: #5e5b64;
  text-align: center;
}

a,
a:visited {
  outline: none;
  color: #389dc1;
}

a:hover {
  text-decoration: none;
}

section,
footer,
header,
aside,
nav {
  display: block;
}

/*-------------------------
	The menu
--------------------------*/

nav {
  display: inline-block;
  margin: 60px auto 45px;
  background-color: #5597b4;
  box-shadow: 0 1px 1px #ccc;
  border-radius: 2px;
}

nav a {
  display: inline-block;
  padding: 18px 30px;
  color: #fff !important;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none !important;
  line-height: 1;
  text-transform: uppercase;
  background-color: transparent;

  -webkit-transition: background-color 0.25s;
  -moz-transition: background-color 0.25s;
  transition: background-color 0.25s;
}

nav a:first-child {
  border-radius: 2px 0 0 2px;
}

nav a:last-child {
  border-radius: 0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact {
  background-color: #e35885;
}

p {
  font-size: 22px;
  font-weight: bold;
  color: #7d9098;
}

p b {
  color: #ffffff;
  display: inline-block;
  padding: 5px 10px;
  background-color: #c4d7e0;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 18px;
}
</style>
