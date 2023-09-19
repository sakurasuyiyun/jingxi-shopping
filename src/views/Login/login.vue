<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="back" @click="back">
          <span class="icon icon-back"></span>
        </div>
        <div class="title">
          <span>京西登陆注册</span>
        </div>
      </div>

      <div class="form">
        <div class="input">
          <van-field
            v-model="formData.username"
            label="+86"
            placeholder="请输入手机号"
          />
        </div>
        <div class="input">
          <van-field
            v-model="formData.password"
            type="password"
            label="密码"
            placeholder="密码"
          />
        </div>
        <div class="input-btn">
          <div :class="{ btn: 'btn', active: hightLight }" @click="login">
            登 陆
          </div>
        </div>
      </div>

      <div class="link">
        <div class="left">
          <span>忘记密码</span>
        </div>
        <div class="right">
          <span>邮箱登陆</span>
        </div>
      </div>

      <div class="rule">
        <input type="checkbox" class="rule-item" v-model="ruleCheck" />
        <span
          >若您输入的手机号未注册，将为您直接注册，注册即视为同意<span
            class="high"
            >京西用户注册协议、用户隐私政策</span
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import { get, post } from "@/utils/request";
import router from "@/router";
export default {
  name: "Login",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      hightLight: false,
      show: false,
      actions: [{ name: "手机号" }, { name: "邮箱" }],
      ruleCheck: false,
      confirm: false,
    };
  },
  methods: {
    async login() {
      const _this = this;
      if (!this.confirm) return;
      if (!this.ruleCheck) {
        Toast("请先阅读并勾选协议");
        return;
      }
      const res = await post("/login", {
        username: this.formData.username,
        password: this.formData.password,
      });
      console.log(res);
      if (res?.errno === 0) {
        Toast(res.message);
        localStorage.token = res.token;
        router.push({ name: "Home" });
        window.location.reload()
        return;
      }
      if (res?.errno === 1) {
        Toast(res.message);
        return;
      }
      if (res?.errno === 2) {
        Dialog.confirm({
          title: "不存在该账号",
          message: "该账号尚未注册是否立即注册",
          async beforeClose(action, done) {
            if (action === "confirm") {
              console.log(_this.formData);
              const res = await post("/register", {
                username: _this.formData.username,
                password: _this.formData.password,
              });
              console.log(res);
              if (res?.errno === 0) {
                _this.login();
                _this.formData = {
                  username: "",
                  password: "",
                };
                setTimeout(done, 500);
              }
            } else {
              window.location.reload();
            }
          },
        });
      }
    },
    back(){
      this.$router.back()
    }
  },
  watch: {
    formData: {
      deep: true,
      handler(val) {
        const reg =
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
        if (reg.test(val.username) && val.password.length > 5) {
          if (!this.ruleCheck) {
            this.hightLight = false;
            this.confirm = true;
            return;
          }
          this.hightLight = true;
          this.confirm = true;
        } else {
          this.hightLight = false;
          this.confirm = false;
        }
      },
    },
    ruleCheck(val) {
      if (val) {
        if (this.confirm) {
          this.hightLight = true;
        } else {
          this.hightLight = false;
        }
      } else {
        this.hightLight = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  &-back {
    width: 24px;
    height: 24px;
    display: block;
    background: url("@/assets/icon/back.png") no-repeat;
    background-size: 100% auto;
  }
}
.container {
  width: 100%;

  .header {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;

    .back {
      position: absolute;
      top: 10px;
      left: 20px;
    }

    .title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .form {
    width: 90%;
    margin: 0 auto;
    .input {
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #efefef;
      margin: 0 auto;
      margin-top: 30px;

      &-btn {
        margin-top: 30px;
        font-weight: bold;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
        .btn {
          border-radius: 25px;
          font-size: 16px;
          border: none;
          background-image: linear-gradient(
            90deg,
            #fab3b3,
            #ffbcb3 73%,
            #ffcaba
          );
        }

        .btn.active {
          background-image: linear-gradient(
            90deg,
            #f10000,
            #ff2000 73%,
            #ff4f18
          );
        }
      }
    }
  }

  .link {
    width: 80%;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .rule {
    display: flex;
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;

    span {
      display: inline-block;
      margin-left: 5px;

      .high {
        color: #4a90e2;
      }
    }

    &-item {
      vertical-align: text-top;
    }
  }
}
</style>