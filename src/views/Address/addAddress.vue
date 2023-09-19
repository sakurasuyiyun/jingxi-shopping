<template>
  <div>
    <div class="container">
      <Topbar text="新增收货地址"></Topbar>
      <div class="input">
        <div class="input-item">
          <van-cell-group>
            <van-field
              v-model="address.name"
              label="收货人"
              placeholder="请填写收货人姓名"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              v-model="address.phone"
              label="联系方式"
              placeholder="请填写收货人手机号码"
            />
          </van-cell-group>
          <van-field
            readonly
            clickable
            name="picker"
            :value="address.address"
            label="所在地区"
            placeholder="省市区、乡镇等"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-area
              title="所在地区"
              :area-list="areaList"
              @confirm="selectCity"
              @cancel="cancelSelect"
            />
          </van-popup>
          <van-cell-group>
            <van-field
              v-model="address.addressDetail"
              type="textarea"
              label="详细地址"
              placeholder="街道、楼牌号等"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="grap"></div>
      <div class="tag">
        <div class="title">标签</div>
        <div class="btn">
          <div
            :class="{ btnitem: 'btnitem', active: activeIndex === index }"
            v-for="(item, index) in tags"
            :key="index"
            @click="selectTags(index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="set-normal">
        <div class="title">
          <p class="title-text">设置默认地址</p>
          <p class="title-desc">提醒：每次下单会默认推荐使用默认地址</p>
        </div>
        <van-switch v-model="address.isDefault" active-color="#fa2c19" />
      </div>
      <div class="confirm" @click="confirm">确认</div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/topBar";
import { areaList } from "@vant/area-data";
import { get } from "@/utils/request";
import { Toast } from "vant";
export default {
  name: "AddAddress",
  components: {
    Topbar,
  },
  data() {
    return {
      address: {
        name: "",
        phone: "",
        address: "",
        addressDetail: "",
        isDefault: false,
        tag: "",
      },
      areaList,
      showPicker: false,
      tags: [
        { id: 1, name: "家" },
        { id: 2, name: "学校" },
        { id: 3, name: "公司" },
      ],
      activeIndex: -1,
    };
  },
  methods: {
    selectCity(value) {
      this.address.address = "";
      value.forEach((element) => {
        this.address.address += element.name;
      });
      this.showPicker = false;
    },
    cancelSelect() {
      this.showPicker = false;
    },
    async confirm() {
      const username = localStorage.username;
      const res = await get("/addAddress", {
        username,
        name: this.address.name,
        phone: this.address.phone,
        address: this.address.address,
        addressDetail: this.address.addressDetail,
        isDefault: this.address.isDefault === true ? 1 : 0,
        tag: this.address.tag,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.$router.push({name: 'EditAddress'});
      } else {
        Toast(res.message);
      }
    },
    selectTags(index) {
      if (this.activeIndex === index) {
        this.activeIndex = -1;
        this.address.tag = "";
        return;
      }
      this.activeIndex = index;
      this.address.tag = this.tags[index].name;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;

  .tag {
    width: 100%;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-top: 20px;

    .title {
      width: 30px;
    }

    .btn {
      width: calc(100% - 50px);
      display: flex;

      .btnitem {
        background-color: #fff;
        border: 0.5px solid #ccc;
        border-radius: 25px;
        color: #333;
        font-size: 14px;
        padding: 5px 10px;
        margin: 2.5px 10px 2.5px 0;
        width: auto;
      }
    }
  }

  .confirm {
    position: fixed;
    left: 50%;
    bottom: 50px;
    width: calc(95%);
    font-size: 16px;
    height: 38px;
    line-height: 38px;
    border-radius: 21px;
    text-align: center;
    transform: translateX(-50%);
    background: linear-gradient(
      135deg,
      #fa2c19,
      #fa3f19 45%,
      #fa5919 83%,
      #fa6419
    );
    border: none;
    color: #fff;
  }

  .set-normal {
    width: 100%;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .title {
      &-text {
        font-size: 16px;
      }

      &-desc {
        color: #999;
        font-size: 12px;
      }
    }
  }

  .grap {
    width: 100%;
    height: 10px;
    background: #f2f2f2;
  }
}

.active {
  background: #4b9bf8 !important;
  color: #fff !important;
}
</style>