<template>
  <div>
    <div class="container">
      <Topbar text="编辑收货地址"></Topbar>
      <div class="input">
        <div class="input-item">
          <van-cell-group>
            <van-field
              label="收货人"
              placeholder="请填写收货人姓名"
              v-model="data.name"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              label="联系方式"
              placeholder="请填写收货人手机号码"
              v-model="data.phone_number"
            />
          </van-cell-group>
          <van-field
            readonly
            clickable
            name="picker"
            label="所在地区"
            placeholder="省市区、乡镇等"
            @click="showPicker = true"
            v-model="data.city"
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
              type="textarea"
              label="详细地址"
              placeholder="街道、楼牌号等"
              v-model="data.detail_address"
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
        <van-switch v-model="isChecked" active-color="#fa2c19" />
      </div>
      <div class="btn-submit" @click="submit">提交</div>
      <div class="del" @click="del">删除</div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/topBar";
import { get, post } from "@/utils/request";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  name: "Edit",
  components: {
    Topbar,
  },
  data() {
    return {
      areaList,
      showPicker: false,
      tags: [
        { id: 1, name: "家" },
        { id: 2, name: "学校" },
        { id: 3, name: "公司" },
      ],
      activeIndex: -1,
      data: [],
      isChecked: false,
    };
  },
  methods: {
    selectCity(value) {
      this.data.city = "";
      value.forEach((element) => {
        this.data.city += element.name;
      });
      this.showPicker = false;
    },
    cancelSelect() {
      this.showPicker = false;
    },
    selectTags(index) {
      if (this.activeIndex === index) {
        this.activeIndex = -1;
        this.data.tag = "";
        return;
      }
      this.activeIndex = index;
      this.data.tag = this.tags[index].name;
    },
    async getData() {
      const username = localStorage.username;
      const res = await get("/getAddressDetail", {
        username,
        id: this.addressId,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.activeIndex =
          this.data.tag === "家"
            ? 0
            : this.data.tag === "学校"
            ? 1
            : this.data.tag === "公司"
            ? 2
            : -1;
        this.isChecked = this.data.isDefault === 0 ? false : true;
      }
    },
    async submit() {
      this.data.isDefault = this.isChecked === true ? 1 : 0;
      console.log(this.data);
      const username = localStorage.username;
      const res = await post("/updateAddress", {
        username,
        data: this.data,
      });
      console.log(res);
      if (res?.errno === 0) {
        Toast(res.message);
        this.$router.back();
      }
    },
    async del() {
      Dialog.confirm({
        title: "Tips",
        message: "是否确认删除该收货地址，该操作不可逆",
      })
        .then(async () => {
          // on confirm
          const username = localStorage.username;
          const res = await post("/delAddress", {
            username,
            id: this.addressId,
          });
          if (res?.errno === 0) {
            Toast(res.message);
            this.$router.back();
          }
        })
        .catch(() => {
          // on cancel
          Toast("取消操作");
        });
    },
  },
  created() {
    this.addressId = this.$route.params.id;
    this.getData();
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

  .btn-submit {
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    height: 38px;
    line-height: 38px;
    border-radius: 21px;
    text-align: center;
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

  .del {
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    height: 38px;
    line-height: 38px;
    border-radius: 21px;
    text-align: center;
    background: #fff;
    border: 0.5px solid #fa2c19;
    color: #fa2c19;
  }
}

.active {
  background: #4b9bf8 !important;
  color: #fff !important;
}
</style>