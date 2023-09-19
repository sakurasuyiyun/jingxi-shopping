<template>
  <div>
    <template>
      <div class="loadding" v-if="isLoading">
        <van-loading color="#1989fa"></van-loading>
      </div>
    </template>
    <div class="container">
      <TopBar text="修改登陆密码"></TopBar>
      <van-cell-group inset>
        <van-field
          v-model="data.oldPwd"
          label="旧密码"
          placeholder="请输入旧密码"
          type="password"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="data.newPwd"
          label="新密码"
          placeholder="请输入新密码"
          type="password"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="data.confirmPwd"
          label="确认密码"
          placeholder="请再次输入密码"
          type="password"
        />
      </van-cell-group>
      <div class="btn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
import { get, post } from "@/utils/request";
export default {
  name: "ChangeLoginPwd",
  components: {
    TopBar,
  },
  data() {
    return {
      data: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      const username = localStorage.username;

      if (this.data.newPwd !== this.data.confirmPwd) {
        this.$toast("两次密码输入不一致");
        return;
      } else if (this.data.newPwd === "" && this.data.confirmPwd === "") {
        this.$toast("输入的密码不能为空");
        return;
      } else if (
        this.data.newPwd.length < 6 ||
        this.data.confirmPwd.length < 6
      ) {
        this.$toast("输入的密码需要等于6位数字");
        return;
      }

      this.isLoading = true;

      const res = await post("/changeLoginPwd", {
        username,
        data: this.data,
      });
      console.log(res);
      this.$toast(res.message);
      this.isLoading = false;
      if (res?.errno === 0) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .loadding {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .container {
    width: 100%;
    .btn {
      width: 90%;
      margin: 0 auto;
      margin-top: 30px;
      background-color: #409eff;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>