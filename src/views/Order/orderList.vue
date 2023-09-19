<template>
  <div>
    <div class="caontainer" v-if="isShow">
      <TopBar text="我的订单"></TopBar>
      <div class="search">
        <div class="search-box">
          <span class="iconfont icon-search">&#xe602;</span>
          <span @click="show = true">搜索我的订单</span>
        </div>
      </div>
      <div class="tab">
        <van-tabs v-model="active" swipeable @click="onClick">
          <van-tab
            v-for="(item, index) in tab"
            :key="index"
            :title="item.title"
          >
            <div class="order" v-if="!isEmpty">
              <div
                class="order-item"
                v-for="(item, index) in newData"
                :key="index"
              >
                <div class="order-id">
                  <span>订单编号：{{ orderNum[index] }}</span>
                  <span class="status">{{
                    item[0].status === 1
                      ? "待付款"
                      : item[0].status === 2
                      ? "待收货"
                      : "已完成"
                  }}</span>
                </div>
                <div class="content" v-for="(list, num) in item" :key="num">
                  <div class="item-img">
                    <img :src="list.imgUrl" />
                  </div>
                  <div class="desc">
                    <span>{{ list.title }}</span>
                  </div>
                  <div class="count">x{{ list.count }}</div>
                </div>
                <div class="price">
                  <span
                    >实付
                    <i
                      >￥{{
                        newData[index][newData[index].length - 1].total_price
                      }}</i
                    ></span
                  >
                </div>
                <div class="button">
                  <div class="btn" v-if="item[0].status === 1">取消订单</div>
                  <div class="btn red" v-if="item[0].status === 1">
                    前往付款
                  </div>
                  <div class="btn" v-if="item[0].status === 2">延长收货</div>
                  <div
                    class="btn red"
                    v-if="item[0].status === 2"
                    @click="confirm(item)"
                  >
                    确认收货
                  </div>
                  <div
                    class="btn"
                    v-if="item[0].status === 0 || item[0].status === 3"
                    @click="addComment(index)"
                  >
                    评价晒单
                  </div>
                  <div
                    class="btn red"
                    v-if="item[0].status === 0 || item[0].status === 3"
                  >
                    再次购买
                  </div>
                </div>
              </div>
            </div>
            <van-empty class="empty" description="页面空空哒" v-else />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
import { get } from "@/utils/request";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  name: "OrderList",
  components: {
    TopBar,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      active: 0,
      tab: [
        { id: 1, title: "全部" },
        { id: 2, title: "待付款" },
        { id: 3, title: "待收货" },
        { id: 4, title: "已完成" },
      ],
      data: [],
      newData: {},
      orderNum: {},
      totalPrice: {},
      isShow: false,
      isEmpty: true,
      show: false,
    };
  },
  methods: {
    onClick(name, title) {
      this.getData(name);
    },
    async getData(status) {
      const username = localStorage.username;
      const res = await get("/getOrderList", {
        username,
        status,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.isEmpty = false;
        this.formatData();
      } else {
        this.isEmpty = true;
      }
    },
    formatData() {
      this.newData = {};
      this.data.forEach((item) => {
        if (!this.newData.hasOwnProperty(item.order_number)) {
          this.orderNum[item.order_number] = item.order_number;
          this.newData[item.order_number] = [];
        }
      });
      this.data.forEach((element) => {
        for (let item in this.newData) {
          if (element.order_number == item) {
            this.newData[item] = [...this.newData[item], element];
          }
        }
      });
      console.log(this.data)
      console.log(this.orderNum)
      console.log(this.newData);
      this.isShow = true;
    },
    confirm(item) {
      Dialog.confirm({
        title: "确认收货",
        message: "是否确认收货",
      })
        .then(() => {
          // on confirm
          this.confirmReceipt(item[0].order_number);
        })
        .catch(() => {
          // on cancel
        });
    },
    async confirmReceipt(orderId) {
      const username = localStorage.username;
      const res = await get("/confirmReceipt", {
        username,
        orderId,
      });
      console.log(res);
      if (res?.errno === 0) {
        Toast("确认收货成功");
        setTimeout(() => {
          this.getData(0);
        }, 500);
      } else {
        Toast(res.message);
      }
    },
    addComment(index) {
      this.$router.push({ name: "AddComment", params: { orderId: index } });
    },
  },
  created() {
    const status = this.$route.params.status;
    this.active = status;
    this.getData(status);
  },
};
</script>

<style lang="scss" scoped>
div {
  .caontainer {
    width: 100%;
    // height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 8px;
    .search {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #fff;
      .search-box {
        position: relative;
        width: 95%;
        margin: 0 auto;
        padding: 0 30px;
        height: 28px;
        border-radius: 15px;
        border: 1px solid #eee;
        background-color: #fff;
        line-height: 28px;
        color: #999;
        font-size: 16px;
        .icon-search {
          position: absolute;
          top: 0;
          left: -10px;
          display: inline-block;
          margin-left: 20px;
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
    .tab {
      width: 100%;
      .order {
        width: 100%;
        .order-item {
          //   border: 1px solid red;
          width: 95%;
          margin: 0 auto;
          background-color: #fff;
          margin-top: 12px;
          margin: 10px;
          padding: 10px;
          background: #fff;
          border-radius: 10px;
          .order-id {
            position: relative;
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #999;
            font-weight: 500;

            .status {
              position: absolute;
              top: 0;
              right: 10px;
            }
          }
          .content {
            width: 100%;
            display: flex;
            align-items: center;
            .item-img {
              flex-shrink: 0;
              width: 75px;
              height: 75px;
              border-radius: 6px;
              margin-top: 10px;
              img {
                width: 100%;
                display: block;
                border-radius: 6px;
              }
            }
            .desc {
              width: 100%;
              padding: 0 16px;
              span {
                overflow: hidden;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 14px;
                color: #333;
                line-height: 21px;
              }
            }
          }
          .price {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding: 8px 0;
            border-bottom: 1px solid #f5f5f5;
            span {
              display: block;
              font-size: 16px;
              color: #151515;
              i {
                font-style: normal;
                font-weight: 800;
              }
            }
          }
          .button {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding-top: 8px;
            .btn {
              text-align: center;
              width: 86px;
              height: 28px;
              line-height: 28px;
              border-radius: 15px;
              margin-left: 6px;
              -webkit-flex-shrink: 0;
              -ms-flex-negative: 0;
              flex-shrink: 0;
              position: relative;
              box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
              background-color: #fff;
              color: #333;
              border: 1px solid #ccc;
            }
            .red {
              color: #f2270c;
              background: #fff;
              border: 1px solid #f2270c;
              box-shadow: 0 3px 6px 0 rgba(242, 39, 12, 0.1);
            }
          }
        }
      }

      .empty{
        width: 100%;
        height: calc(100vh - 45px - 48px - 52px);
      }
    }
  }
}
</style>