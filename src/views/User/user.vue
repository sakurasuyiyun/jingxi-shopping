<template>
  <div>
    <div class="container">
      <TopBar text="我的京西"></TopBar>
      <div class="bg">
        <div class="avater">
          <img :src="data.avater" />
          <div class="edit" @click="jump('ChangeAvater')">修改</div>
        </div>
        <div class="info">
          <div class="name">{{ data.userNickName }}</div>
          <div class="tags">
            <div class="tag">京享值</div>
            <div class="tag point">小白守约9999分</div>
          </div>
          <span class="icon icon-setting" @click="jump('Setting')"></span>
        </div>
      </div>
      <div class="my-cell">
        <div class="cell-item" @click="jump('FavourProduct')">
          <span>商品收藏</span>
          <i>{{ data.favour_product }}</i>
        </div>
        <div class="cell-item">
          <span>店铺收藏</span>
          <i>{{data.shop_fav}}</i>
        </div>
        <div class="cell-item" @click="jump('FootMark')">
          <span>我的足迹</span>
          <i>{{ data.foot_mark }}</i>
        </div>
      </div>
      <div class="my-controls">
        <div class="control-item" @click="jump('OrderList', 1)">
          <div class="pic">
            <img src="@/assets/icon/pay-wait.png" />
          </div>
          <div class="control-item-title">待付款</div>
        </div>
        <div class="control-item" @click="jump('OrderList', 2)">
          <div class="pic">
            <img src="@/assets/icon/receive-wait.png" />
          </div>
          <div class="control-item-title">待收货</div>
        </div>
        <div class="control-item" @click="jump('OrderList', 0)">
          <div class="pic">
            <img src="@/assets/icon/refund.png" />
          </div>
          <div class="control-item-title">退换/售后</div>
        </div>
        <div class="control-item" @click="jump('OrderList', 0)">
          <div class="pic">
            <img src="@/assets/icon/all-order.png" />
          </div>
          <div class="control-item-title">全部订单</div>
        </div>
      </div>
      <TabBar :active="3"></TabBar>
      <div style="height: 50px"></div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import TopBar from "@/components/topBar";
import TabBar from "@/components/tabBar";
import { Dialog, Toast } from "vant";
export default {
  name: "User",
  components: {
    TopBar,
    TabBar,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      username: "",
      data: [],
    };
  },
  methods: {
    jump(link, status) {
      if (status === undefined) {
        this.$router.push({ name: link });
      } else {
        this.$router.push({ name: link, params: { status } });
      }
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
      console.log(res);
      if (res?.errno === 0) {
        localStorage.username = res.username;
        this.username = res.username;
        this.getData();
      } else {
        Toast("token过期，请重新登陆");
        this.$router.push({ name: "Login" });
      }
    },
    async getData() {
      const username = localStorage.username;
      const res = await get("/getUser", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
      }
    },
  },
  created() {
    this.checkLogin();
  },
  beforeRouteEnter(to, form, next) {
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
};
</script>

<style lang="scss" scoped>
.icon {
  &-setting {
    position: absolute;
    top: 50%;
    right: 10px;
    display: block;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
    background: url("@/assets/icon/setting.png") 0 0/100% 100% no-repeat;
  }
}
.container {
  width: 100%;
  //background-color: #f5f5f5;
  .bg {
    width: 100%;
    // height: 100px;
    background: url("@/assets/img/bg/bg2.png") no-repeat scroll 0 0/100% auto;
    display: flex;
    align-items: center;
    padding: 0 16px;

    .avater {
      position: relative;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin-top: 15px;
      overflow: hidden;
      // background: url("@/assets/img/bg/plus.png") no-repeat;
      // background-size: 100% 100%;
      // z-index: 2;
      // margin: 20px 0;

      .edit {
        width: 100%;
        height: 14px;
        line-height: 14px;
        color: white;
        font-size: 12px;
        background-color: rgba($color: #000000, $alpha: 0.6);
        position: absolute;
        text-align: center;
        left: 0;
        bottom: 0;
      }

      img {
        width: 100%;
        display: block;
        border-radius: 50%;
      }
    }
  }

  .info {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 500;
    }

    .tags {
      display: flex;
      margin-top: 10px;
      .tag {
        position: relative;
        background: hsla(0, 0%, 100%, 0.68);
        border: 1px solid #e1be6a;
        max-width: 150px;
        height: 18px;
        line-height: 17px;
        padding: 0 14px 0 6px;
        margin: 0 6px 0 0;
        border-radius: 15px;
        font-size: 10px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
      }

      .tag.point::after {
        display: block;
        content: "";
        width: 6px;
        height: 6px;
        position: absolute;
        right: 5px;
        top: 5px;
        background: url("@/assets/icon/arrow-rt.png") no-repeat;
        background-size: 100%;
      }
    }
  }

  .my-cell {
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin-top: 12px;
    padding: 8px 16px;
    color: #1a1a1a;
    background: linear-gradient(
        90deg,
        hsla(0, 0%, 94.9%, 0.5),
        hsla(0, 0%, 98%, 0.6)
      ),
      linear-gradient(#fff, #fff);
    height: auto;
    border-radius: 12px 12px 0 0;
    .cell-item {
      i {
        font-style: normal;
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }

  .my-controls {
    display: flex;
    justify-content: space-around;
    text-align: center;
    width: 95%;
    height: auto;
    margin: 0 auto;
    padding: 8px 16px;
    color: #1a1a1a;
    background-color: #f2f2f2;
    margin-top: 0;
    border-radius: 0 0 12px 12px;
    .control-item {
      .pic {
        width: auto;
        height: 30px;
        margin-left: 50%;
        transform: translateX(-50%);
        img {
          height: 100%;
          vertical-align: middle;
        }
      }

      .control-item-title {
        padding: 5px 16px;
      }
    }
  }
}
</style>