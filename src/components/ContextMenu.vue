<template>
  <div class="context" v-if="isShow" :style="styles">
    <div
      class="context__item"
      v-for="item in items"
      v-bind:key="item.id"
      @click="onClickAction(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      isShow: false,
      items: [],
      xPos: 0,
      yPos: 0,
    };
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos + 10} px`,
        left: `${this.xPos + 20} px`,
      };
    },
  },
  methods: {
    onClickAction(item) {
      item.action();
      // this.$context.close();
    },
    onShow(items, caller) {
      this.isShow = true;
      this.items = items;
      this.setPosition(caller);
    },
    onHide() {
      this.isShow = false;
      this.items = [];
    },
    setPosition(caller) {
      const pos = caller.getBoundingClientRect();
      this.xPos = pos.left;
      this.yPos = pos.top;
    },
  },
  mounted() {
    this.$context.EventBus.$on("show", this.onShow);
    this.$context.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$context.EventBus.$off("show", this.onShow);
    this.$context.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss" scoped>
.context {
  position: absolute;
  background: #eee;
  cursor: pointer;
}
</style>
