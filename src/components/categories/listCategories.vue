<template>
  <div>
    <v-card>
      <v-toolbar elevation="2" class="d-flex justify-space-between">
        <v-text-field
          v-model.trim="searchItems"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
        <!-- <search-form></search-form> -->
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer> </v-spacer>

        <v-divider class="mx-4" inset vertical></v-divider>
        <modal-01 :type="add" />
      </v-toolbar>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>
                <v-btn dark text @click="activateAll">
                  <v-badge
                    bottom
                    :dot="countBadge?false:true"
                    overlap
                    :color="countBadge?'red lighten-2':'green'"
                    :content="countBadge"
                  >
                    <v-icon class="grey--text">mdi-check-all</v-icon>
                  </v-badge>
                </v-btn>
              </th>
              <th class="text-left">State</th>
              <th class="text-left">Category</th>
              <th class="text-left">Description</th>
              <th class="text-left">date of entry</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>
                <v-btn
                  dark
                  text
                  v-if="item.state === 1"
                  @click="changeState(item)"
                >
                  <v-icon class="green--text"> mdi-check</v-icon>
                </v-btn>
                <v-btn
                  dark
                  text
                  v-else-if="item.state === 0"
                  @click="changeState(item)"
                >
                  <v-icon class="warning--text">mdi-block-helper</v-icon>
                </v-btn>
              </td>

              <td>
                <span v-if="item.state == 1" class="green--text"
                  >Activated
                </span>
                <span v-else-if="item.state == 0" class="warning--text">
                  Disabled
                </span>
              </td>
              <td
                :class="
                  item.state === 0
                    ? 'grey--text text-decoration-line-through'
                    : ''
                "
              >
                {{ item.name }}
              </td>
              <td
                :class="
                  item.state === 0
                    ? 'grey--text text-decoration-line-through'
                    : ''
                "
              >
                {{ item.description }}
              </td>
              <td
                :class="
                  item.state === 0
                    ? 'grey--text text-decoration-line-through'
                    : ''
                "
              >
                {{ item.createdAt }}
              </td>
              <td class="d-flex justify-space-around align-center">
                <modal-01
                  :type="edit"
                  :itemData="sendDataLoad(item)"
                  class="mr-3"
                />

                <modal-01 :type="delet" :itemData="sendDataLoad(item)" />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>


      <tfoot class="d-flex flex-column">
        <v-pagination :length="3" class="py-4"></v-pagination>
      </tfoot>
    </v-card>


  <table-categories/>

  
    <modal-info></modal-info>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Modal01 from "../templates/Modal01";
import ModalInfo from "../templates/ModalInfo";
import TableCategories from '../categories/tables/TableCategories'

export default {
  components: {
    Modal01,
    ModalInfo,
    TableCategories,
  },
  data() {
    return {
      
      searchItems: "",
      dataLoad: {},
      config: {
        itemsOrder: ["Descending", "Ascending"],
      },
      selected: [],
      value: [],
      /* msgInfo:false, */
      add: {
        nameModal: "add",
        title: "Formulario de Registro",
        texbtn: "Registrar",
        textOpenBtn: "Add Category",
        typeBtn: true,
        typeIcon:false,
        btnCancel:false,
        persistent: false,
        colorBtn01: "light-blue lighten-1",
        colorBtn02: "blue--text",
        colorText: "white--text",
      },
      edit: {
        nameModal: "edit",
        title: "Edit Category",
        texbtn: "Edit",
        textOpenBtn: "mdi-pencil",
        iconsize: 20,
        typeBtn: false,
        typeIcon:true,
        btnCancel:false,
        persistent: false,
        colorBtn01: "light-green darken-2",
        colorBtn02: "green--text",
        colorText: "white--text",
      },
      delet: {
        nameModal: "delet",
        title: "Confirm Delete Category",
        texbtn: "delete",
        textOpenBtn: "mdi-delete",
        typeBtn:false,
        typeIcon:true,
        btnCancel:true,
        persistent: true,
        colorBtn01: "red lighten-2",
        colorBtn02: "red--text",
        colorText: "white--text",
      },
    };
  },
   computed: {
    ...mapState(["listCategories"]),
    items() {
      return this.listCategories.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItems.toLowerCase());
      });
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
      "getListCategories",
      "activateCategory",
      "deActivateCategory",
    ]),
    openModal(name) {
      this.open(name);
    },

    sendDataLoad(item) {
      if (item) {
        return item;
      }
    },
    changeState(item) {
      if (item.state === 0) {
        this.activateCategory(item._id);
        console.log(item._id);
      } else if (item.state === 1) {
        this.deActivateCategory(item._id);
        console.log(item._id);
      }
    },
    activateAll() {
      this.listCategories.forEach((el) => {
        if (el.state === 0) this.activateCategory(el._id);
      });
    },
  },
  created() {
    this.getListCategories();
  },

};
</script>

<style>
</style>