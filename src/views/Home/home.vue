<template>
  <div>
    <div class="container">
      <div class="top">
        <div class="left">
          <span class="icon icon-category"></span>
        </div>
        <div class="middle">
          <div class="search" @click="jump('Search')">
            <span class="icon icon-logo">JX</span>
            <span class="grap"></span>
            <span class="iconfont icon-search">&#xe602;</span>
            <span class="recommend">华帝燃气灶</span>
          </div>
        </div>
        <div class="right" v-if="!isLogin" @click="jump('Login')">登陆</div>
        <div class="right" v-else>
          <div class="pic">
            <img src="@/assets/img/bg/avater.jpeg" alt="" />
          </div>
        </div>
      </div>
      <div class="swiper">
        <van-swipe
          class="swiper-content"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item v-for="(item, index) in swiper" :key="index">
            <img :src="item.src" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="box-list">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="pic">
            <img :src="item.src" />
          </div>
          <p>{{ item.title }}</p>
        </div>
      </div>

      <div class="sec-kill">
        <div class="sec-kill_top">
          <span class="title">京西秒杀</span>
          <span class="time">16</span>
          <div class="remaining-time">
            <span>00</span>: <span>00</span>:
            <span>00</span>
          </div>
          <i class="icon icon-arrow"></i>
        </div>
      </div>

      <div class="products">
        <div
          class="product"
          v-for="(item, index) in data"
          :key="index"
          @click="jump('Detail', item.productId)"
        >
          <div class="product-img">
            <img v-lazy="item.imgUrl" />
          </div>
          <div class="title">
            {{ item.title }}
          </div>
          <div class="price">
            &yen;
            <i>{{ item.price }}</i>
          </div>
          <div class="bottom">
            <img src="@/assets/icon/self.png" />
            <span class="tag"> 10万+条评论 </span>
          </div>
        </div>
      </div>

      <div class="footer"></div>

      <TabBar :active="0"></TabBar>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import { Toast } from "vant";
import TabBar from "@/components/tabBar";
export default {
  name: "Home",
  components: {
    TabBar,
  },
  data() {
    return {
      swiper: [
        { id: 1, src: require("@/assets/img/carousel/bg1.jpeg") },
        { id: 2, src: require("@/assets/img/carousel/bg2.jpg") },
        { id: 3, src: require("@/assets/img/carousel/bg3.jpeg") },
        { id: 4, src: require("@/assets/img/carousel/bg4.jpg") },
        { id: 5, src: require("@/assets/img/carousel/bg5.jpeg") },
        { id: 6, src: require("@/assets/img/carousel/bg6.jpg") },
        { id: 7, src: require("@/assets/img/carousel/bg7.jpg") },
      ],
      list: [
        {
          id: 1,
          src: require("@/assets/img/item/auction.png"),
          title: "京西拍卖",
        },
        {
          id: 2,
          src: require("@/assets/img/item/electric.png"),
          title: "京西电器",
        },
        {
          id: 3,
          src: require("@/assets/img/item/fresh.png"),
          title: "京西生鲜",
        },
        {
          id: 4,
          src: require("@/assets/img/item/hours.png"),
          title: "京西到家",
        },
        {
          id: 5,
          src: require("@/assets/img/item/internation.png"),
          title: "京西国际",
        },
        {
          id: 6,
          src: require("@/assets/img/item/market.png"),
          title: "京西超市",
        },
        {
          id: 7,
          src: require("@/assets/img/item/near.png"),
          title: "附近好店",
        },
        {
          id: 8,
          src: require("@/assets/img/item/outfit.png"),
          title: "服饰美妆",
        },
        {
          id: 9,
          src: require("@/assets/img/item/plus.png"),
          title: "PLUS会员",
        },
        {
          id: 10,
          src: require("@/assets/img/item/recharge.png"),
          title: "充值中心",
        },
      ],
      data: [],
      isLogin: true,
      username: "",
    };
  },
  methods: {
    async init() {
      const res = await get("/checkCookie", {
        token: localStorage.token,
      });
      console.log(res);
      if (res?.errno === 0) {
        localStorage.username = res.username;
      } else {
        Toast("您还未登陆");
      }
    },
    jump(link, param) {
      this.$router.push({ name: link, params: { productId: param } });
    },
    async getProduct() {
      const res = await get("/getProducts");
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
      }
    },
    async checkLogin() {
      const token = localStorage.token;
      if (!token) {
        this.isLogin = false;
        return;
      }
      const res = await get("/checkToken", {
        token,
      });
      if (res?.errno === 0) {
        localStorage.username = res.username;
        this.username = res.username;
        this.isLogin = true;
      }
    },
  },
  created() {
    this.checkLogin();
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
i {
  font-style: normal;
}
.icon {
  &-category {
    margin: 10px 0 0 15px;
    width: 20px;
    height: 18px;
    display: block;
    background: url("@/assets/icon/category.png") no-repeat;
    background-size: 100% 100%;
  }

  &-logo {
    width: 35px;
    height: 40px;
    display: block;
    color: red;
    font-weight: 500;
    font-size: 20px;
    padding: 0 0 0 10px;
  }

  &-search {
    margin-left: 10px;
  }

  &-arrow {
    display: block;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: url("@/assets/icon/arrow_rt.png") no-repeat;
    background-size: cover;
  }
}
.container {
  width: 100%;
  background-color: #f6f6f6;
  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #e43130;
    color: white;

    .left {
      width: 40px;
      span {
        display: block;
      }
    }

    .middle {
      width: calc(100% - 80px);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba($color: #000000, $alpha: 0.6);
      .search {
        width: 90%;
        height: 30px;
        background-color: #fff;
        border-radius: 20px;
        position: relative;
        display: flex;
        align-items: center;

        .grap {
          display: block;
          width: 0;
          height: 20px;
          border-right: 1px solid #eee;
        }

        .recommend {
          margin-left: 10px;
        }
      }
    }

    .right {
      width: 40px;
      text-align: center;
      font-size: 14px;
      margin-right: 10px;
      .pic {
        width: 100%;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }

  .swiper {
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 10px;
    .swiper-content .van-swipe-item img {
      width: 100%;
      display: block;
      border-radius: 10px;
    }
  }

  .box-list {
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 10px;
    .item {
      width: 70px;
      height: 70px;
      padding: 10px 0;
      text-align: center;
      .pic {
        box-sizing: content-box;
        width: 40px;
        height: 40px;
        padding: 0 15px;
        img {
          width: 100%;
          display: block;
        }
      }
      p {
        margin-top: 5px;
        color: #666;
      }
    }
  }

  .sec-kill {
    position: relative;
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
    &_top {
      width: 100%;
      background: url("@/assets/img/bg/bg1.png") no-repeat;
      background-size: contain;

      .title {
        font-weight: bold;
        font-size: 14px;
      }

      .time {
        height: 100%;
        font-size: 13px;
        color: #ff2727;
        letter-spacing: 0;
        padding-right: 5px;
        padding-left: 5px;
        margin-right: 4px;
        line-height: 18px;
      }

      .time::after {
        content: "";
        display: inline-block;
        width: 20px;
        height: 17px;
        background: url("@/assets/icon/seckill-time.png") no-repeat;
        background-position: 50%;
        background-size: contain;
        vertical-align: middle;
      }

      .remaining-time {
        display: inline-block;
        color: #f2270c;
        span {
          color: white;
          background-image: linear-gradient(-140deg, #ff6152, #fa2c19);
          background-color: #fa2c19;
          border-radius: 5px;
          padding: 2px 1px;
          text-align: center;
          font-weight: 400;
        }
      }
    }
  }

  .products {
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .product {
      width: 160px;
      margin-bottom: 10px;
      margin-left: 10px;
      // margin-right: 10px;
      background-color: #fff;
      border-radius: 10px;

      .product-img {
        width: 100%;

        img {
          width: 100%;
          display: block;
          border-radius: 10px 10px 0 0;
        }
      }

      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        width: 100%;
        font-size: 14px;
        height: 42px;
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-size-adjust: 100%;
        word-break: break-all;
        color: #434343;
        padding: 0 5px;
        margin-top: 5px;
      }

      .price {
        color: #ff4142;
        font-weight: 400;
        margin-bottom: 5px;
        padding: 0 5px;
        i {
          font-size: 20px;
        }
      }

      .bottom {
        width: 100%;
        height: 14px;
        line-height: 14px;
        display: flex;
        margin-top: 5px;
        margin-bottom: 10px;
        padding: 0 5px;
        img {
          width: 24px;
          height: 14px;
          vertical-align: middle;
        }

        .tag {
          display: inline-block;
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }

  .footer {
    height: 100px;
  }
}
</style>