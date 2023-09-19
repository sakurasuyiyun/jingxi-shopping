<template>
  <div class="container">
    <TopBar text="修改头像"></TopBar>
    <input type="file" ref="file" class="file" @change="handleFileChange" />
    <div class="add" @click="showInput" v-if="!show"></div>
    <div class="pic" v-else>
      <img :src="imgUrl" />
      <div class="close" @click="del">x</div>
    </div>
    <button @click="changeAvater">上传文件</button>
  </div>
</template>

 <script>
import axios from "axios";
import TopBar from "@/components/topBar";
export default {
  name: "ChangeAvater",
  components: {
    TopBar,
  },
  data() {
    return {
      imgUrl: "",
      show: false,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.imgUrl = e.target.result;
        this.show = true;
      };
    },
    async changeAvater() {
      const username = localStorage.username;
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      try {
        const response = await axios.post(
          `http://1.12.73.162/api/changeAvater?username=${username}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        if (response.data.errno === 0) {
          this.$toast("修改头像成功");
          setTimeout(() => {
            this.$router.back();
          }, 300);
        } else {
          this.$toast("修改头像失败");
        }
      } catch (error) {
        console.error("上传文件失败", error);
      }
    },
    showInput() {
      const input = this.$refs.file;
      input.click();
    },
    del() {
      this.show = false;
      this.imgUrl = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .file {
    display: none;
  }
  .add {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border: 1px solid black;
    margin-top: 30px;
  }

  .pic {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    margin-top: 30px;

    img {
      width: 100%;
      display: block;
    }
    .close {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 15px;
      height: 15px;
      background-color: rgba($color: #000000, $alpha: 0.7);
      color: white;
      text-align: center;
      border-radius: 50%;
    }
  }
  .add::before {
    position: absolute;
    content: "";
    display: block;
    width: 0;
    height: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-right: 1px solid black;
  }

  .add::after {
    position: absolute;
    content: "";
    display: block;
    width: 60%;
    height: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-bottom: 1px solid black;
  }
  button {
    display: block;
    width: 80%;
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    border: none;
    margin-top: 30px;
  }
}
</style>
