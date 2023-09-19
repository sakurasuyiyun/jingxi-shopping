<template>
  <div>
    <div class="caontainer">
      <TopBar text="修改手机号码"></TopBar>
      <van-cell-group>
        <van-field v-model="data" label="原手机号" disabled />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="phone" label="新手机号" maxlength="11" />
      </van-cell-group>
      <div class="btn" @click="change">确认修改</div>
    </div>
    <template v-if="showKeyboard">
      <div class="pass-board">
        <span>输入密码以继续</span>
        <!-- 密码输入框 -->
        <van-password-input
          class="input"
          :value="value"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="value"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </div>
    </template>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
import { get, post } from "@/utils/request";
import { Toast } from "vant";
export default {
  name: "ChangePhoneNumber",
  components: {
    TopBar,
  },
  data() {
    return {
      data: "",
      phone: "",
      value: "",
      showKeyboard: false,
    };
  },
  methods: {
    async getData() {
      const username = localStorage.username;
      const res = await get("/getUserInfo", { username });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
      }
    },
    async change() {
      const reg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
      if (this.phone.length !== 11) {
        Toast("请输入正确的手机号");
        return;
      } else if (!reg.test(this.phone)) {
        Toast("请输入正确的手机号");
        return;
      }
      this.showKeyboard = true;
    },
    async submit() {
      const username = localStorage.username;
      const res = await post("/changePhoneNumber", {
        username,
        phone: this.phone,
        value: this.value,
      });
      if (res?.errno === 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        Toast("登陆信息已失效，请重新登陆");
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 300);
      } else {
        Toast(res.message);
      }
    },
  },
  created() {
    this.getData();
  },
  watch: {
    value(val) {
      if (val.length === 6) {
          this.submit();
        this.showKeyboard = false;
        this.value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .caontainer {
    width: 100%;
    .btn {
      width: 90%;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      margin: 0 auto;
      text-align: center;
      font-size: 14px;
      color: white;
      margin-top: 30px;
      background-color: #e6a23c;
    }
  }
  .pass-board {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.7);
    span {
      position: absolute;
      top: 30%;
      left: 0;
      display: block;
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: white;
    }
    .input {
      margin-top: 80%;
    }
  }
}
</style>