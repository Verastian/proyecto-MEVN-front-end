<template>
  <v-app>
    <nav-bar> 
       <v-main>
      <v-container>
         <transition name="fade">
            <router-view></router-view>
          </transition>
      </v-container>
       </v-main>
      </nav-bar>
    <v-footer class="py-3">
      <span class="ml-auto overline">Iatek &copy;2020</span>
    </v-footer>
  </v-app>
</template>
<script>
import NavBar from "./components/Navbar";

export default {
  name: "App",
  components: {
    NavBar,
  
  },
  data: () => ({}),
};
</script>
<style >
</style>