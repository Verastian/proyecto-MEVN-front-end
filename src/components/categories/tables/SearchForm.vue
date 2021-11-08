<template>
  <v-card flat outlined>
    <div class="d-flex flex-row align-center">
      <v-text-field
        v-model.trim="search"
        clearable
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="pa-2"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn icon @click="activateAll">
        <v-badge
          bottom
          :dot="countBadge ? false : true"
          overlap
          :color="countBadge ? 'red lighten-2' : 'green'"
          :content="countBadge"
        >
          <v-icon class="grey--text">mdi-check-all</v-icon>
        </v-badge>
      </v-btn>

      <v-btn v-if="allOpenOrCloseList" icon>
        <v-icon @click.stop="allOpenOrClose">mdi-chevron-double-up</v-icon>
      </v-btn>
      <v-btn v-if="!allOpenOrCloseList" icon>
        <v-icon @click.stop="allOpenOrClose">mdi-chevron-double-down</v-icon>
      </v-btn>

      <modal-01 :type="add" />
    </div>

    <div class="d-flex justify-start">
      <div class="d-flex flex-row align-center">
        <v-btn icon v-if="filter.sortAlpha === 1">
          <v-icon @click.stop="iconSortAlfabetical(2)"
            >mdi-sort-alphabetical-ascending</v-icon
          >
        </v-btn>
        <v-btn icon v-else-if="filter.sortAlpha === 2">
          <v-icon @click.stop="iconSortAlfabetical(1)"
            >mdi-sort-alphabetical-descending</v-icon
          >
        </v-btn>
        <v-btn icon v-if="filter.sortTime === 1">
          <v-icon @click.stop="iconSortByTime(2)"
            >mdi-sort-clock-ascending-outline</v-icon
          >
        </v-btn>
        <v-btn icon v-else-if="filter.sortTime === 2">
          <v-icon @click.stop="iconSortByTime(1)"
            >mdi-sort-clock-descending-outline</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-table</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-format-list-text</v-icon>
        </v-btn>
        <!--  <v-radio-group v-model="state" row>
                <v-radio
                  v-for="n in items"
                  :key="n"
                  :label="`Show `"
                  :value="n"
                ></v-radio>
              </v-radio-group> -->
        <v-select
          :items="optionCheck"
          label="Show State"
          dense
          outlined
          value="Normal"
        ></v-select>
      </div>
    </div>
  </v-card>
</template>

<script>
import Modal01 from "../../templates/Modal01";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Modal01,
  },
  name: "search-form",
  data() {
    return {
      optionCheck: ["Normal", "actived", "disabled"],
      add: {
        nameModal: "add",
        title: "Add Category",
        texbtn: "Add",
        textOpenBtn: "mdi-plus",
        typeBtn: false,
        typeIcon: false,
        btnCancel: false,
        persistent: false,
        colorBtn01: "light-blue lighten-1",
        colorBtn02: "blue--text",
        colorText: "white--text",
      },
    };
  },
  computed: {
    ...mapState(["filter", "listCategories", "allOpenOrCloseList"]),
    search: {
      get() {
        return this.filter.query;
      },
      set(val) {
        this.setQuery(val);
      },
    },
    state: {
      get() {
        return this.filter.state;
      },
      set() {
        this.setState;
      },
    },
    countBadge() {
      let counter = this.listCategories.filter((el) => {
        if (el.state === 0) return el;
      });
      return counter.length;
    },
  },
  methods: {
    ...mapActions([
      "setQuery",
      "setState",
      "activateCategory",
      "setAllOpenOrCloseList",
      "setSortAlpha",
      "setSortTime",
    ]),
    iconSortAlfabetical(num) {
      if (num === 1) {
        this.setSortAlpha(num);
      } else if (num === 2) {
        this.setSortAlpha(num);
      }
    },
    iconSortByTime(num) {
      if (num === 1) {
        this.setSortTime(num);
      } else if (num === 2) {
        this.setSortTime(num);
      }
    },
    allOpenOrClose() {
      this.setAllOpenOrCloseList();
    },
    activateAll() {
      this.listCategories.forEach((el) => {
        if (el.state === 0) this.activateCategory(el._id);
      });
    },
  },
};
</script>

<style>
</style>