<template>
  <div>
    <div class="container">
      <TopBar text="账户设置"></TopBar>
      <div class="top">
        <p>管理我的帐户</p>
        <div class="card">
          <div class="left-points"></div>
          <div class="points"></div>
          <div class="ring"></div>
          <div class="circle"></div>
          <div class="current-login">当前登陆</div>
          <div class="user_info">
            <div class="pic">
              <img src="@/assets/img/bg/avater.jpeg" alt="" />
            </div>
            <div class="content">
              <span>苏依云</span>
              <span>账号名：admin</span>
            </div>
          </div>
        </div>
      </div>
      <div class="grap"></div>
      <van-cell
        title="收货地址管理"
        is-link
        value="管理我的地址"
        @click="jump('ManageAddress')"
      />
      <div class="grap"></div>
      <van-cell
        title="账户与安全"
        is-link
        value="密码/实名认证等管理"
        @click="jump('Safe')"
      />
      <van-cell title="京西支付密码" is-link value="已设置" />
      <van-cell title="隐私设置" is-link />
      <div class="grap"></div>
      <van-cell title="联系客服" is-link value="即时解答用户疑难" />
      <van-cell title="退出登录" @click="logOut" />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
import { Toast } from 'vant';
export default {
  name: "Setting",
  components: {
    TopBar,
  },
  data() {
    return {};
  },
  methods: {
    jump(link) {
      this.$router.push({ name: link });
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("history")
      Toast('您已成功退出')
      this.$router.push({ name: "Home" });
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .container {
    width: 100%;
    .top {
      padding: 12px 16px;
      p {
        color: #333;
        font-size: 16px;
      }
      .card {
        margin-top: 10px;
        background: #fff9f9;
        height: 90px;
        padding: 20px 15px 15px;
        border: 1px solid #ff414e;
        border-radius: 10px;
        box-sizing: border-box;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        .left-points {
          position: absolute;
          bottom: 0;
          left: 4px;
          width: 25px;
          height: 15px;
          background-image: url("@/assets/icon/left-points.png");
          background-size: 25px 15px;
        }
        .points {
          position: absolute;
          bottom: 14px;
          right: 45px;
          width: 27px;
          height: 22px;
          background-image: url("@/assets/icon/left-points.png");
          background-size: 27px 22px;
        }
        .ring {
          position: absolute;
          bottom: 9px;
          right: 18px;
          width: 13px;
          height: 13px;
          background: transparent;
          border-radius: 100%;
          border: 2px solid #ffa9a9;
          opacity: 0.2;
        }
        .circle {
          position: absolute;
          width: 52px;
          height: 52px;
          bottom: -22px;
          right: -23px;
          border-radius: 100%;
          background-color: #ffa9a9;
          opacity: 0.2;
        }
        .current-login {
          position: absolute;
          right: 0;
          top: 0;
          padding: 1px 10px;
          background-color: #ffe4e4;
          color: #e2231a;
          border-top-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .user_info {
          width: 100%;
          display: flex;
          align-items: center;
          .pic {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            img {
              width: 100%;
              display: block;
            }
          }
          .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              display: block;
              padding: 3px 0;
              color: #333;
            }

            span:last-child {
              opacity: 0.7;
            }
          }
        }
      }
    }
    .grap {
      width: 100%;
      height: 15px;
      background-color: #f2f2f2;
    }
  }
}
</style>