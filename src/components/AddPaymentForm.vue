<template>
  <!-- <div :class="[$style.wrapper]"> -->
  <div class="wrapper">
    <div class="save-cost">
      <form action="#">
        <input placeholder="Date" v-model="date" />
        <!-- <input placeholder="Category" v-model="category" /> -->
        <select v-model="category">
          <option
            v-for="option in getCategoryList"
            v-bind:key="option.id"
            :value="option.name"
          >
            {{ option.name }}
          </option>
        </select>
        <input placeholder="Value" v-model="value" />
      </form>
      <button @click="onSaveClick">ADD</button>
    </div>
  </div>
</template>
 
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      value: "",
      category: "",
      date: "",
      id: 0,
    };
  },
  // props: {
  //   Value: Number,
  // },
  computed: {
    ...mapGetters(["getCategoryList"]),
    // , "getDate", "getCategory", "getValue"
    // category: function () {
    //   return this.getCategory;
    // },
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate() + "";
      const m = today.getMonth() + "" + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    ...mapActions(["loadCategories"]),
    ...mapMutations(["addDataToPaymentsList"]),
    onSaveClick() {
      const data = {
        id: this.id,
        date: this.date || this.getCurrentDate,
        category: this.category || "Unknown",
        value: +this.value,
      };
      this.addDataToPaymentsList(data);
    },
  },
  mounted() {
    if (!this.getCategoryList.length) {
      this.loadCategories();
    }
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
  margin: 0 auto;
  width: 300px;

  .save-cost {
    margin: 0 auto;
    width: 185px;
  }

  input,
  select {
    padding: 10px 5px;
    margin-bottom: 10px;
  }
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
</style>