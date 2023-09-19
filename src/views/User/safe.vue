<template>
  <div>
    <div class="container">
      <TopBar text="账户安全"></TopBar>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="jump(item.name)"
        >
          <span>{{ item.title }}</span>
          <span class="desc">{{ item.desc }}</span>
          <div class="pic">
            <img src="@/assets/icon/arrow-rt_2.png" />
          </div>
        </div>
      </div>
      <div class="grap"></div>
      <div class="control">
        <span>注销账户</span>
        <span class="desc">账户注销后不能恢复</span>
        <div class="pic">
          <img src="@/assets/icon/arrow-rt_2.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/topBar";
export default {
  name: "Safe",
  components: {
    TopBar,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: "修改登陆密码",
          desc: "定期修改登陆密码，保护账户安全",
          name: "ChangeLoginPwd",
        },
        {
          id: 2,
          title: "修改手机号",
          desc: "若手机更换请尽快修改",
          name: "ChangePhoneNumber",
        },
        {
          id: 3,
          title: "关联邮箱设置",
          desc: "可用于账户登陆/身份认证等",
          name: "ChangeEmail",
        },
        {
          id: 4,
          title: "修改支付密码",
          desc: "定期修改支付密码，保护账户安全",
          name: "ChangePayPwd",
        },
      ],
    };
  },
  methods: {
    jump(link) {
      this.$router.push({ name: link });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .container {
    width: 100%;
    .content {
      width: 100%;
      padding: 0 8px;
      .item {
        position: relative;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        span {
          display: block;
          font-size: 16px;
          color: #333;
        }
        .desc {
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #999;
        }
        .pic {
          position: absolute;
          top: 50%;
          right: 0;
          width: 12px;
          height: 12px;
          transform: translateY(-50%);
          img {
            width: 100%;
            display: block;
          }
        }
      }
    }
    .grap {
      width: 100%;
      height: 15px;
      background-color: #f2f2f2;
    }
    .control {
      position: relative;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 5px 8px;
      display: flex;
      justify-content: space-between;
      span {
        display: block;
        font-size: 16px;
        color: #333;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #999;
        margin-right: 15px;
      }
      .pic {
        position: absolute;
        top: 50%;
        right: 10px;
        width: 12px;
        height: 1px;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>