<template>
  <div>
    <div class="container">
      <div class="top">
        <div class="back" @click="back">
          <span class="icon icon-back"></span>
        </div>
        <div class="search" @click="jump">
          <span class="iconfont icon-search">&#xe602;</span>
          <span class="text">{{ content }}</span>
        </div>
        <div class="more">
          <span class="icon icon-more"></span>
        </div>
      </div>
      <div class="filtrate">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option.a" />
          <van-dropdown-item v-model="value2" :options="option.b" />
          <van-dropdown-item v-model="value3" :options="option.c" />
        </van-dropdown-menu>
      </div>
      <div class="products" v-if="!isEmpty">
        <div
          class="product"
          v-for="(item, index) in data"
          :key="index"
          @click="productDetail(item.productId)"
        >
          <div class="img">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="content">
            <div class="title">
              <div class="tag">
                <img src="@/assets/icon/anniversary-celebration.png" alt="" />
              </div>
              <span>{{ item.title }}</span>
            </div>
            <div class="price">
              &yen;
              <span>{{ item.price }}</span>
            </div>
            <div class="desc">
              <div class="tag">
                <img src="@/assets/icon/self.png" alt="" />
              </div>
              <span>{{ item.comment }}</span>
              <span class="reputation">{{ item.good }}</span>
            </div>
            <div class="shop">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <van-empty description="页面空空哒" v-else />
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
export default {
  name: "Searchlist",
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 1,
      option: {
        a: [
          { text: "综合", value: 0 },
          { text: "最新上架", value: 1 },
          { text: "价格最低", value: 2 },
          { text: "价格最高", value: 3 },
          { text: "评价最多", value: 4 },
        ],
        b: [
          { text: "默认排序", value: 0 },
          { text: "好评排序", value: 1 },
          { text: "销量排序", value: 2 },
        ],
        c: [
          { text: "985限时达", value: 0 },
          { text: "有货优先", value: 1 },
          { text: "货到付款", value: 2 },
          { text: "京西国际", value: 3 },
          { text: "促销商品", value: 4 },
          { text: "配送全球", value: 5 },
        ],
      },
      data: [],
      backUp: [],
      content: "",
      isEmpty: true,
    };
  },
  methods: {
    jump() {
      this.$router.push({ name: "Search", params: { content: this.content } });
    },
    back() {
      this.$router.back();
    },
    productDetail(index) {
      console.log(index);
      this.$router.push({ name: "Detail", params: { productId: index } });
    },
    async getData(content) {
      const res = await get("/search", {
        value: content,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.isEmpty = false;
        this.data = res.data;
        this.backUp = [...this.data];
      }
    },
  },
  created() {
    this.content = this.$route.params.content;
    this.getData(this.content);
    // console.log(this.$route.params.content);
  },
  watch: {
    value1(val) {
      console.log(val);
      if (val === 0) {
        this.data = [...this.backUp];
        return;
      }
      if (val === 2) {
        this.data.sort((a, b) => a.price - b.price);
        return;
      }
      if (val === 3) {
        this.data.sort((a, b) => b.price - a.price);
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  &-back {
    margin: 12px 0 0 10px;
    width: 20px;
    height: 20px;
    display: block;
    background: url("@/assets/icon/back.png") no-repeat;
    background-size: 100% 100%;
  }

  &-search {
    display: inline-block;
    margin-left: 20px;
    font-weight: bold;
    font-size: 14px;
  }
}
.container {
  width: 100%;
  //   overflow-x: hidden;
  .top {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .search {
      width: 80%;
      height: 80%;
      background-color: #f7f7f7;
      border-radius: 15px;
      position: relative;
      color: #666;
      display: flex;
      align-items: center;

      .text {
        margin-left: 12px;
      }
    }

    .back {
      width: 40px;
      height: 44px;
    }
  }

  .products {
    width: 100%;
    .product {
      width: 95%;
      margin: 0 auto;
      //   height: 100px;
      margin-top: 10px;
      display: flex;

      .img {
        width: 120px;
        height: 120px;
        img {
          width: 100%;
          display: block;
        }
      }

      .content {
        width: calc(100% - 120px);

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 14px;
          padding: 5px 10px 0 10px;
          letter-spacing: 0.02rem;

          .tag {
            display: inline-block;
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 5px;
            height: 14px;

            img {
              height: 100%;
              display: block;
            }
          }
        }

        .price {
          width: 100%;
          padding: 5px 10px 0 10px;
          color: #e4393c;
          font-weight: 400;

          span {
            font-size: 18px;
          }
        }

        .desc {
          width: 100%;
          padding: 5px 10px 0 10px;
          font-size: 12px;
          color: #999;
          .tag {
            display: inline-block;
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 5px;
            height: 14px;

            img {
              height: 100%;
              display: block;
            }
          }

          .reputation {
            margin-left: 5px;
          }
        }

        .shop {
          width: 100%;
          padding: 5px 10px 0 10px;
          color: #999;
          font-size: 12px;
          span {
            position: relative;
          }
          span::after {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-top: 1px solid #999;
            border-left: 1px solid #999;
            -webkit-transform-origin: 50%;
            transform-origin: 50%;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            position: absolute;
            width: 6px;
            height: 6px;
            right: -10px;
            top: 50%;
            margin-top: -4px;
          }
        }
      }
    }
  }
}
</style>