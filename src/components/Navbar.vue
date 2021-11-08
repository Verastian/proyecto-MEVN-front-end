<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="0">
      <v-icon @click="sidebarMenu = !sidebarMenu">{{ hideMenuIcon }}</v-icon>
      <v-toolbar-title class="pl-4">{{ titlesOfRoutes}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="toggleTheme" color="white--text" class="mr-2">
        {{ modelightDark }}{{ titlesOfSubRoutes }}
      </v-icon>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>
    <menu-dashboard
      :showSideBar="sidebarMenu"
      @click="sendTitle"
    ></menu-dashboard>
    <slot></slot>
  </v-app>
</template>

<script>
import MenuDashboard from "./menuDashboard";
export default {
  name: "nav-bar",
  components: {
    MenuDashboard,
  },
  data: () => ({
    sidebarMenu: true,
    lightDark: true,
    titlesOfRoutes: "Home",
    titlesOfSubRoutes: "",
  }),
  computed: {
    buttonText() {
      return !this.$vuetify.theme.dark ? "Go Dark" : "Go Light";
    },
    hideMenuIcon() {
      return this.sidebarMenu
        ? "mdi-chevron-double-left"
        : "mdi-chevron-double-right";
    },
    modelightDark() {
      return this.lightDark ? "mdi-flashlight" : "mdi-flashlight-off";
    },
    
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.lightDark = !this.lightDark;
    },
    sendTitle(title) {
      console.log(title);
    this.titlesOfRoutes = title;
    },
  },
};
</script>

<style>
</style>