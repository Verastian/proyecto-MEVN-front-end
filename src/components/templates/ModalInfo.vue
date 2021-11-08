<template>
  <v-card>
    <div class="text-center mb-4">
      <v-snackbar
        v-model="msgInfo"
        rounded="pill"
        center
        centered
        elevation="24"
        outlined
        timeout="-1"
        :color="color"
        width="auto"
      >
        <div class="d-flex flex-row py-2">
          <h3 class="mr-3">{{ messagesInfo.message }}</h3>
          <v-icon :class="newColor" @click.stop="close"> mdi-close </v-icon>
        </div>
      </v-snackbar>
    </div>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "modal-info",
  props: {},
  data() {
    return {
      msgInfo: false,
    };
  },
  computed: {
    ...mapState(["messagesInfo"]),
    newColor() {
      return `${this.color}--text`;
    },
    color() {
      if (this.messagesInfo.type === "success") {
        return this.messagesInfo.type;
      } else if (this.messagesInfo.type === "danger") {
        return "red";
      }
    },

    /*  newMsg(){
      if(this.messagesInfo.message){
        return this.messagesInfo.message.replace(`${this.messagesInfo.name}`,<strong>`${this.messagesInfo.name}`</strong>)
      }
    } */
  },
  methods: {
    close() {
      this.msgInfo = false;
    },
  },
  watch: {
    messagesInfo(newMsg) {
      if (newMsg) {
        this.msgInfo = true;
        setTimeout(() => {
          this.msgInfo = false;
      }, 4000);
      }
    },
  },
};
</script>