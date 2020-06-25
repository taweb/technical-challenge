<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>

#app {
  padding: 2rem 0;
  max-width: 75rem;
  margin: 0 auto;
  color: var(--blue-dark);
  font-family: 'Quicksand', sans-serif;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
