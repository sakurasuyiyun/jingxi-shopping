<template>
  <div class="container">
    <div class="header">
      <div class="back" @click="back">
        <span class="icon icon-back"></span>
      </div>
      <div class="title">
        <span>{{text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  props: {
    text: {
      default: "",
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  &-back {
    width: 24px;
    height: 24px;
    display: block;
    background: url("@/assets/icon/back.png") no-repeat;
    background-size: 100% auto;
  }

  &-more {
    position: absolute;
    display: inline-block;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: url("@/assets/icon/arrow-rt.png") no-repeat 50%/100%;
  }
}

.container {
  width: 100%;
  .header {
    position: relative;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    border-bottom: 1px solid #ccc;

    .back {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    .title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
    }

    .more {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
}
</style>