<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import NewQuesAns from "./components/NewQuesAns";
export default {
  name: "App",
  components: {
    Navbar,
    NewQuesAns,
  },
};
</script>
<style>
nav {
  margin-bottom: 10px;
}
</style>