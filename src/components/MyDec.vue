<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-08-24 21:34:34
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 14:37:38
 * @FilePath: \vue-m-system\src\components\CommonHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.jpg`,import.meta.url).href;
};
</script>

<template>
  <div class="containter">
    <div class="me mycard">
      <div class="userIcon">
        <img :src="getImageUrl('user')" class="user" />
      </div>
      <div class="userInfo">
        <h1>鬼灯明里</h1>
        <p>技术宅，大懒人一个</p>
      </div>
    </div> 
    <el-card class="friend mycard">
      <template #header>
        <div class="card-header">
          <span>相关链接</span>
        </div>
      </template>
      <ul>
        <li><a href="https://github.com/Isteyft"><el-icon><Link /></el-icon>github</a></li>
        <li><a href="https://gitee.com/isteyft"><el-icon><Link /></el-icon>gitee</a></li>
        <li><a href="https://space.bilibili.com/224640531"><el-icon><Link /></el-icon>bilibili</a></li>
      </ul>
    </el-card> 
    <el-card class="plan mycard">
      <template #header>
        <div class="card-header">
          <span>计划-目标</span>
        </div>
      </template>
      <p>30岁前学会前端框架师的东西</p>
    </el-card>  
    <el-card class="info mycard">
      <template #header>
        <div class="card-header">
          <span>资料</span>
        </div>
      </template>
      <ul>
        <li>2004.5.26</li>
        <li>20岁  双子座 男</li>
        <li>血型 AB</li>
      </ul>
    </el-card>  
  </div>
</template>

<style scoped lang="less">
.containter {
  transition-duration: 1000ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  gap: 10px;
}
.mycard {
  width: 200px;
  border-radius: 10px;
  padding: 0;
  background: var(--el-bg-color);
}
.me {
  text-align: center;
  padding: 10px;
  .userIcon {
    .user {
      border-radius: 10px;
      width: 150px;
      height: 150px;
    }
  }
  .userInfo {
    margin-top: 10px;
    line-height: 24px;
    h1 {
      font-size: 18px;
    }
    p {
      font-size: 16px;
    }
  }
}
@media (max-width:768px) {
  .containter {
    display: none;
  }
  .me {
    text-align: center;
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
  }
}
</style>