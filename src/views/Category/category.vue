<template>
  <div>
    <div class="container">
      <div class="top">
        <div class="back" @click="back">
          <span class="icon icon-back"></span>
        </div>
        <div class="search" @click="jump">
          <span class="iconfont icon-search">&#xe602;</span>
          <span class="text">西门子开关</span>
        </div>
        <div class="more">
          <span class="icon icon-more"></span>
        </div>
      </div>
      <div class="main">
        <div class="tab">
          <ul
            ref="ul"
            @touchstart="moveStart"
            @touchmove.prevent="move"
            @touchend="moveEnd"
          >
            <li
              :class="{ 'tab-item': 'tab-item', active: index === activeIndex }"
              v-for="(item, index) in tab"
              :key="index"
              @click="changeTab(item, index)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="content">
          <h3 class="title">{{ activeTitle }}</h3>
          <div class="content-main">
            <div
              class="item"
              v-for="(item, index) in data"
              :key="index"
              @click="searchList(item.title)"
            >
              <div class="item-img">
                <img :src="item.imgUrl" />
              </div>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <TabBar :active="active"></TabBar>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/tabBar";
import { get } from "@/utils/request";
export default {
  name: "Category",
  components: {
    TabBar,
  },
  data() {
    return {
      active: 1,
      tab: [],
      data: [],
      activeIndex: 0,
      activeTitle: "",
      ul: null,
      start: 0,
      end: false,
      bottom: false,
      activeData: "hot",
    };
  },
  methods: {
    async changeTab(item, index) {
      if (this.activeIndex === index) return;
      this.activeIndex = index;
      this.activeTitle = item.title;
      this.activeData = item.name;
      const res = await get("/getTabBarImg", {
        activeTab: this.activeData,
      });
      if (res?.errno === 0) {
        this.data = res.data;
      }
      this.ul.style.transform = `translateY(${-index * 46}px)`;
    },
    jump() {
      this.$router.push({ name: "Search" });
    },
    moveStart(e) {
      const { clientY } = e.touches[0];
      this.$refs.ul.style.transition = "";
      this.start = -clientY;
    },
    move(e) {
      const { clientY } = e.touches[0];
      const offsetTop = this.$refs.ul.offsetTop;
      let move = clientY - offsetTop + this.start;
      if (move >= 150) {
        move = 150;
        this.end = true;
      } else if (move > 0) {
        move = move;
        this.end = true;
      } else {
        move = move;
        this.end = false;
      }

      if (move <= -46 * 5) {
        move = -46 * 5;
        this.bottom = true;
      } else if (move < 0) {
        move = move;
        this.bottom = true;
      } else {
        move = move;
        this.bottom = false;
      }
      this.$refs.ul.style.transform = `translateY(${move}px)`;
      // console.log(e);
    },
    moveEnd(e) {
      if (this.end) {
        this.$refs.ul.style.transition = "all .3s";
        this.$refs.ul.style.transform = `translateY(0px)`;
        return;
      }

      if (this.bottom) {
        this.$refs.ul.style.transition = "all .3s";
        this.$refs.ul.style.transform = `translateY(0px)`;
        return;
      }
    },
    searchList(content) {
      this.$router.push({ name: "SearchList", params: { content } });
    },
    back() {
      this.$router.back();
    },
    async getData() {
      const res1 = await get("/getTabBar");
      const res2 = await get("/getTabBarImg", {
        activeTab: this.activeData,
      });
      console.log(res1);
      if (res1?.errno === 0) {
        this.tab = res1.data;
      }
      if (res2?.errno === 0) {
        this.data = res2.data;
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.ul = this.$refs.ul;
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

  &-more {
    display: inline-block;
    margin: 12px 12px 12px 10px;
    width: 20px;
    height: 20px;
    background: url("@/assets/icon/more.png") no-repeat 50%;
    background-size: 20px;
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
  .top {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
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

  .main {
    display: flex;
    .tab {
      min-width: 85px;
      height: auto;
      overflow-y: auto;
      min-height: 100%;
      ul {
        width: 85px;
        overflow: hidden;
        //height: 574px;
      }

      &-item {
        text-align: center;
        width: 100%;
        display: block;
        height: 46px;
        line-height: 46px;
        text-decoration: none;
        font-size: 13px;
        color: #080808;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #f8f8f8;
      }

      .active {
        color: #e93b3d;
        background-color: #fff;
      }
    }

    .content {
      height: auto;
      min-height: 100%;
      width: 100%;
      font-size: 12px;
      color: #252525;
      margin: 19px 7px 0 0;

      .title {
        font-size: 14px;
        color: #333;
        font-weight: 700;
        margin-left: 10px;
      }

      &-main {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 70px;
          text-align: center;
          margin-left: 20px;
          // margin-right: 10px;
          .item-img {
            width: 70px;
            height: 70px;

            img {
              width: 100%;
              display: block;
            }
          }

          span {
            display: -webkit-box;
            color: #333;
            height: 35px;
            margin-top: 2px;
            -webkit-box-pack: start;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
            -webkit-box-align: center;
          }
        }
      }
    }
  }
}
</style>