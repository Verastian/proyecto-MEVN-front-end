<template>
  <!-- <v-row no-gutters> 
      <items-categories :emptyCategory="category" v-for="category in categories" :key="category._id"/>
  </v-row> -->
  <!-- <v-list flat>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="selectedItem" width="100%">
        <v-list-item v-for="category in categories" :key="category._id">

          <v-list-item-content>
             <items-categories :item="category"/>
          </v-list-item-content>
          
          
        </v-list-item>
      </v-list-item-group>
    </v-list> -->

  <v-data-iterator :items="categories" item-key="name">
    <template v-slot:default="{ items }">
      <v-row>
        <v-col v-for="item in items" :key="item._id" cols="12" md="6" xl="4">
          <items-categories :item="item" />
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import ItemsCategories from "../tables/ItemsCategories";
import { mapGetters, mapActions} from "vuex";
export default {
  name: "categories-list",
  components: {
    ItemsCategories,
  },
  data() {
    return {
      selectedItem: 1,
    };
  },
  computed: {
    ...mapGetters(["filteredCategories"]),
    categories() {
      return this.filteredCategories;
    },
  },
  methods:{
...mapActions([
      "getListCategories",
    ]),
  },
  created() {
    this.getListCategories();
    this.filteredCategories;
    console.log(this.categories);
  },
};
</script>

<style>
</style>