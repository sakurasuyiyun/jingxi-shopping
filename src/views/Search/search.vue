<template>
  <div>
    <div class="container">
      <div class="top">
        <div class="back">
          <span class="icon icon-back" @click="back"></span>
        </div>
        <div class="search">
          <span class="iconfont icon-search">&#xe602;</span>
          <input
            type="text"
            class="text"
            :placeholder="content"
            v-model="value"
            @input="input"
            autofocus
          />
        </div>
        <div class="search-btn" @click="search">
          <span>搜索</span>
        </div>
      </div>
      <div class="search-history">
        <h3>搜索历史</h3>
        <ul class="search-list">
          <li class="search-item" v-for="(item,index) in searchHistory" :key="index" @click="search(item)">{{item}}</li>
        </ul>
      </div>
      <div class="grap"></div>
      <div class="content">
        <ul>
          <li v-if="searchText.length > 0">
            <van-cell
              :title="searchText"
              @click="search('link')"
              is-link
              :to="`/searchList/${searchText}`"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { debouce } from "@/utils/debounce";
export default {
  name: "Search",
  data() {
    return {
      content: "地球仪",
      value: "",
      data: [],
      searchText: "",
      searchHistory: this.$store.state.data
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    search(text) {
      if(text === 'link'){
        this.$store.commit('addList',this.searchText);
      }else {
        this.$store.commit('addList',text);
        this.$router.push({name: 'SearchList',params:{content:text}})
      }
    },
    input: debouce(async function () {
      const { value } = this;
      this.searchText = value;
    }),
  },
  mounted() {
    if (this.$route.params.content) {
      this.content = this.$route.params.content;
    }
    console.log(this.searchHistory)
  },
};
</script>

<style lang="scss" scoped>
input {
  border: 0;
  background: 0 0;
  font-size: 12px;
  color: #232326;
  padding-left: 5px;
  width: 19em;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  height: auto;
  margin: 0 0 0 5px;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  line-height: 16px;
}
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
    margin-left: 20px;
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
      width: 70%;
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

    .search-btn {
      margin-right: 10px;
      span {
        display: block;
        text-align: center;
        background-color: #e93b3d;
        color: white;
        width: 40px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        font-size: 14px;
      }
    }

    .back {
      width: 40px;
      height: 44px;
    }
  }

  .content {
    width: 100%;
    ul {
      width: 100%;
      li {
        width: 100%;
      }
    }
  }
  
  .grap{
    width: 100%;
    height: 15px;
    background-color: #f2f2f2;
  }

  .search-history{
    width: 100%;
    padding: 8px 16px;
    margin-bottom: 15px;
    .search-list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      .search-item{
        height: 25px;
        line-height: 25px;
        background-color: #f0f2f5;
        padding: 0 10px;
        border-radius: 8px;
        color: #666;
        margin-left: 10px;
        margin-top: 5px;
      }
    }
  }
}
</style>