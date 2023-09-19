<template>
  <div>
    <div class="tab-bar">
      <van-tabbar v-model="activeIndex">
        <van-tabbar-item
          v-for="(item, index) in tabBar"
          :key="index"
          @click="jump(item.name)"
        >
          <template #icon="props">
            <img
              class="tab-bar-img"
              :src="props.active ? item.active : item.inactive"
            />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tabBar: [
        {
          id: 1,
          active: require("@/assets/icon/home.png"),
          inactive: require("@/assets/icon/home-unselected.png"),
          name: "Home",
        },
        {
          id: 2,
          active: require("@/assets/icon/category-selected.png"),
          inactive: require("@/assets/icon/category-tabbar.png"),
          name: "Category",
        },
        {
          id: 3,
          active: require("@/assets/icon/cart-selected.png"),
          inactive: require("@/assets/icon/cart.png"),
          name: "Cart",
        },
      ],
      activeIndex: this.active,
    };
  },
  methods: {
    jump(link) {
      this.$router.push({ name: link });
    },
  },
  mounted() {
    const isLogin = localStorage.token;
    if (isLogin === undefined) {
      this.tabBar.push({
        id: 4,
        inactive: require("@/assets/icon/user-unlogin.png"),
        active: require("@/assets/icon/user-unlogin.png"),
        name: "User",
      });
      return;
    } else {
      this.tabBar.push({
        id: 4,
        inactive: require("@/assets/icon/user-login-unselected.png"),
        active: require("@/assets/icon/user-login.png"),
        name: "User",
      });
      return;
    }
  },
};
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;

  &-img {
    width: auto;
    height: 50px;
    vertical-align: middle;
  }
}
</style>