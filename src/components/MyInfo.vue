<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-08-24 21:34:34
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-04 12:47:03
 * @FilePath: \vue-m-system\src\components\CommonHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.jpg`,import.meta.url).href;
};
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="header">
    <span class="content-user" @click="goBack()">
      <img :src="getImageUrl('user')" class="user" />
    </span>
    <div class="content-text">
      <div class="title">
        <h2>鬼灯明里</h2>
      </div>
      <div class="dec">
        <span>个人简介：大懒人一位，偶尔会冒出什么想法，一刻不停歇的为了自己的目标前进</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  transition-duration: 1000ms;
  margin: 0 auto;
  margin-top: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 20%;
  background: var(--el-bg-color);
  gap: 10px;
}
.content-user {
  .user {
    border: 2px solid rgba(0, 0, 0, .4);
    width: 80px;
    height: 80px;
    margin-left: 20px;
    border-radius: 50%;
  }
}
.content-text {
  display: flex;
  flex-direction: column;
  .title {
    font-size: 24px;
    margin-top: 0;
  }
  .dec {
    margin-top: 20px;
    font-size: 14px;
    color: #555666;
  }
}
@media (max-width:768px) {
  .header {
    width: 100%;
    height: 50px;
    background: var(--el-bg-color);
  }
  .content-user {
    height: 32px;
    width: 32px;
    margin: auto;
    .user {
      border: 1px solid rgba(0, 0, 0, .4);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin: auto;
    }
  }
  .content-text {
    display: none;
  }
}
:deep(img) {
  cursor: pointer !important;
}
</style>