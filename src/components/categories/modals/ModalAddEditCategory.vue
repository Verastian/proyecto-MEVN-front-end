<template>
  <v-card-text>
    <v-form ref="form" lazy-validation v-if="modal.nameModal === 'delet'?false:true">
      <v-text-field
        v-model.trim="emptyCategory.name"
        :counter="50"
        label="Category"
        required
      >
      </v-text-field>
      <v-textarea
        outlined
        name="input-7-4"
        label="Description"
        v-model.trim="emptyCategory.description"
        value="Add a description"
        :counter="255"
      ></v-textarea>
    </v-form>
    <div class="mt-6" v-if="modal.nameModal === 'delet'?true:false">
        <h3>Are you sure want to {{textAnex}}: {{emptyCategory.name}} ?</h3>
    </div>

    <v-alert
      v-for="alert in msgAlert"
      :key="alert"
      type="error"
      v-show="isInvalid"
      transition="scroll-y-transition"
    >
      {{ alert }}
    </v-alert>
  </v-card-text>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "modal-add-edit-category",
  props: {
    modal: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
    },
  },
  data() {
    return {
      emptyCategory: {
        /* name: "",
        description: "", */
      },
      msgAlert: [],
      isInvalid: false,
    };
  },
  computed: {
    ...mapState(["currentCategory"]),
    updateData() {
      if (this.modal.nameModal === "add") {
        return this.emptyCategory;
      } else {
        return (this.emptyCategory = JSON.parse(JSON.stringify(this.currentCategory)));
      }
    },
    textAnex(){
      return this.modal.title.replace('Confirm Delete','delete');
    }
  },
  methods: {
    ...mapActions(["createCategory", "updateCategory", "closeModals","deleteCategory"]),
    
    actions(name) {
      if (this.validate()) {
        if (this.emptyCategory._id) {
          if (this.modal.nameModal === "edit") {
            this.updateCategory(this.emptyCategory);
            this.closeModal(name);
          } else {
            this.deleteCategory(this.emptyCategory._id);
            this.closeModals(name);
          }
        } else {
          this.createCategory(this.emptyCategory);
          this.closeModal(name);
        }
      }
      console.log("llego a submit");
    },
    closeModal(name) {
      if (!this.emptyCategory._id) {
        this.closeModals(name);
        this.reset();
      }
      this.closeModals(name);
      //this.reset();
     
      console.log("llego a close");
    },
    reset() {
      this.emptyCategory.name = "";
      this.emptyCategory.description = "";
      this.msgAlert = [];
    },
    validate() {
      this.msgAlert = [];
      if (
        (this.emptyCategory.name).length < 1 ||
        (this.emptyCategory.name).length > 50
      ) {
        this.msgAlert.push(
          "The category name must be between 1-50 characters "
        );
      }
      if (this.emptyCategory.description.length > 255) {
        this.msgAlert.push(
          "The category Description must not exceed 255 characters"
        );
      }
      if (this.msgAlert.length >= 1) {
        console.log(this.msgAlert.length);
        this.isInvalid = true;
        return false;
      } else {
        console.log(this.msgAlert.length);
        this.isInvalid = false;
        return true;
      }
    },
  },
  created() {
    this.updateData;
  },
};
</script>