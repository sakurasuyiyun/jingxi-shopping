<template>
  <div>
    <div class="container">
      <Topbar text="确认订单"></Topbar>

      <div class="address">
        <div class="address-card" @click="jump('EditAddress')">
          <div class="info" v-if="addressStatus">
            <div class="add">
              <i class="normal" v-if="address.isDefault">默认</i>
              <span>{{ address.city }}</span>
            </div>
            <div class="add-detail">
              <span>{{ address.detail_address }}</span>
            </div>
            <div class="user">
              <span>{{ address.name }} {{ address.phone_number }}</span>
            </div>
          </div>
          <div class="info" v-else>
            <span
              style="
                display: block;
                padding: 20px 16px;
                font-size: 14px;
                color: #999;
              "
              >您看起来还没有收货地址，点击前往添加吧</span
            >
          </div>
          <span class="icon icon-more"></span>
        </div>
        <div class="bottom">
          <div class="pink"></div>
          <div class="blue"></div>
          <div class="pink"></div>
          <div class="blue"></div>
          <div class="pink"></div>
          <div class="blue"></div>
          <div class="pink"></div>
          <div class="blue"></div>
          <div class="pink"></div>
          <div class="blue"></div>
          <div class="pink"></div>
          <div class="blue"></div>
        </div>
        <div class="grap"></div>
      </div>
      <div class="product" v-for="(item, index) in newData" :key="index">
        <div class="product-shop">
          <div class="logo">
            <img src="@/assets/icon/shop.png" />
          </div>
          <span>{{ shopName[index] }}</span>
        </div>
        <div class="product-item" v-for="(list, num) in item" :key="num">
          <div class="img">
            <img :src="list.imgUrl" alt="" />
          </div>
          <div class="info">
            <span class="tittle">{{ list.title }}</span>
            <span class="price">
              &yen;<i>{{ list.price }}</i
              >.00<span class="rule"
                >{{ list.price }} * {{ list.count }}</span
              ></span
            >
            <span class="tips-box">
              <span class="tips">
                <span class="tips-content"
                  >支持7天无理由退货（拆封后不支持）</span
                >
              </span>
              <span class="tips">
                <span class="tips-content">跨自营/店铺促销</span>
              </span>
              <div class="img">
                <img src="@/assets/icon/jd-market.png" alt="" />
              </div>
            </span>
          </div>
        </div>
        <div class="distribution">
          <span class="tittle">配送</span>
          <div class="time">
            <span class="express">京西快递</span>
            <p class="arr-time">
              8月21日<span class="week">[周一]</span>09:00-21:00
            </p>
          </div>
        </div>
        <div class="grap"></div>
      </div>
      <div class="order">
        <div class="order-info">
          <div class="info-item">
            <span class="title">商品金额</span>
            <span>&yen;{{ total }}.00</span>
          </div>
          <div class="info-item">
            <span class="title">运费</span>
            <span>&yen;0.00</span>
          </div>
          <div class="info-item">
            <span class="title">立减</span>
            <span>&yen;0.00</span>
          </div>
          <div class="info-item">
            <span class="title">优惠券</span>
            <span>&yen;0.00</span>
          </div>
        </div>
        <div class="total">
          <span class="tittle">合计：</span>
          <span class="total-price"
            >&yen;<i class="text-large">{{ total }}</i
            >.00</span
          >
        </div>
      </div>
      <div class="grap"></div>
      <div class="pay">
        <div class="pay-item">
          <div class="pic">
            <img src="@/assets/icon/online-pay.png" />
          </div>
          <span>在线支付</span>
          <div class="check">
            <img src="@/assets/icon/selected.png" />
          </div>
        </div>
        <div class="pay-item">
          <div class="pic">
            <img src="@/assets/icon/arrive-pay.png" />
          </div>
          <span>货到付款</span>
          <div class="check">
            <img src="@/assets/icon/unselected.png" />
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <div class="price">
          <span
            >&yen;<i class="text-large">{{ total }}</i
            >.00</span
          >
        </div>
        <div class="btn" @click="showKeyBoard">在线支付</div>
      </div>
      <div class="grap"></div>
    </div>
    <div style="height: 50px"></div>
    <div>
      <van-popup
        v-model="showKeyboard"
        round
        position="bottom"
        :style="{ height: '50%' }"
      >
        <!-- 密码输入框 -->
        <van-password-input
          :value="pw"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          style="margin-top: 5%"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="pw"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Topbar from "@/components/topBar";
import { get, post } from "@/utils/request";
export default {
  name: "OrderConfirm",
  components: {
    Topbar,
  },
  data() {
    return {
      data: [],
      newData: {},
      shopName: {},
      address: [],
      addressId: 0,
      status: 0,
      showKeyboard: false,
      pw: "",
      addressStatus: false,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    onEdit() {
      Toast("编辑");
    },
    async getData() {
      const username = localStorage.username;
      const res = await get("/gatCartList", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.formatData();
      }
    },
    formatData() {
      this.newData = {};
      this.data.forEach((item) => {
        if (!this.newData.hasOwnProperty(item.shopId) && item.isChecked) {
          this.shopName[item.shopId] = item.name;
          this.newData[item.shopId] = [];
        }
      });
      this.data.forEach((element) => {
        for (let item in this.newData) {
          if (element.shopId == item && element.isChecked) {
            this.newData[item] = [...this.newData[item], element];
          }
        }
      });
      this.isLoading = false;
    },
    jump(link) {
      this.$router.push(link);
    },
    async getAddress() {
      const username = localStorage.username;
      const res = await get("/getAddress", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        res.data.forEach((item) => {
          if (item.isDefault === 1) {
            this.address = item;
            this.addressId = item._id;
          }
        });
        this.addressStatus = true;
        console.log(this.address);
      }
    },
    async changeAddress(id) {
      const username = localStorage.username;
      const res = await get("/changeAddress", {
        username,
        id,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.address = res.data;
      }
    },
    showKeyBoard() {
      if (!this.addressStatus) {
        Toast("请添加地址后再下单");
        return;
      }
      this.showKeyboard = true;
    },
    async payPassword() {
      const username = localStorage.username;
      const res = await post("/checkPayPassword", {
        username,
        password: this.pw,
      });
      console.log(res);
      if (res?.errno === 0) {
        Toast("支付成功");
        this.status = 2;
        this.pay();
      } else {
        Toast("密码错误，请重新输入");
        this.pw = "";
      }
    },
    async pay() {
      const username = localStorage.username;
      const res = await get("/pay", {
        username,
        data: this.newData,
        address: this.addressId,
        status: this.status,
      });
      console.log(res);
      if (res?.errno === 0) {
        Toast(res.message);
        this.$router.push({ path: "/pay_finish" });
      } else {
        Toast(res.message);
        this.$router.push({ name: "Home" });
      }
    },
  },
  created() {
    const isChange = this.$route.params.addressId;
    this.getData();
    if (isChange === undefined) {
      this.getAddress();
    } else {
      this.addressId = isChange;
      this.changeAddress(isChange);
      this.addressStatus = true;
    }
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
  },
  watch: {
    pw(value) {
      if (value.length === 6) {
        console.log(value);
        this.payPassword();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  font-style: normal;
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
  overflow-x: hidden;

  .address {
    width: 100%;
    &-card {
      padding: 8px 0px;
      position: relative;
      width: 92%;
      margin: 0 auto;

      .info {
        width: 100%;
        display: flex;
        flex-direction: column;

        .add {
          height: 30px;
          line-height: 30px;
          color: #1a1a1a;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .normal {
            font-style: normal;
            align-items: center;
            border-radius: 3px;
            color: #fff;
            font-size: 12px;
            height: 12px;
            line-height: 1.2;
            margin-right: 6px;
            width: 24px;
            padding: 0 3px;
            background: linear-gradient(
              135deg,
              rgb(250, 44, 25) 0%,
              rgb(250, 54, 12) 45%,
              rgb(250, 81, 12) 83%,
              rgb(250, 92, 12) 100%
            );
          }

          &-detail {
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #1a1a1a;
            display: -webkit-box;
            font-size: 18px;
            font-weight: 700;
            line-height: 22px;
            margin-top: 2px;
            overflow: hidden;
          }
        }

        .user {
          color: #1a1a1a;
          font-size: 14px;
          line-height: 18px;
          margin-bottom: 6px;
          margin-top: 8px;
        }
      }
    }

    .bottom {
      display: flex;
      .pink {
        background: #ff7967;
        border-radius: 1px 1px 0 0;
        flex: 1;
        height: 4px;
        transform: skew(-30deg);
        width: 22px;
      }

      .blue {
        background: #7ca8ff;
        border-radius: 1px 1px 0 0;
        flex: 1;
        height: 4px;
        transform: skew(-30deg);
        width: 22px;
      }

      .pink:not(:first-child) {
        margin-left: 10px;
      }

      .blue:not(:first-child) {
        margin-left: 10px;
      }
    }
  }

  .grap {
    width: 100%;
    height: 15px;
    background-color: #f2f2f2;
  }

  .product {
    width: 100%;
    padding: 8px 0;
    &-shop {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 5px;
      margin-left: 20px;
      .logo {
        width: 14px;
        height: 14px;
        margin-right: 10px;

        img {
          width: 100%;
          display: block;
        }
      }
    }

    &-item {
      width: 100%;
      margin-top: 10px;
      display: flex;
      padding: 10px 20px;
      .img {
        width: 90px;
        height: 90px;
        flex-shrink: 0;
        img {
          width: 100%;
          display: block;
        }
      }

      .info {
        .tittle {
          display: block;
          padding: 0 10px;
          color: #1a1a1a;
          font-size: 14px;
          line-height: 1.2;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .price {
          position: relative;
          display: block;
          padding: 0 10px;
          color: #fa2c19;
          font-size: 12px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 10px;
          i {
            font-style: normal;
            font-size: 18px;
            font-weight: 700;
          }

          .rule {
            position: absolute;
            top: 0;
            right: 0;
            color: grey;
            font-size: 12px;
          }
        }

        .tips-box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-top: 5px;
          .tips {
            margin-left: 10px;
            align-items: center;
            background: #fff;
            border: 1px solid rgba(250, 44, 25, 0.5);
            border-radius: 3px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            margin-right: 3px;
            margin-top: 3px;
            max-width: 90%;
            overflow: auto;
            padding: 0 3px;
            transform: scale(1);
            width: -moz-fit-content;
            width: fit-content;

            &-content {
              display: block;
              color: #fa2c19;
              font-size: 9px;
              line-height: 1.2;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .img {
            width: 46px;
            height: 13px;
            margin: 3px 3px 0 0;
            align-self: center;

            img {
              height: 100%;
              display: block;
            }
          }
        }
      }
    }

    .distribution {
      width: 100%;
      padding-left: 15px;
      padding-top: 16px;
      padding-bottom: 16px;
      display: flex;
      justify-content: space-between;

      .tittle {
        color: #1a1a1a;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .time {
        align-items: flex-end;
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-left: 8px;
        // overflow: hidden;
        margin-right: 15px;

        .express {
          position: relative;
          align-items: center;
          color: #1a1a1a;
          display: flex;
          font-size: 14px;
          line-height: 22px;
          max-width: 100%;
          //   overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .express::after {
          content: "";
          position: absolute;
          top: 0;
          right: -10px;
          height: 8px;
          margin-left: 4px;
          margin-top: 7px;
          width: 8px;
          background: url("@/assets/icon/arrow-rt.png") no-repeat 50%/100%;
        }

        .arr-time {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .week {
            color: #fa2c19;
            margin-left: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .order {
    width: 100%;
    padding: 8px 16px;

    &-info {
      width: 100%;

      .info-item {
        width: 100%;
        color: #1a1a1a;
        font-size: 14px;
        line-height: 14px;
        overflow: hidden;
        padding: 12px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
      }
    }

    .total {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;
      height: 46px;
      color: #1a1a1a;
      overflow: hidden;
      text-align: right;
      white-space: nowrap;
      &-price {
        color: #fa2c19;
        font-size: 12px;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;

        .text-large {
          font-size: 18px;
        }
      }
    }
  }

  .pay {
    width: 100%;
    padding: 0 16px;

    &-item {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 8px 0;
      .pic {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          display: block;
        }
      }

      span {
        display: block;
        margin-left: 10px;
      }

      .check {
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        margin-left: auto;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }

  .bottom-content {
    width: 100%;
    height: 50px;
    padding: 8px 16px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .price {
      color: #fa2c19;
      font-size: 16px;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
      .text-large {
        font-size: 22px;
      }
    }

    .btn {
      background: #fa2c19;
      background: linear-gradient(
        135deg,
        #fa2c19,
        #fa3f19 45%,
        #fa5919 83%,
        #fa6419
      );
      border: none;
      display: block;
      flex-direction: column;
      font-weight: 700;
      justify-content: center;
      color: white;
      border-radius: 21px;
      box-sizing: border-box;
      color: #fff;
      display: flex;
      font-size: 14px;
      height: 38px;
      justify-content: center;
      line-height: 1.2;
      margin: 0;
      outline: none;
      padding: 0 26px;
      transform: scale(1);
      white-space: nowrap;
      width: auto;
    }
  }
}
</style>