<template>
  <div>
    <div class="loading" v-if="isLoading">
      <van-loading color="#1989fa" />
    </div>
    <div class="container" v-if="isShow">
      <div class="header">
        <div class="back" @click="back">
          <span class="icon icon-back"></span>
        </div>
        <div class="title">
          <span>购物车</span>
        </div>
        <div class="more">
          <span class="icon icon-more"></span>
        </div>
      </div>
      <div class="content" v-for="(item, index) in newData" :key="index">
        <div class="content-item">
          <div class="item-header">
            <!-- <div class="pic">
              <img :src="toggleAll ? icon.selected : icon.unselected" alt="" />
            </div> -->
            <div class="title">
              <span class="icon icon-shop"></span>
              <span class="title-text">{{ shopName[index] }}</span>
            </div>
          </div>
          <div class="item-content" v-for="(list, num) in item" :key="num">
            <div class="pic" @click="changeCheck(list)">
              <img
                :src="list.isChecked ? icon.selected : icon.unselected"
                alt=""
              />
            </div>
            <div class="main">
              <div class="img">
                <img :src="list.imgUrl" />
              </div>
              <div class="desc">
                <p class="desc-tittle">{{ list.title }}</p>
                <div class="price-item">
                  <p class="price-text">
                    &yen;
                    <span class="price">{{ list.price.split(".")[0] }}</span>
                    <span>.{{ list.price.split(".")[1] }}</span>
                  </p>
                  <div class="control">
                    <span
                      class="btn btn-sub"
                      v-show="list.count > 1"
                      @click="changeCount(list, -1)"
                    ></span>
                    <span class="count">{{ list.count }}</span>
                    <span
                      class="btn btn-add"
                      @click="changeCount(list, 1)"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grap"></div>
      </div>
      <div class="bottom">
        <div class="toggle-all">
          <input
            type="checkbox"
            v-model="toggleAllChecked"
            style="display: none"
          />
          <div class="pic">
            <img
              :src="toggleAll ? icon.selected : icon.unselected"
              @click="toggleAllBtn"
            />
          </div>
          <span>全选</span>
        </div>
        <div class="control">
          <div class="price">
            总计：<span>&yen;{{ total.toFixed(2) }}</span>
          </div>
          <div
            :class="{ btn: 'btn', disabled: count <= 0 }"
            @click="submit($event)"
          >
            去结算({{ count }}件)
          </div>
        </div>
      </div>
      <TabBar :active="active"></TabBar>
    </div>
    <div class="empty" v-else>
      <TopBar text="购物车"></TopBar>
      <van-empty description="页面空空哒"></van-empty>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/tabBar";
import { Dialog, Toast } from "vant";
import { get } from "@/utils/request";
import TopBar from "@/components/topBar.vue";
export default {
  name: "Cart",
  components: {
    TopBar,
    TabBar,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      active: 2,
      toggleAllChecked: false,
      icon: {
        selected: require("@/assets/icon/selected.png"),
        unselected: require("@/assets/icon/unselected.png"),
      },
      data: [],
      isShow: false,
      isLoading: false,
      newData: {},
      shopName: {},
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async toggleAllBtn() {
      this.isLoading = true;
      const toggleAll = this.toggleAllChecked === false ? 1 : 0;
      this.toggleAllChecked = !this.toggleAllChecked;
      const username = localStorage.username;
      const res = await get("/allCheck", {
        toggleAll,
        username,
      });
      if (res?.errno === 0) {
        this.isLoading = false;
        this.gatCartList();
      }
    },
    async gatCartList() {
      const username = localStorage.username;
      const res = await get("/gatCartList", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.formatData();
        this.isShow = true;
      } else {
        Toast(res.message);
        this.isShow = false;
        // setTimeout(() => {
        //   this.$router.push({ name: "Home" });
        //   window.location.reload();
        // }, 500);
      }
    },
    formatData() {
      this.newData = {};
      this.data.forEach((item) => {
        if (!this.newData.hasOwnProperty(item.shopId)) {
          this.shopName[item.shopId] = item.name;
          this.newData[item.shopId] = [];
        }
      });
      this.data.forEach((element) => {
        for (let item in this.newData) {
          if (element.shopId == item) {
            this.newData[item] = [...this.newData[item], element];
          }
        }
      });
      this.isLoading = false;
      console.log(this.newData);
    },
    async changeCount(item, num) {
      const username = localStorage.username;
      const res = await get("/updateProduct", {
        username,
        productId: item.productId,
        num,
      });
      console.log(res);
      this.gatCartList();
    },
    async changeCheck(item) {
      const change = item.isChecked === 0 ? 1 : 0;
      const username = localStorage.username;
      const res = await get("/updateCheck", {
        username,
        productId: item.productId,
        change,
      });
      console.log(res);
      this.gatCartList();
    },
    async submit(event) {
      const disabled = event.target.classList.contains("disabled");
      if (disabled) {
        Toast("请勾选商品后再提交订单");
        return;
      }
      this.$router.push({
        name: "OrderConfirm",
      });
    },
    checkLogin() {
      const token = localStorage.token;
      if (!token) return;
      this.getUser(token);
      return true;
    },
    async getUser(token) {
      const res = await get("/checkToken", {
        token,
      });
      if (res?.errno === 0) {
        localStorage.username = res.username;
      }
    },
  },
  watch: {
    toggleAll() {},
  },
  beforeRouteEnter(to, from, next) {
    const _this = this;
    const token = localStorage.token;
    const username = localStorage.username;
    if (username === undefined && token === undefined) {
      Dialog.alert({
        message: "您看起来还没有登陆，请前往登陆",
      }).then(() => {
        next({ name: "Login" });
      });
    } else {
      next();
    }
  },
  created() {
    this.checkLogin();
    setTimeout(() => {
      this.gatCartList();
    }, 50);
  },
  computed: {
    total() {
      return this.data.reduce((total, item) => {
        if (item.isChecked) {
          total += item.count * item.price;
        }
        return total;
      }, 0);
    },
    count() {
      return this.data.reduce((total, item) => {
        if (item.isChecked) {
          total += item.count;
        }
        return total;
      }, 0);
    },
    toggleAll() {
      return this.data.every((item) => item.isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.icon {
  &-back {
    width: 24px;
    height: 24px;
    display: block;
    background: url("@/assets/icon/back.png") no-repeat;
    background-size: 100% auto;
  }

  &-more {
    display: inline-block;
    margin: 12px 12px 12px 10px;
    width: 20px;
    height: 20px;
    background: url("@/assets/icon/more.png") no-repeat 50%;
    background-size: 20px;
  }

  &-shop {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url("@/assets/icon/shop.png") no-repeat;
    background-size: 100% auto;
  }
}

.container {
  width: 100%;
  margin-bottom: 100px;
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
    }

    .more {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }

  .bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 49px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 5px 0 10px;
    background-color: #fff;

    .toggle-all {
      width: 70px;
      display: flex;
      align-items: center;
      .pic {
        border-radius: 50%;
        height: 31px;
        width: 31px;

        img {
          width: 100%;
          display: block;
        }
      }
    }

    .control {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .price {
        font-size: 16px;
        span {
          color: #000;
          font-weight: 700;
        }
      }

      .btn {
        background-color: #f2270c;
        background-image: linear-gradient(
          135deg,
          #f2140c,
          #f2270c 70%,
          #f24d0c
        );
        border-radius: 20px;
        color: #fff;
        display: block;
        font-size: 13px;
        font-weight: 500;
        height: 38px;
        line-height: 38px;
        margin: 6px 12px 0;
        text-align: center;
        width: 113px;
      }

      .btn.disabled {
        opacity: 0.3;
      }
    }
  }

  .grap {
    width: 100%;
    height: 10px;
    background-color: #f2f2f2;
  }

  .content {
    width: 100%;

    .content-item {
      width: 95%;
      margin: 0 auto;
      .item-header {
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        align-items: center;

        .pic {
          height: 100%;
          img {
            height: 100%;
            display: block;
          }
        }

        .title {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          margin-left: 10px;

          &-text {
            color: #333;
            font-size: 12px;
            font-weight: 700;
            margin-left: 6px;
            position: relative;
          }

          &-text::after {
            content: "";
            background: url("@/assets/icon/arrow-rt.png");
            background-size: 8px 8px;
            height: 8px;
            margin-top: -4px;
            position: absolute;
            top: 50%;
            right: -12px;
            width: 8px;
          }
        }
      }

      .item-content {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
        .pic {
          width: 30px;
          img {
            width: 100%;
            display: block;
          }
        }

        .main {
          width: 100%;
          margin-left: 5px;
          display: flex;
          align-items: center;
          .img {
            width: 100px;
            height: 100px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            img {
              height: 100%;
              display: block;
              border-radius: 15px;
            }
          }

          .desc {
            display: flex;
            flex-direction: column;
            padding: 0 10px;
            &-tittle {
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 20px;
            }

            .price-item {
              width: 100%;
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .price-text {
                color: #f2270c;
                .price {
                  font-size: 18px;
                }
              }

              .control {
                display: flex;
                align-items: center;
                .count {
                  display: block;
                  background-color: #f2f2f2;
                  border: none;
                  color: #262626;
                  font-size: 12px;
                  text-align: center;
                  width: 36px;
                }
                .btn {
                  &-sub {
                    display: block;
                    width: 15px;
                    height: 15px;
                    background: url("@/assets/icon/sub.png") no-repeat;
                    background-size: 15px 15px;
                  }

                  &-add {
                    display: block;
                    width: 15px;
                    height: 15px;
                    background: url("@/assets/icon/add.png") no-repeat;
                    background-size: 15px 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>