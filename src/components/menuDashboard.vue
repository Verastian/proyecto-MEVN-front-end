<template>
  <div>
    <v-navigation-drawer
      v-model="showSideBar"
      app
      floating
      :permanent="showSideBar"
      :mini-variant.sync="toggleMini"
      fixed
    >
      <v-list dense color="primary" dark>
        <v-list-item>
          <v-list-item-action @click="toggleMini = !toggleMini">
            <v-icon>{{ hideMiniMenu }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <h3 class="font-weight-thin">Sistem Dashboard</h3>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action @click.stop="showSideBar = !showSideBar">
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list-item class="px-2" @click="toggleMini = false">
        <v-list-item-avatar>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="text-truncate">
          Jane Doeski
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item
        @click="toggleMini = false, sendTitle(itemsPrimary[0].title)"
        class="px-4"
        :to="itemsPrimary[0].href"
        
      >
        <v-list-item-icon>
          <v-icon v-text="itemsPrimary[0].icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content
          class="text-truncate"
          v-text="itemsPrimary[0].title"
        >
        </v-list-item-content>
      </v-list-item>
      <v-list-group
        :value="false"
        v-for="item in items"
        :key="item.title"
        :to="item.href"
        :prepend-icon="item.icon"
        no-action
        @click="sendTitle(item.title)"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="subItem in item.content"
          :key="subItem.title"
          link
          :to="subItem.href"
          @click="toggleMini = false, sendTitle(subItem.title)"
          dense
          
        >
          <v-list-item-icon>
            <v-icon v-text="subItem.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="subItem.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "menu-dashboard",
  props: {
    showSideBar: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toggleMini: false,
      itemsPrimary: [{ title: "Home", href: "/", icon: "mdi-home-outline" }],
      items: [
        {
          title: "Store",
          icon: "mdi-store",
          content: [
            {
              title: "Categories",
              href: "/categories",
              icon: "mdi-shield-account",
            },
            {
              title: "Article",
              href: "/articles",
              icon: "mdi-shield-account",
            },
          ],
        },
        {
          title: "Sales",
          icon: "mdi-cash-usd",
          content: [
            {
              title: "Sales",
              href: "/Sales",
              icon: "mdi-shield-account",
            },
            {
              title: "Customers",
              href: "/customers",
              icon: "mdi-shield-account",
            },
          ],
        },
        {
          title: "Purchases",
          icon: "mdi-cart",
          content: [
            {
              title: "Incomes",
              href: "/incomes",
              icon: "mdi-shield-account",
            },
            {
              title: "Providers",
              href: "/providers",
              icon: "mdi-shield-account",
            },
          ],
        },
        {
          title: "Access",
          icon: "mdi-account-search-outline",
          content: [
            {
              title: "Users",
              href: "/users",
              icon: "mdi-shield-account",
            },
          ],
        },
        {
          title: "Inquiries",
          icon: "mdi-poll-box",
          content: [
            {
              title: "Consult purchases",
              href: "/consultPurchases",
              icon: "mdi-poll-box",
            },
            {
              title: "Consult Sales",
              href: "/consultSales",
              icon: "mdi-poll-box",
            },
          ],
        },
      ],
    };
  },
  computed: {
    hideMiniMenu() {
      return !this.toggleMini ? "mdi-chevron-left" : "mdi-chevron-right";
    },
  },
  methods: {
    sendTitle(title) {
      this.$emit("click",title);
    },
  },
};
</script>

<style>
/* html {
  overflow-y: hidden !important;
} */
</style>