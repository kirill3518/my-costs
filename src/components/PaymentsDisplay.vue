<template>
  <!-- <div :class="[$style.wrapper]"> -->
  <div class="wrapper">
    <div class="table-header">
      <span><div class="el">#</div></span>
      <span><div class="el">Date</div></span>
      <span><div class="el">Category</div></span>
      <span><div class="el">Value</div></span>
    </div>
    <div class="item" v-for="item in getFPV" :key="item.id">
      <span
        ><div class="el">{{ item.id }}</div></span
      >
      <span
        ><div class="el">{{ item.date }}</div></span
      >
      <span
        ><div class="el">{{ item.category }}</div></span
      >
      <span
        ><div class="el">{{ item.value }}</div></span
      >
      <span @click="onShowContextMenu($event, item)">...</span>
    </div>
  </div>
</template>
 
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["deletePayment"]),
    editItem(item) {
      const settings = {
        header: "1234",
        action: "editpaymentform",
      };
      this.$modal.show(item, settings);
      // this.$modal.hide()
    },
    deleteItem(id) {
      this.deletePayment({ num: 1, id: id });
    },
    onShowContextMenu(event, item) {
      const items = [
        {
          id: 1,
          text: "Редактировать",
          action: () => {
            this.editItem(item);
          },
        },
        {
          id: 2,
          text: "Удалить",
          action: () => {
            this.deleteItem(item.id);
          },
        },
      ];
      this.$context.show(event, items);
    },
  },
  computed: {
    ...mapGetters(["getPaymentsList", "getPaymentsList2"]),
    getFPV() {
      // return this.getPaymentsList;
      return this.getPaymentsList2;
    },
  },
};
</script>
 
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  padding-top: 15px;
  width: 500px;
  margin: 0 auto 0 auto;
  .table-header {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 10px;
    font-weight: bold;
    .el {
      justify-self: start;
    }
  }

  .item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 10px;
    .el {
      justify-self: start;
    }
  }
}
</style>