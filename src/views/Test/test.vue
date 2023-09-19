<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="changeAvater">上传文件</button>
  </div>
  <!-- <div>
    <van-uploader v-model="fileList" multiple />
    <van-button type="primary" @click="upload">上传</van-button>
  </div> -->
</template>

 <script>
import axios from "axios";
export default {
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile); // 在文件选择事件回调中输出选中的文件
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
            username,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("上传文件失败", error);
      }
    },
  },
  created() {

  }
};
</script>


<!-- // <script>
// import axios from "axios";
// export default {
//   data() {
//     return {
//       fileList: [
//         // Uploader 根据文件后缀来判断是否为图片文件
//         // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
//       ],
//     };
//   },
//   methods: {
//     async upload() {
//       console.log(this.fileList);
//       try {
//         const response = await axios.post(
//           "http://1.12.73.162/api/uploadFile",
//           this.fileList,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.error("上传文件失败", error);
//       }
//     },
//   },
// };
// </script>
-->