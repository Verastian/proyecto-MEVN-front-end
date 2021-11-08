<template>
  <v-card flat >
    <v-list  two-line outlined class="pa-0">
      <v-list-group no-action :value="openClose" >
        <template v-slot:activator >
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-file-document </v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title
              :class="
                item.state === 0
                  ? 'grey--text text-decoration-line-through'
                  : ''
              "
              v-text="item.name"
            ></v-list-item-title>

            <v-list-item-subtitle>
              <span v-if="item.state == 1" class="green--text">Activated </span>
              <span v-else-if="item.state == 0" class="warning--text"
                >Disabled</span
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              v-text="item.createdAt"
            ></v-list-item-subtitle>
            {{ item.description }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="d-flex justify-end">
          <v-list-item-action class="d-flex flex-row align-center">
            <div class="mr-3 pa-0">
              <v-btn
                icon
                text
                v-if="item.state === 1"
                @click.stop="changeState(item)"
              >
                <v-icon class="green--text"> mdi-check</v-icon>
              </v-btn>
              <v-btn
                icon
                text
                v-else-if="item.state === 0"
                @click.stop="changeState(item)"
              >
                <v-icon class="warning--text">mdi-block-helper</v-icon>
              </v-btn>
            </div>
            <modal-01
              class="mr-3"
              :type="edit"
              :itemData="sendDataLoad(item)"
            />
            <modal-01
              class="mr-3"
              :type="delet"
              :itemData="sendDataLoad(item)"
            />
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Modal01 from "../../templates/Modal01";
export default {
  components: {
    Modal01,
  },
  name: "items-categories",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openClose: false,
      showCol: false,
      titleButtonAdd: "New category",
      searchItems: "",
      dataLoad: {},
      config: {
        itemsOrder: ["Descending", "Ascending"],
      },
      selected: [],
      value: [],
      /* msgInfo:false, */
      edit: {
        nameModal: "edit",
        title: "Edit Category",
        texbtn: "Edit",
        textOpenBtn: "mdi-pencil",
        iconsize: 20,
        typeBtn: false,
        btnCancel: false,
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
        typeBtn: false,
        btnCancel: true,
        persistent: true,
        colorBtn01: "red lighten-2",
        colorBtn02: "red--text",
        colorText: "white--text",
      },
    };
  },
  computed: {
    ...mapState(["listCategories", "allOpenOrCloseList"]),
    items() {
      return this.listCategories.filter((item) => {
        return item.name.toLowerCase().includes(this.searchItems.toLowerCase());
      });
    },
  },
  methods: {
    ...mapActions(["activateCategory", "deActivateCategory"]),
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
  watch: {
    allOpenOrCloseList(newVal) {
      this.openClose = newVal;
    },
  },
  created() {
    //console.log(this.listCategories);
  },
};
</script>

<style>
</style>