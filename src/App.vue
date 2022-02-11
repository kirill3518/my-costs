<template>
  <div id="app">
    <!-- <div :class="[$style.wrapper]"> -->
    <div class="wrapper">
      <header>
        <router-link to="/dashboard">Dashboard</router-link>
        <!-- добавил -->
        <!-- <div :class="[$style.title]">My personal costs</div> -->
        <div class="title">My personal costs</div>
        <!-- <a href="dasboard">Dashboard</a>
        <a href="about">Dashboard</a>
        <a href="unknown">dev/null</a> -->
        <router-link to="/dashboard">Dashboard</router-link>
        <br />
        <router-link to="/about">About</router-link>
        <br />
        <router-link to="/add/payment/Food?value=200">Food</router-link>
        <br />
        <router-link to="/add/payment/Transport?value=50"
          >Transport</router-link
        >
        <br />
        <router-link to="/add/payment/Entertainment?value=2000"
          >Entertainment</router-link
        >
      </header>
      <router-view @openModalWindow="onModalOpen" />

      <main>
        <div class="add-cost">
          <button @click="onAddClick">ADD NEW COST</button>
        </div>
        <AddPaymentForm v-if="saved" />
        <PaymentsDisplay />
        <!-- <PageDashboard v-if="page === 'dasboard'" />
        <PageAbout v-else-if="page === 'about'" />
        <Page404 v-else /> -->
      </main>
    </div>

    <ModalWindow :settings="modalSettings" @close="onModalClose" />
    <transition name="fade"> <ContextMenu></ContextMenu> </transition>
  </div>
</template>
 
<script>
import PaymentsDisplay from "./components/PaymentsDisplay";
import AddPaymentForm from "./components/AddPaymentForm";
import { mapMutations, mapActions, mapGetters } from "vuex";
import ModalWindow from "./components/ModalWindow.vue"; // добавил
import ContextMenu from "./components/ContextMenu.vue";

export default {
  props: {
    page: String,
  },
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    ModalWindow,
    // ModalWindow: () =>
    //   import(/*webpackChunkName: 'Modal' */ "./components/ModalWindow.vue"),
    ContextMenu,
  },
  data() {
    return {
      saved: false,
      modalSettings: {}, // добавил
    };
  },
  methods: {
    onAddClick() {
      this.saved = !this.saved;
    },
    ...mapMutations([
      "setPaymentsListData",
      "setPageList",
      "setDataToPaymentList",
      "setPageNum",
    ]),
    ...mapActions(["fetchData"]),
    ...mapGetters(["getPaymentsList"]),
    onModalOpen(settings) {
      this.modalSettings = settings;
    },
    onModalClose() {
      this.modalSettings = {};
    },
  },
  created() {
    this.setPageList();

    let num = 1; // Имитация нажатия кнопки "1" компонента пагинации
    this.setPageNum(num);
    this.setDataToPaymentList(num);
    // this.fetchData(num);
  },
  mounted() {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState({}, "", link.href);
        this.$root.$emit("router-go");
      });
    });
  },
};
</script>
 
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .wrapper {
    .title {
      font-size: 32px;
      color: #222224;
      padding-bottom: 15px;
    }

    .add-cost {
      margin: 0 auto;
      margin-bottom: 15px;
      button {
        background-color: #24ada1;
        border: none;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 17px;
        color: #ffffff;
        padding: 5px 40px 5px 40px;
        margin-top: 10px;
        margin-right: -70px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>