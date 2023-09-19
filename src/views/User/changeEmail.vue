<template>
  <div>
    <div class="container">
      <TopBar :text="text"></TopBar>
      <van-cell-group v-if="!isEmpty">
        <van-field v-model="data.email" label="邮箱" disabled />
      </van-cell-group>
      <van-cell-group v-else>
        <van-field
          v-model="email"
          label="邮箱"
          placeholder="请输入需要绑定的邮箱"
          :readonly="readonly"
        />
      </van-cell-group>
      <!-- 换绑 新邮箱 -->
      <van-cell-group v-if="!isEmpty">
        <van-field
          v-model="email"
          label="新邮箱"
          placeholder="请输入需要绑定的邮箱"
          :readonly="readonly"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="code"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          maxlength="6"
        >
          <template #button>
            <van-button
              size="small"
              :type="btnType"
              @click="sendCode"
              :disabled="disabled"
              >{{ btnText }}</van-button
            >
          </template>
        </van-field>
      </van-cell-group>

      <div class="btn" v-if="isEmpty" @click="submit">绑定</div>
      <div class="btn edit" v-else @click="change">修改</div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
import { get, post } from "@/utils/request";
import { Toast } from "vant";
export default {
  name: "ChangeEmail",
  components: {
    TopBar,
  },
  data() {
    return {
      email: "",
      code: "",
      text: "修改邮箱",
      isEmpty: false,
      btnText: "发送验证码",
      btnType: "primary",
      disabled: false,
      readonly: false,
      time: 60,
      timer: null,
      data: [],
      newData: [],
    };
  },
  methods: {
    async getData() {
      const username = localStorage.username;
      const res = await post("/getEmail", {
        username,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.text = "修改邮箱";
        this.isEmpty = false;
        this.data = res.data;
        this.newData = res.data;
      } else {
        this.text = "绑定邮箱";
        this.isEmpty = true;
      }
    },
    async sendCode() {
      const username = localStorage.username;
      if (this.email === "") {
        Toast("邮箱不能为空");
        return;
      }
      this.changeText();
      const res = await get("/sendCode", {
        email: this.email,
        username,
      });
      console.log(res);
      Toast(res.message);
      if (res?.errno === 1) {
        clearInterval(this.timer);
        this.btnText = "发送验证码";
        this.btnType = "primary";
        this.disabled = false;
        this.readonly = false;
      }
    },
    changeText() {
      this.btnType = "danger";
      this.disabled = true;
      this.readonly = true;
      this.timer = setInterval(() => {
        this.time--;
        this.btnText = `${this.time}秒后重新发送`;
        if (this.time === 0 || this.time <= 0) {
          clearInterval(this.timer);
          this.btnText = "发送验证码";
          this.btnType = "primary";
          this.disabled = false;
        }
      }, 1000);
    },
    async submit() {
      const username = localStorage.username;
      const res = await get("/bindEmail", {
        email: this.email,
        code: this.code,
        username,
      });
      console.log(res);
      Toast(res.message);
      this.$router.back()
    },
    async change() {
      const username = localStorage.username;
      const res = await get("/changeEmail", {
        username,
        newEmail: this.email,
        oldEmail: this.data.email,
        code: this.code,
      });
      console.log(res);
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
    .btn {
      width: 95%;
      margin: 0 auto;
      height: 30px;
      line-height: 30px;
      margin-top: 30px;
      color: white;
      text-align: center;
      font-size: 15px;
      border-radius: 15px;
      background-color: #409eff;
    }
    .edit {
      background-color: #67c23a;
    }
  }
}
</style>