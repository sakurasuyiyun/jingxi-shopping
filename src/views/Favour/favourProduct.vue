<template>
  <div>
    <div class="container">
      <TopBar text="我的关注"></TopBar>
      <div class="tips">
        <span
          >共 <i>{{ count }}</i> 件商品</span
        >
        <span>编辑</span>
      </div>
      <div class="content">
        <div
          class="content-item"
          v-for="(item, index) in data"
          :key="index"
          @click="jump('Detail', item)"
        >
          <van-card
            :price="item.price"
            :title="item.title"
            :thumb="item.imgUrl"
          >
            <template #footer>
              <div class="footer">
                <div class="sign_tip">
                  <span>优惠券</span>
                </div>
                <span class="tip">满99999减0.01，去商品详情页领取</span>
              </div>
            </template>
          </van-card>
          <div class="grap"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
import { get } from "@/utils/request";
export default {
  name: "FavourProduct",
  components: {
    TopBar,
  },
  data() {
    return {
      data: [],
      isEmpty: false,
      count: 0,
    };
  },
  methods: {
    async getData() {
      const username = localStorage.username;
      const res = await get("/getFavourProduct", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.count = res.count;
      }
    },
    jump(name, item) {
      const { productId } = item;
      this.$router.push({ name, params: { productId } });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
div {
  .container {
    width: 100%;
    .tips {
      width: 100%;
      padding: 8px 16px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f2f2f2;
      span {
        color: #666;
        display: block;
        i {
          color: #e4393c;
        }
      }
      span:last-child {
        display: block;
        color: #e4393c;
      }
    }
    .content {
      .content-item {
        .footer {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: left;
          .sign_tip {
            display: inline-block;
            background: #fff;
            position: relative;
            color: #e4393c;
            border-radius: 2px;
            min-width: 16px;
            font-size: 10px;
            line-height: 15px;
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 5px;
            text-align: center;
            border: 1px solid #e4393c;
            span {
              padding: 0 3px;
              display: inline-block;
              font-size: 12px;
              line-height: 15px;
            }
            .tip {
              font-size: 12px;
              color: #333;
              line-height: 30px;
            }
          }
        }

        .van-card {
          background-color: #fff !important;

          .van-card__price {
            color: #e4393c !important;
          }
        }
      }
      .grap {
        width: 100%;
        height: 10px;
        background-color: #f2f2f2;
      }
    }
  }
}
</style>