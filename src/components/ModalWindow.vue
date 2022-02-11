<template>
  <div class="wrapper" v-if="isShow">
    <div class="header"></div>
    <div class="content2">
      <AddPaymentForm />
      <!-- <AuthForm v-if="settings.content === 'authform'" /> -->
    </div>
    <div class="footer">
      <button @click="onCloseClick">Close</button>
    </div>
  </div>
</template>
 
<script>
import AddPaymentForm from "./AddPaymentForm";
// import AuthForm from "./AuthForm";

export default {
  data() {
    return {
      isShow: false,
      item: {},
      xPos: 0,
      yPos: 0,
      settings: {},
    };
  },
  components: {
    AddPaymentForm,
    // AuthForm,
  },
  methods: {
    onShown(item, settings) {
      this.item = item;
      this.settings = settings;
      const { action } = settings;
      this.isShow = action === "editpaymentform";
    },
    onHide() {
      this.ModalWindoW = "";
      this.modalWindowSettings = {};
    },
    onCloseClick() {
      this.$emit("close");
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
};
</script>