<template>
  <dir>
    <div class="container" v-if="isShow">
      <TopBar text="商品评价"></TopBar>
      <div class="top">
        <div class="pic">
          <img :src="data[0].imgUrl" alt="" />
        </div>
        <span>商品评分</span>
        <van-rate class="rate" v-model="rata.prodcut_score" color="#ffd21e" />
      </div>
      <div class="content">
        <van-field
          v-model="rata.message"
          rows="3"
          autosize
          type="textarea"
          maxlength="500"
          placeholder="评价大于20元的商品超过10个字就有机会获得西豆"
          show-word-limit
        />
      </div>
      <div class="upload">
        <input
          type="file"
          ref="file"
          accept="image/*"
          class="file"
          @change="handleFileChange"
        />
        <div class="pics" ref="pic"></div>
        <div ref="item" class="item" @click="addPic">
          <span>+</span>
          <p>添加图片</p>
        </div>
      </div>
      <div class="grap"></div>
      <div class="rate-more">
        <div class="item">
          <span>快递包装</span>
          <van-rate class="rate" v-model="rata.express_score" color="#ffd21e" />
        </div>
        <div class="item">
          <span>送货速度</span>
          <van-rate class="rate" v-model="rata.speed_score" color="#ffd21e" />
        </div>
        <div class="item">
          <span>配送员服务</span>
          <van-rate
            class="rate"
            v-model="rata.deliveryman_score"
            color="#ffd21e"
          />
        </div>
      </div>
      <div class="btn" @click="submit">提交</div>
    </div>
    <template>
      <div class="circle" v-if="show">
        <van-circle
          v-model="uploadPercent"
          :stroke-width="60"
          :text="uploadPercent + '%'"
          class="progress"
        />
      </div>
    </template>
  </dir>
</template>

<script>
import TopBar from "@/components/topBar";
import { get } from "@/utils/request";
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "Comment",
  components: {
    TopBar,
  },
  data() {
    return {
      rata: {
        prodcut_score: 0,
        express_score: 0,
        speed_score: 0,
        deliveryman_score: 0,
        message: "",
      },
      data: [],
      isShow: false,
      imgUrl: "",
      show: false,
      orderId: "",
      uploadPercent: 0,
    };
  },
  methods: {
    async getData(orderId) {
      const username = localStorage.username;
      const res = await get("/orderDetail", {
        username,
        orderId,
      });
      console.log(res);
      if (res?.errno === 0) {
        this.data = res.data;
        this.isShow = true;
      } else {
        Toast(res.message);
        setTimeout(() => {
          this.$router.back();
        }, 500);
      }
    },
    addPic() {
      const file = this.$refs.file;
      file.click();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      const pic = this.$refs.pic;
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.upload();
        this.imgUrl = e.target.result;
        const img = new Image();
        img.onload = () => {
          img.classList.add("auto-img");
          img.height = 75;
          const div = document.createElement("div");
          div.classList.add("img-div");
          div.appendChild(img);
          pic.appendChild(div);
        };
        img.src = e.target.result;
      };
    },
    async upload() {
      const username = localStorage.username;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      setTimeout(() => {
        this.show = true;
      }, 100);
      try {
        const response = await axios.post(
          `http://1.12.73.162/api/commentUploadImg?username=${username}&orderId=${this.orderId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              // 计算上传进度百分比
              this.uploadPercent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          }
        );
        console.log(response.data);
        if (response.data.errno === 0) {
          this.$toast("上传图片成功");
          this.show = false;
        } else {
          this.$toast("上传图片失败");
        }
      } catch (error) {
        console.error("上传文件失败", error);
        this.show = false;
      }
    },
    async submit() {
      const username = localStorage.username;
      const res = await get("/addComment", {
        data: this.rata,
        username,
        orderId: this.orderId,
      });
      console.log(res);
      Toast(res.message);
      setTimeout(() => {
        this.$router.back();
      }, 500);
    },
  },
  created() {
    const order_id = this.$route.params.orderId;
    this.orderId = order_id;
    this.getData(order_id);
  },
};
</script>

<style lang="scss" scoped>
dir {
  .container {
    width: 100%;
    .top {
      width: calc(100% - 20px);
      padding: 15px 0;
      margin: 0 10px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      .pic {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          display: block;
        }
      }
      span {
        margin-left: 20px;
      }
      .rate {
        margin-left: 15px;
      }
    }
    .content {
    }
    .upload {
      width: calc(100% - 20px);
      padding: 15px 0;
      margin: 0 10px;
      font-size: 14px;
      .file {
        display: none;
      }
      .pics {
        width: calc(100% - 20px);
        margin: 0 10px;
        display: flex;
        flex-wrap: wrap;

        .img-div {
          width: 75px;
          height: 75px;
          position: relative;

          .prograss {
            width: 100%;
            height: 75px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }
          img {
            width: 100%;
            display: block;
          }
        }
      }

      p {
      }
      .item {
        width: 75px;
        height: 75px;
        background-color: #f7f7f7;
        font-size: 12px;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 20px;
        span {
          display: block;
          width: 23px;
          height: 20px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-image: url("@/assets/icon/photo.png");
        }
        p {
          width: 100%;
          margin-top: -20px;
          text-align: center;
        }
      }
    }
    .grap {
      width: 100%;
      height: 15px;
      background-color: #f2f2f2;
    }
    .rate-more {
      .item {
        width: calc(100% - 20px);
        margin: 0 10px;
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        span {
          display: block;
          min-width: 20%;
        }
        .rate {
          margin-left: 15px;
        }
      }
    }
    .btn {
      width: calc(100% - 20px);
      margin: 0 auto;
      text-align: center;
      height: 46px;
      line-height: 46px;
      margin-top: 20px;
      background-color: #e93b3d;
      color: #fff;
      font-size: 16px;
    }
  }
  .circle {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.7);
    color: white !important;

    .van-circle {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      ::v-deep .van-circle__text {
        color: white;
      }
    }
  }
}
</style>