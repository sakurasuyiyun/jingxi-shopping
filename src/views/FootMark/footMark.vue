<template>
  <div>
    <div class="container" v-if="isShow">
      <TopBar text="我的足迹"></TopBar>
      <div class="content" v-for="(item, index) in newData" :key="index">
        <div class="date">{{ date[index] }}</div>
        <div class="box">
          <div class="main" v-for="(list, num) in item" :key="num">
            <div class="pic">
              <img :src="list.imgUrl" />
            </div>
            <p class="desc">
              {{ list.title }}
            </p>
            <p class="price">
              &yen;<i>{{ list.price }}</i>
            </p>
          </div>
        </div>
        <div class="grap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import TopBar from "@/components/topBar";
export default {
  name: "FootMark",
  components: {
    TopBar,
  },
  data() {
    return {
      data: [],
      newData: {},
      date: [],
      isShow: false,
    };
  },
  methods: {
    async getData() {
      const username = localStorage.username;
      const res = await get("/getFootMark", { username });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.formatData();
      }
    },
    formatData() {
      console.log(this.data);
      this.data.forEach((item) => {
        item.create_at = new Date(item.create_at * 1000).toLocaleString();
        const a = item.create_at.split("/");
        const b = a[2].split(" ");
        item.create_at = a[1] + "月" + b[0] + "日";

        if (!this.newData.hasOwnProperty(item.create_at)) {
          this.newData[item.create_at] = [];
          this.date[item.create_at] = item.create_at;
        }
      });

      this.data.forEach((element) => {
        for (let item in this.newData) {
          if (element.create_at == item) {
            this.newData[item] = [...this.newData[item], element];
          }
        }
      });
      this.isShow = true;
      console.log(this.newData);
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
    .content {
      width: 100%;
      .date {
        font-size: 14px;
        font-weight: 600;
        color: #262626;
        margin-bottom: 10px;
        display: block;
        padding: 8px 16px;
      }
      .box {
        width: 100%;
        display: flex;
        padding: 0 16px;
        flex-wrap: wrap;
        .main {
          width: 100px;
          margin-left: 10px;
          margin-bottom: 30px;

          .pic {
            width: 100px;
            height: 100px;
            img {
              width: 100%;
              display: block;
            }
          }
          .desc {
            width: 100px;
            height: 28px;
            line-height: 14px;
            font-size: 12px;
            font-weight: 400;
            color: #2e2d2d;
            -o-text-overflow: -o-ellipsis-lastline;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
            margin-top: 6px;
          }
          .price {
            max-width: 100px;
            overflow: hidden;
            display: table-cell;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #fa2c19;
            padding-top: 10px;
            i {
              font-style: normal;
              font-size: 14px;
              font-weight: 400;
            }
          }
        }

        // .main:first-child {
        //   margin-left: 0;
        // }
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