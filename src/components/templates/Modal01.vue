<template>
  <div>
    <v-btn
      v-if="modal.typeBtn"
      :color="modal.colorBtn01"
      dark
      @click.stop="open"
    >
      {{ modal.textOpenBtn }}
    </v-btn>
    <v-btn
      icon
      v-else-if="modal.typeIcon"
      :disabled="toDisabled"
      :color="modal.colorBtn01"
      :size="modal.iconsize"
      @click.stop="open"
    >
      <v-icon>{{ modal.textOpenBtn }}</v-icon>
    </v-btn>
    <v-btn
      icon
      v-else
      :color="modal.colorBtn01"
      :size="modal.iconsize"
      @click.stop="open"
    >
      <v-icon>{{ modal.textOpenBtn }}</v-icon>
    </v-btn>

    <v-dialog
      v-model="isOpen"
      width="500"
      :persistent="modal.persistent"
      @click:outside="close"
      :retain-focus="false"
    >
      <v-card>
        <v-card-title
          :class="modal.colorBtn01"
          class="lighten-2 d-flex justify-space-between"
        >
          <span :class="modal.colorText">{{ modal.title }}</span>
          <v-icon :class="modal.colorText" @click="close"> mdi-close </v-icon>
        </v-card-title>
        <component
          :is="currentComponent"
          ref="modalReference"
          :modal="modal"
          :item="item"
        >
        </component>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="modal.btnCancel" text @click="close">
            <span :class="modal.colorBtn02">Cancel</span>
          </v-btn>
          <v-btn text @click="actions">
            <span :class="modal.colorBtn02">{{ modal.texbtn }}</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ModalAddEditCategory from "../categories/modals/ModalAddEditCategory";
import { mapState, mapActions } from "vuex";
import Vue from "vue";
Vue.component("modal-add-edit-category", ModalAddEditCategory);
export default {
  name: "modal-01",
  components: {
    ModalAddEditCategory,
  },
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
    type: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      components: ["modal-add-edit-category"],
      currentComponent: "",
      modal: "",
      id: "",
      item: {},
      closeModal: null,
      actionsModal: false,
    };
  },
  computed: {
    ...mapState(["listOpen"]),
    modalData() {
      return (this.modal = this.type);
    },

    async dataLoad() {
      try {
        if (this.itemData) {
          /* console.log(this.itemData._id); */
          await (this.id = this.itemData._id);
          await (this.item = this.itemData);
        }
      } catch (e) {
        console.log(e);
      }
    },

    isOpen() {
      let name = this.id
        ? `${this.modal.nameModal}-${this.id}`
        : this.type.nameModal;

      return this.listOpen.includes(name);
    },
    toDisabled() {
      return this.itemData.state === 0 ? true : false;
    },
  },
  methods: {
    ...mapActions(["openModals", "editCategory"]),
    open() {
      let name = this.id
        ? `${this.modal.nameModal}-${this.id}`
        : this.type.nameModal;
      this.openModals(name);
      this.editCategory(this.itemData);
    },
    actions() {
      let name = this.id
        ? `${this.modal.nameModal}-${this.id}`
        : this.type.nameModal;
      if (name) {
        this.$refs.modalReference.actions(name);
      }
    } /*= */,
    close() {
      let name = this.id
        ? `${this.modal.nameModal}-${this.id}`
        : this.type.nameModal;
      this.$refs.modalReference.closeModal(name);
    },
    changeComponent() {
      switch (this.type.nameModal) {
        case "edit":
          this.currentComponent = "modal-add-edit-category";
          break;
        case "add":
          this.currentComponent = "modal-add-edit-category";
          break;
        case "delet":
          this.currentComponent = "modal-add-edit-category";
          break;
      }
    },
  },
  beforeDestroy() {
    if (this.isOpen) {
      this.close();
      this.dataLoad;
    }
  },
  created() {
    this.modalData;
    this.changeComponent();
    this.dataLoad;
  },
};
</script>