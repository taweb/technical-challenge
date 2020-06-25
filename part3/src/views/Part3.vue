<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Part3 />
  </div>
</template>

<script>
// @ is an alias to /src
import Part3 from "@/components/part3.vue";

export default {
  name: "Home",
  components: {
    Part3
  }
};
</script>
<style scoped>
home {
  background-color: #eee;
  padding: 2rem 0;
  max-width: 75rem;
  color: #444;
  font-family: "Helvetica", "Arial", sans-serif;
}
</style>
