<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-10-01 01:20:08
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-04 13:36:15
 * @FilePath: \Isteyft-Boke\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref,onMounted } from "vue";
import { GetBokeByTagAPI } from "@/api/api";
import { useRouter } from "vue-router";
import { formatTime } from "@/utils/formatTime";
const router = useRouter();
const loading = ref(true);
const queryObj = {
  username: '',
  pageNum: 1, 
  pageSize: 10,
  ss: '日常',
  total: 0
};
const tableData = ref([]);
const getBokeData = async () => {
  
  loading.value = true;
  const data = await GetBokeByTagAPI(queryObj);
  console.log(data);
  
  tableData.value = data.data.bokelist.list;
  queryObj.total = data.data.count;
  console.log(queryObj);
  console.log(tableData.value);
  tableData.value.forEach(item => {
      item.uploadTime = formatTime(item.uploadTime);
  });
  loading.value = false;
};
const getImageUrl = () => {
  return new URL(`@/assets/Images/bg.jpg`,import.meta.url).href;
}; 
const handleChange1 = (page) => {
  queryObj.pageNum = page;
  getBokeData();
};
const GoBoke = (id) => {
  router.push(`/boke/${id}`);
};
onMounted(()=>{
  getBokeData();
});
</script>

<template>
  <div class="main">
    <el-skeleton :loading="loading" animated :throttle="500" :count="3">
      <template #template>
        <div class="bokes">
          <el-skeleton-item variant="h1" style="width: 50px;height: 50px;" />
        <article class="boke">
          <div class="content">
            <div class="text">
              <el-skeleton-item variant="h2" style="width: 50px" />
              <el-skeleton-item variant="span" style="margin-top: 10px;width: 60px" />
              <el-skeleton-item variant="span" style="margin-top: 10px;width: 40px" />
              <el-skeleton-item variant="span" style="margin-top: 10px;width: 100px" />
            </div>
            <div>          
              <el-skeleton-item variant="image" style="width:120px;height:120px;" />
            </div>
          </div>
        </article>
      </div>
      </template>
      <template #default>
        <div class="bokes notopboke">
          <h1 class="top-title title">日常游戏</h1>
          <article class="boke notop" v-for="item in tableData" :key="item.bokeId" @click="GoBoke(item.bokeId)">
            <div class="content">
              <div class="text">
                <h2>{{item.title}}</h2>
                <span><a href="https://www.isteyft.top">Isteyft</a> - <span class="tag">{{item.tag}}</span></span>
                <span>{{item.visit}}次阅读</span>
                <span>最后修改时间:{{item.uploadTime}}</span>
              </div>
              <div>          
                <img class="img" :alt="item.title+'的封面'" :src="item.imgurl ? item.imgurl : getImageUrl()" />
              </div>
            </div>
          </article>
        </div>
      </template>
    </el-skeleton>
    <el-pagination class="paper" :default-page-size="queryObj.pageSize" layout="prev,pager,next" size="small" :total="queryObj.total" @current-change="handleChange1"/>
  </div>
</template>

<style scoped lang="less">
.main {
  transition-duration: 1000ms;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-width: 380px;
  background: var(--el-bg-color);
  gap: 10px;
}
.title {
  margin: 20px auto;
  color: var(--el-text-color);
  text-align: center;
  font-size: 2em;
}
.bokes {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.notop {
  width: 100%;
  padding-left: 32px;
}
.boke {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid var(--el-card-border-color);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-card-border-radius);
  background-color: var(--el-bg-color-overlay);
  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .text {
      margin-top: 20px;
      margin-left: 10px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      h2 {
        font-size: 1.6em;
        font-weight: 400;
      }
      span {
        margin-top: 10px;
        font-size: 1em;
        color: #555666;
      }
    }
    .img {
      margin-right: 10px;
      width: 120px;
      height: 120px;
      object-fit: cover;
      margin: 10px;
    }
  }
  .topicon {
    margin-left: 10px;
    height: 32px;
    width: 32px;
    .icons {
      color: #555666;
      height: 32px;
      width: 32px;
    }
  }
}
.notopboke {
  margin-top: 10px;
}
.paper {
  margin: auto;
  margin-top: 20px;
}
@media (max-width:768px) {
  .main {
    width: 100%;
    height: 100%;
    min-height: 1080px;
    padding: 0;
    background-color: var(--el-content-phone-bg-color);
    gap: 0;
  }
  .serach {
    margin-top:10px;
  }
  .boke {
    background-color: var(--el-boke-phone-bg-color);
    border: 1px solid var(--el-bg-color);
    margin: 0;
    padding: 0;
    h2 {
      font-weight: normal;
    }
  }
  .paper {
    margin-top: 20px;
  }
}
</style>