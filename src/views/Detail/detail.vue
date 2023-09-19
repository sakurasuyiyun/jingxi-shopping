<template>
  <div ref="container">
    <template>
      <van-skeleton
        :row="11"
        :row-width="width"
        :loading="!isShow"
        style="margin-top: 50vh"
      />
    </template>
    <template>
      <van-overlay :show="show" @click.stop="show = false">
        <div class="pic">
          <img :src="activeImg" />
        </div>
      </van-overlay>
    </template>
    <div class="container" v-if="isShow">
      <div class="top fixed">
        <div class="pic">
          <!-- 顶部按钮 -->
          <div class="top-control">
            <div class="back" @click="back" :style="{ opacity }">
              <span class="icon icon-back"></span>
            </div>
            <div class="more">
              <span class="icon icon-more"></span>
            </div>
          </div>

          <div class="top-control_nav" :style="{ opacity: opacity2 }">
            <div class="back-nav" @click="back">
              <img src="@/assets/icon/arrow-lt.png" />
            </div>

            <span class="text active">商品</span>
            <span class="text">评价</span>
            <span class="text">详情</span>
            <span class="text">推荐</span>

            <div class="more-nav">
              <img src="@/assets/icon/more.png" />
            </div>
          </div>

          <!-- 商品图片 -->
          <van-swipe style="z-index: 1">
            <van-swipe-item v-for="(item, index) in data.imgUrls" :key="index">
              <img :src="item.imgUrl" @click="showBig(index)"
            /></van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="desc">
        <div class="title">
          <span
            >&yen;
            <span class="price price-large">{{
              data.productInfo.price.split(".")[0]
            }}</span
            >.{{ data.productInfo.price.split(".")[1] }}</span
          >
        </div>
        <div class="collect">
          <span
            :class="{
              icon: 'icon',
              'icon-favour': !isFavour,
              'icon-favour_selected': isFavour,
            }"
            @click="favour"
            >收藏</span
          >
        </div>
        <div class="product-desc">
          <div class="tag">
            <img src="@/assets/icon/jingxi-smallhome.png" />
          </div>
          <span>京西旗下智能生活品牌</span>
        </div>
        <div class="description">
          <div class="tag">
            <img src="@/assets/icon/self.png" />
          </div>
          <span>{{ data.productInfo.title }}</span>
        </div>
        <div class="ad" v-if="data.productInfo.desc">
          <span class="text"
            >{{ data.productInfo.desc }}
            <i>查看&gt;</i>
          </span>
        </div>
        <div class="rank">
          <div class="bg">
            <div class="tag">
              <img src="@/assets/icon/rank.png" />
            </div>
            <span>热卖榜第12名</span>
            <div class="more">
              <img src="@/assets/icon/arrow_rt.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="grap"></div>
      <div class="discounts">
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </div>
      <div class="grap"></div>
      <!-- 商品评论 -->
      <div class="comment" ref="comment">
        <div class="title">
          <span>评价</span>
          <span class="count">50万+</span>
          <div class="good">
            好评度 99% <span class="icon icon-arrow"></span>
          </div>
        </div>
        <div class="comment-item">
          <div class="info">
            <div class="avater">
              <img src="@/assets/icon/avater.png" alt="" />
            </div>
            <div class="user">京西用户8349</div>
            <div class="star">
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
            </div>
            <div class="time">2023-8-18</div>
          </div>
          <div class="content">
            <p>
              空调很好看，非常简洁，很洋气，买的一级能效的非常省电，制冷效果也很好，家里的电器买的都是海尔的，智能家居蒙手机控制，很方便！师傅安装的时候态度也很好，很快，安装价格透明
            </p>
          </div>
          <div class="show-img">
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/2.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/3.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/4.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/5.webp" alt="" />
            </div>
          </div>
        </div>
        <van-divider />
        <div class="comment-item">
          <div class="info">
            <div class="avater">
              <img src="@/assets/icon/avater.png" alt="" />
            </div>
            <div class="user">京西用户8349</div>
            <div class="star">
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
            </div>
            <div class="time">2023-8-18</div>
          </div>
          <div class="content">
            <p>
              空调很好看，非常简洁，很洋气，买的一级能效的非常省电，制冷效果也很好，家里的电器买的都是海尔的，智能家居蒙手机控制，很方便！师傅安装的时候态度也很好，很快，安装价格透明
            </p>
          </div>
          <div class="show-img">
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/2.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/3.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/4.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/5.webp" alt="" />
            </div>
          </div>
        </div>
        <van-divider />
        <div class="comment-item">
          <div class="info">
            <div class="avater">
              <img src="@/assets/icon/avater.png" alt="" />
            </div>
            <div class="user">京西用户8349</div>
            <div class="star">
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
              <span class="icon icon-star"></span>
            </div>
            <div class="time">2023-8-18</div>
          </div>
          <div class="content">
            <p>
              空调很好看，非常简洁，很洋气，买的一级能效的非常省电，制冷效果也很好，家里的电器买的都是海尔的，智能家居蒙手机控制，很方便！师傅安装的时候态度也很好，很快，安装价格透明
            </p>
          </div>
          <div class="show-img">
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/2.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/3.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/4.webp" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/img/products/xinfei/1/5.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="grap"></div>
      <div class="shop">
        <div class="top">
          <div class="logo">
            <img :src="data.shop.imgUrl_shop" />
          </div>
          <div class="name">
            <span>{{ data.shop.name }}</span>
            <span class="self">京西自营</span>
          </div>
        </div>
        <div class="middle">
          <div class="left">
            <p>{{ data.shop.follow }}</p>
            <p class="desc-text">粉丝人数</p>
          </div>
          <div class="divider"></div>
          <div class="right">
            <p>{{ data.shop.count }}</p>
            <p class="desc-text">全部商品</p>
          </div>
        </div>
        <div class="shop-bottom">
          <div class="btn active" @click="followShop" v-if="shopFollow">
            <i class="icon icon-follow-active"></i>
            取消关注店铺
          </div>
          <div class="btn" @click="followShop" v-else>
            <i class="icon icon-follow"></i>
            关注店铺
          </div>
          <div class="btn">
            <i class="icon icon-shop"></i>
            进入店铺
          </div>
        </div>
      </div>
      <div class="bottom">
        <van-goods-action>
          <van-goods-action-icon
            icon="chat-o"
            text="客服"
            @click="jump('CustomerService')"
          />
          <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            @click="jump('Cart')"
          />
          <van-goods-action-icon
            icon="shop-o"
            text="店铺"
            @click="jump('Shop')"
          />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="addCart"
          />
          <van-goods-action-button type="danger" text="立即购买" @click="orderNowJump" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1690819200,
  endAt: 1703952000,
  valueDesc: "1.5",
  unitDesc: "元",
};
import { Toast } from "vant";
import { Dialog } from "vant";
import { get, post } from "@/utils/request";
export default {
  name: "Detail",
  computed: {
    orderNow() {
      return orderNow
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      data: {},
      isShow: false,
      width: [
        "80%",
        "40%",
        "50%",
        "70%",
        "50%",
        "60%",
        "80%",
        "40%",
        "70%",
        "100%",
        "100%",
      ],
      productId: 0,
      badge: 0,
      shopId: 0,
      isFavour: false,
      active: 0,
      imgLength: 0,
      container: null,
      opacity: 1,
      opacity2: 0,
      show: false,
      activeImg: "",
      shopFollow: false
      // isLogin: false,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    jump(link) {
      this.$router.push({ name: link });
    },
    async getProductDetail(id) {
      const res = await get("/getProductDetail", {
        productId: id,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.shopId = res.data.shop.shopId;
        this.imgLength = res.data.imgUrls.length;
        this.isShow = true;
        this.getShopFavour()
      }
    },
    checkLogin() {
      const token = localStorage.token;
      if (!token) return;
      this.getUser(token);
      return true;
    },
    async getCartCount() {
      const res = await get("/getCartCount", {
        user: localStorage.username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.badge = res.count;
      }
    },
    async addCart() {
      const _this = this;
      if (!this.checkLogin()) {
        Dialog.confirm({
          title: "您看起来还没有登陆",
          message: "检测到您还未登陆，是否前往登陆",
          beforeClose(action, done) {
            if (action === "confirm") {
              setTimeout(() => {
                done();
                _this.$router.push({ name: "Login" });
              }, 1000);
            } else {
              window.location.reload();
            }
          },
        });
        return;
      }
      const res = await get("/addCart", {
        productId: this.productId,
        user: localStorage.username,
        shopId: this.shopId,
      });
      Toast(res.message);
    },
    async getUser(token) {
      const res = await get("/checkToken", {
        token,
      });
      if (res?.errno === 0) {
        localStorage.username = res.username;
        this.getFavor();
      }
    },
    async favour() {
      if (!this.checkLogin()) {
        Dialog.confirm({
          title: "您看起来还没有登陆",
          message: "检测到您还未登陆，是否前往登陆",
          beforeClose(action, done) {
            if (action === "confirm") {
              setTimeout(() => {
                done();
                _this.$router.push({ name: "Login" });
              }, 1000);
            } else {
              window.location.reload();
            }
          },
        });
        return;
      }
      const res = await get("/addProductFavour", {
        productId: this.productId,
        username: localStorage.username,
        isFavour: this.isFavour,
      });
      Toast(res.message);
      this.getFavor();
    },
    async getFavor() {
      const username = localStorage.username;
      const token = localStorage.token;
      if (username === undefined && token === undefined) {
        return;
      }
      const res = await get("/getFavaour", {
        username: localStorage.username,
        productId: this.productId,
      });
      console.log(res);
      if (res?.errno === 0) {
        if (res?.data.isFavour == 1) {
          this.isFavour = true;
          return;
        } else {
          this.isFavour = false;
        }
      } else {
        this.isFavour = false;
      }
    },
    handleScroll(e) {
      e.stopPropagation();

      const top = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageYOffset
      );

      console.log(top >= this.$refs.comment.offsetTop);

      if (top >= 50) {
        this.opacity = 0;
        this.opacity2 = 1;
      } else if (top < 50) {
        this.opacity = 1;
        this.opacity2 = 0;
      }
    },
    showBig(index) {
      this.activeImg = this.data.imgUrls[index].imgUrl;
      this.show = true;
    },
    async footMark() {
      const token = localStorage.token;
      const username = localStorage.username;
      if (token === undefined && username === undefined) {
        return;
      }
      const res = await post("/footMark", {
        username,
        productId: this.productId,
      });
      console.log(res);
    },
    async shopFavor() {
      const username = localStorage.username;
      const res = await get("/addShopFavourte", {
        username,
        shopId: this.shopId,
      });
      console.log(res);

    },
    async followShop(){
      const username = localStorage.username;
      if(!username){
        Toast('您看起来还没有登陆，请先登陆')
        return
      };
      const res = await get('/followShop',{
        username,
        shopId:this.shopId
      })
      console.log(res)
      Toast(res.message)
      this.getShopFavour()
    },
    async getShopFavour(){
      const username = localStorage.username;
      if(!username) return;
      const res = await get('/getShopFollow',{
        username,
        shopId:this.shopId
      })
      console.log(res)
      if(res?.errno === 0){
        this.shopFollow = true
      }else {
        this.shopFollow = false
      }
    },
    orderNowJump(){
      this.$router.push({name: 'OrderNow',params:{productId:this.productId}})
    }
  },
  created() {
    this.getProductDetail(this.$route.params.productId);
    this.productId = this.$route.params.productId;
    this.checkLogin();
    this.getFavor();
  },
  mounted() {
    setTimeout(() => {
      window.addEventListener("scroll", this.handleScroll, true);
    }, 300);
    this.footMark();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style lang="scss" scoped>
.icon {
  &-back {
    width: 20px;
    height: 20px;
    margin: 12px 0 0 10px;
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url("@/assets/icon/back-white.png") no-repeat 50%;
    background-size: 20px 20px;
    margin: 0;
  }

  &-more {
    width: 20px;
    height: 20px;
    margin: 12px 0 0 10px;
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url("@/assets/icon/more-white.png") no-repeat 50%;
    background-size: 20px 20px;
    margin: 0;
  }

  &-favour {
    position: absolute;
    top: 0;
    right: 0;
    color: #262626;
    font-size: 9px;
    height: 10px;
    line-height: 20px;
    padding-top: 18px;
    text-align: center;
    width: 40px;
  }

  &-favour::after {
    content: "";
    background-image: url("@/assets/icon/favour.png");
    background-size: 100%;
    height: 18px;
    left: 50%;
    position: absolute;
    top: 5px;
    transform: translate(-50%);
    width: 18px;
  }

  &-favour_selected {
    position: absolute;
    top: 0;
    right: 0;
    color: #262626;
    font-size: 9px;
    height: 10px;
    line-height: 20px;
    padding-top: 18px;
    text-align: center;
    width: 40px;
  }

  &-favour_selected::after {
    content: "";
    background-image: url("@/assets/icon/favaour-selected.png");
    background-size: 100%;
    height: 18px;
    left: 50%;
    position: absolute;
    top: 5px;
    transform: translate(-50%);
    width: 18px;
  }

  &-arrow {
    background: url("@/assets/icon/arrow-rt.png") no-repeat;
    background-size: cover;
    height: 12px;
    margin-top: -1px;
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
  }

  &-star {
    background: url("@/assets/icon/star.png");
    background-size: cover;
    display: inline-block;
    height: 10px;
    margin-right: 2px;
    top: 0;
    width: 10px;
  }

  &-follow {
    background: url("@/assets/icon/shop-favour.png") no-repeat 50%;
    background-size: 100%;
    display: inline-block;
    height: 14px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    vertical-align: middle;
    width: 14px;
  }

  &-follow-active {
    background: url("@/assets/icon/favoured.png") no-repeat 50%;
    background-size: 100%;
    display: inline-block;
    height: 14px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    vertical-align: middle;
    width: 14px;
    border-color: #f2270c;
  }

  &-shop {
    background: url("@/assets/icon/shop.png") no-repeat 50%;
    background-size: 100%;
    display: inline-block;
    height: 14px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    vertical-align: middle;
    width: 14px;
  }
}

.container {
  width: 100%;

  .top {
    position: relative;

    &-control {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      transition: opacity 0.6s;
    }

    &-control_nav {
      width: 100%;
      position: fixed;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      z-index: 999;
      margin: 7px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: opacity 0.6s;

      .back-nav {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        img {
          width: 100%;
          display: block;
        }
      }

      .text {
        display: block;
        color: #262626;
        font-size: 13px;
        position: relative;
        height: 50px;
        width: auto;
      }

      .text.active {
        font-size: 14px;
        font-weight: 700;
      }

      .more-nav {
        width: 20px;
        height: 20px;
        margin-top: 16px;
        margin-right: 16px;
        img {
          width: 100%;
          display: block;
        }
      }
    }

    .back {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #666;
      padding: 5px;
      box-sizing: content-box;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      margin: 7px 0 0 5px;
    }

    .more {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #666;
      padding: 5px;
      box-sizing: content-box;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      margin: 7px 5px 0 0;
    }

    .pic {
      width: 100%;
      img {
        width: 100%;
        display: block;
      }
    }
  }

  .desc {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-top: 12px;
    font-size: 12px;
    margin-bottom: 5px;
    .title {
      height: 40px;
      line-height: 40px;
      color: #f2270c;
      font-size: 18px;
      font-weight: 400;
      .price {
        display: inline-block;
        font-size: 16px;
        line-height: 40px;
        &-large {
          font-size: 30px;
        }
      }
    }

    .product-desc {
      width: 100%;
      margin-top: 20px;
      .tag {
        display: inline-block;
        height: 13px !important;
        line-height: 13px !important;
        margin-right: 5px !important;
        margin-top: -2px;
        color: #333;
        img {
          height: 100%;
          vertical-align: middle;
        }
      }
    }

    .description {
      width: 100%;
      margin-top: 15px;
      font-weight: 700;
      line-height: 21px;
      color: #262626;
      font-size: 16px;
      .tag {
        display: inline-block;
        height: 13px !important;
        line-height: 13px !important;
        margin-right: 5px !important;
        margin-top: -2px;
        color: #333;
        img {
          height: 100%;
          vertical-align: middle;
        }
      }
    }
  }

  .ad {
    width: 100%;
    margin-top: 20px;
    .text {
      color: #262626;
      font-size: 12px;
      line-height: 1.3;
      max-height: 46px;
      overflow: hidden;
      padding: 18px 0 0;

      i {
        font-style: normal;
        color: #e4393c;
        text-decoration: underline;
      }
    }
  }

  .rank {
    width: 100%;
    margin-top: 10px;

    .bg {
      position: relative;
      width: 100%;
      background: url("@/assets/icon/bg-pink.png") no-repeat center;
      background-size: 100% 100%;
      height: 25px;
      border-radius: 25px;
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        color: #fa2c19;
        margin-left: 5px;
      }

      .tag {
        height: 25px;
        display: inline-block;
        img {
          height: 100%;
          display: block;
        }
      }

      .more {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }

  .grap {
    width: 100%;
    height: 20px;
    background-color: #f2f2f2;
  }

  .comment {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;

    .title {
      position: relative;
      width: 95%;
      margin: 0 auto;
      height: 45px;
      line-height: 45px;
      margin-top: 3px;
      padding-left: 8px;
      color: #262626;
      font-size: 15px;
      font-weight: 700;
    }

    .title::before {
      background-image: linear-gradient(180deg, #f5503a, #fad1cb);
      content: "";
      height: 15px;
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
    }

    .count {
      font-size: 12px;
      height: 45px;
      line-height: 45px;
      margin-left: 10px;
    }

    .good {
      position: absolute;
      top: 0;
      right: 30px;
      color: #8c8c8c;
      font-size: 12px;
      font-weight: normal;
    }

    &-item {
      .info {
        position: relative;
        width: 95%;
        margin: 0 auto;
        height: 20px;
        line-height: 20px;
        display: flex;
        align-items: center;
        margin-top: 20px;

        .avater {
          height: 20px;
          img {
            height: 100%;
            vertical-align: middle;
            //   display: block;
          }
        }

        .user {
          margin-left: 10px;
        }

        .star {
          margin-left: 10px;
        }

        .time {
          position: absolute;
          color: #999;
          font-size: 12px;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
        }
      }

      .content {
        width: 95%;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        text-overflow: ellipsis;
        font-size: 13px;
        line-height: 1.5;
        margin: 18px auto;
        max-height: 126px;
        overflow: hidden;
        white-space: normal;
        word-break: break-all;
      }

      .show-img {
        width: 95%;
        margin: 0 auto;

        .item {
          width: 80px;
          height: 80px;
          background-color: #f3f3f3;
          border-radius: 6px;
          display: inline-block;
          margin-right: 6px;
          overflow: hidden;
          text-align: center;

          img {
            width: 100%;
            display: block;
          }
        }
      }
    }
  }

  .shop {
    width: 95%;
    margin: 0 auto;
    border-radius: 12px;
    margin-top: 12px;
    font-size: 14px;
    color: #333;
    padding: 18px;
    margin-top: 20px;
    margin-bottom: 50px;

    .top {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      .logo {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          display: block;
        }
      }

      .name {
        margin-left: 10px;
        font-size: 14px;
        display: flex;
        align-items: center;

        .self {
          background-image: linear-gradient(
            -46deg,
            #f24d0c,
            #f2270c 27%,
            #f2140c
          );
          border-radius: 2px;
          color: #fff;
          display: block;
          font-size: 10px;
          height: 13px;
          line-height: 13px;
          margin-left: 6px;
          width: 49px;
        }
      }
    }

    .middle {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .left {
        width: 45%;
        text-align: center;
        padding-top: 20px;
        p {
          height: 20px;
          line-height: 20px;
        }
        .desc-text {
          color: #999;
          margin-top: 5px;
        }
      }
      .divider {
        border-right: 1px solid #ddd;
        position: absolute;
        height: 30px;
        right: 50%;
        top: calc(50% + 10px);
        transform: translateX(-50%) translateY(-50%);
        width: 0;
      }
      .right {
        width: 45%;
        text-align: center;
        padding-top: 20px;
        p {
          height: 20px;
          line-height: 20px;
        }
        .desc-text {
          color: #999;
          margin-top: 5px;
        }
      }
    }

    .shop-bottom {
      width: 80%;
      margin: 0 auto;
      margin-top: 15px;
      //   border: 1px solid black;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .btn {
        background-color: #fff;
        border: none;
        border-radius: 15px;
        flex: 0 1 104px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        margin: 0 13px 0 0;
        position: relative;
        text-align: center;
        border: 1px solid rgb(211, 211, 211);
      }

      .active{
        color: #f2270c;
      }
    }
  }
}
// 遮罩层
.van-overlay {
  z-index: 9999 !important;
  position: fixed;
  width: 100%;
  height: 100vh;

  .pic {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: auto;
    background: #fff;

    img {
      width: 100%;
      display: block;
    }
  }
}
</style>