<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-10-01 01:20:08
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 21:20:08
 * @FilePath: \Isteyft-Boke\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref,onMounted,reactive } from "vue"
import { GetBokeAPI, GetTopAPI } from "@/api/api";
import { useRouter } from "vue-router";
const router = useRouter()
const formInline = reactive({
  keyWord: ''
})
const queryObj = {
  username: '',
  pageNum: 1, 
  pageSize: 10,
  ss: '',
  total: 0
}
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('default', options);
}
const tableData = ref([])
const topData = ref([])
const getBokeData = async () => {
  const data = await GetBokeAPI(queryObj)
  const data1 = await GetTopAPI()
  // console.log(data1);
  tableData.value = data.data.bokelist.list
  topData.value = data1.data.topboke
  queryObj.total = data.data.count
  console.log(topData.value);
  
  tableData.value.forEach(item => {
      item.uploadTime = formatTime(item.uploadTime);
  });
  topData.value.forEach(item => {
      item.uploadTime = formatTime(item.uploadTime);
  });
}
const getImageUrl = () => {
  return new URL(`@/assets/images/bg1.jpg`,import.meta.url).href
} 
const onSerach = () => {
  if(formInline.keyWord === '') return
  queryObj.ss = formInline.keyWord 
  getBokeData()
}
const handleChange1 = (page) => {
  queryObj.pageNum = page
  getBokeData()
}
const GoBoke = (id) => {
  router.push(`/boke/${id}`)
}
const CaretTop = ref('CaretTop')
onMounted(()=>{
  getBokeData()
})
</script>

<template>
  <div class="main">
    <div class="serach">
      <div></div>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="请输入">
          <el-input placeholder="请输入相关字段" v-model="formInline.keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSerach">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="top">
      <div class="boke" v-for="item in topData" :key="item.bokeId" @click="GoBoke(item.bokeId)">
        <div>          
          <image class="img" :src="item.imgurl ? item.wallpaper : getImageUrl()" />
        </div>
        <div class="text">
          <h2>{{item.title}}</h2>
          <span>{{item.uploadTime}}</span>
        </div>
        <div class="topicon">
          <component class="icons" :is="CaretTop"></component>
        </div>
      </div>
    </div>
    <el-scrollbar class="bokes">
      <el-card shadow="always" class="boke" v-for="item in tableData" :key="item.bokeId" @click="GoBoke(item.bokeId)">
        <div>          
          <image class="img" :src="item.imgurl ? item.wallpaper : getImageUrl()" />
        </div>
        <div class="text">
          <h2>{{item.title}}</h2>
          <span>最后修改时间:{{item.uploadTime}}</span>
        </div>
      </el-card>
    </el-scrollbar>
    <el-pagination class="paper" :default-page-size="queryObj.pageSize" layout="prev,pager,next" size="small" :total="queryObj.total" @current-change="handleChange1"/>
  </div>
</template>

<style scoped lang="less">
.main {
  transition-duration: 1000ms;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-width: 380px;
  max-height: 500px;
  background: var(--el-bg-color);
  gap: 10px;
}
.serach {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.bokes {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.boke {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px auto;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f2;
  .img {
    max-width: 10vw;
    max-height: 10vh;
    margin: 10px;
  }
  .text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 1.2em;
      font-weight: 300;
    }
    span {
      margin-top: 10px;
      font-size: 0.6em;
      color: #555666;
    }
  }
  .topicon {
    margin-left: auto;
    margin-right: 10px;
    height: 32px;
    width: 32px;
    .icons {
      color: #555666;
      height: 32px;
      width: 32px;
    }
  }
}
.paper {
  margin: auto;
}
@media (max-width:768px) {
  .main {
    width: 100%;
    height: 100%;
    min-height: 718px;
    margin-bottom: 50px;
    padding: 0;
    background-color: var(--el-content-bg-color);
    gap: 0;
  }
  .serach {
    margin-top:10px;
  }
  .bokes {
    height: 100%;
  }
  .boke {
    background: var(--el-bg-color);
    border: 1px solid var(--el-bg-color);
    margin: 0;
    padding: 0;
    h2 {
      font-weight: normal;
    }
    .img {
      display: none;
    }
  }
  .top {
    border-bottom: 1px solid var(--el-border-colors);
  }
}
</style>