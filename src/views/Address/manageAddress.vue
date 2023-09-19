<template>
  <div>
    <div class="container">
      <TopBar text="收货地址"></TopBar>
      <div class="address">
        <div class="address-card" v-for="(item, index) in data" :key="index">
          <div class="info">
            <div class="add">
              <i class="normal" v-if="item.isDefault">默认</i>
              <i class="normal blue" v-else-if="item.tag !== ''">{{
                item.tag
              }}</i>
              <span>{{ item.city }}</span>
            </div>
            <div class="add-detail">
              <span>{{ item.detail_address }}</span>
            </div>
            <div class="user">
              <span>{{ item.name }} {{ item.phone_number }}</span>
            </div>
          </div>
          <div class="edit" @click="edit(item)">
            <img src="@/assets/icon/address-edit.png"   />
          </div>
        </div>
      </div>
      <div class="btn" @click="jump('AddAddress')">新增收货地址</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { get } from "@/utils/request";
import TopBar from "@/components/topBar";
export default {
  name: "EditAddress",
  components: {
    TopBar,
  },
  data() {
    return {
      addressId: 0,
      data: [],
    };
  },
  methods: {
    async getData() {
      const username = localStorage.username;
      const res = await get("/getAddress", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
      }
    },
    edit(item) {
      this.$router.push({ name: "Edit", params: { id: item._id } });
    },
    jump(link){
      this.$router.push({name: link})
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .address {
    width: 100%;
    padding-bottom: 40px;
    &-card {
      padding: 8px 0px;
      position: relative;
      width: 92%;
      margin: 0 auto;
      border-bottom: 1px solid #eee;

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

          .blue {
            background: linear-gradient(
              135deg,
              #4965f2,
              #4971f2 45%,
              #4985f2 83%,
              #498ff2
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

      .edit {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 24px;
        height: 24px;

        img {
          width: 100%;
          display: block;
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

  .btn{
    position: fixed;
    left: 50%;
    bottom: 10px;
    width: 95%;
    transform: translateX(-50%);
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    border-radius: 15px;
    font-size: 14px;
    background: linear-gradient(
            135deg,
            #fa2c19,
            #fa3f19 45%,
            #fa5919 83%,
            #fa6419
    );
  }
}
</style>