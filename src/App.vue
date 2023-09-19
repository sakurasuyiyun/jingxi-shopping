<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "iconfont"; /* Project id 3618270 */
  src: url("//at.alicdn.com/t/c/font_3618270_ue0ox3b4x4.woff2?t=1692337572562")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_3618270_ue0ox3b4x4.woff?t=1692337572562")
      format("woff"),
    url("//at.alicdn.com/t/c/font_3618270_ue0ox3b4x4.ttf?t=1692337572562")
      format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
