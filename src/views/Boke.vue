<!--
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-10-01 01:20:08
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-04 14:04:34
 * @FilePath: \Isteyft-Boke\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import '@/assets/less/boke.css'
import { ref,onMounted,reactive,shallowRef,onBeforeUnmount,getCurrentInstance } from "vue"
import { UploadPlAPI,GetBokePlAPI,GetBokeIdAPI } from "@/api/api";
import { useRouter,useRoute } from "vue-router";
import '@wangeditor/editor/dist/css/style.css';
import { ElMessage } from 'element-plus';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {useUserStore} from '@/stores/user'
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const id = route.params.id
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('default', options);
}
const bokeData = ref({})
const pinlunData = ref([])
const getBokeData = async () => {
  loading.value = true
  const data = await GetBokeIdAPI(id)
  const data1 = await GetBokePlAPI(id)
  bokeData.value = data.data.boke
  pinlunData.value = data1.data.pinlun  
  // console.log(pinlunData.value);
  bokeData.value.uploadTime = formatTime(bokeData.value.uploadTime)
  bokeData.value.loadTime = formatTime(bokeData.value.loadTime)
  pinlunData.value.forEach(item => {
      item.uploadTime = formatTime(item.uploadTime);
  });
  loading.value = false
}
const Back = ref('Back')
const GoBack = () => {
  router.go(-1)
}
const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}
const handleCancel = () => {
  dialogVisible.value = false
}
const handleAdd = () => {
  dialogVisible.value = true
}
const { proxy } = getCurrentInstance(); // 获取当前组件实例的代理
const onSubmit = () => {
  if (bokeContent.txt === '') {
    ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      })
    return
  }
  proxy.$refs['contentBoke'].validate(async (vaild)=>{
    if (vaild) {
      bokeContent.username = store.userInfo.username ? store.userInfo.username : '游客'
      bokeContent.bokeid = id
      let res = null;
      res = await UploadPlAPI(bokeContent)
      if (res) {
        dialogVisible.value = false
        proxy.$refs['contentBoke'].resetFields()
        bokeContent.txt = ''
        getBokeData()
        ElMessage({
        showClose: true,
        message: "发布成功",
        type: "success",
      })
      }
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确的内容",
        type: "error",
      })
    }
  })
}

const bokeContent = reactive({
  txt: ''
})
const validateContent = (rule, value, callback) => {
  if (value.trim() === '') {
    callback(new Error('内容不能为空'));
  } else {
    callback();
  }
};

const rules = reactive({
  txt: [{ required: true,validator: validateContent, message: '内容是必填项' }]
})
  // 编辑器实例，必须用 shallowRef，重要！
  const mode = ref('default')
  const editorRef = shallowRef()
  const toolbarConfig = {};
  const editorConfig = { placeholder: '请输入内容...' };
  // 组件销毁时，也及时销毁编辑器，重要！
  onBeforeUnmount(() => {
        const editor = editorRef.value;
        if (editor == null) return;

        editor.destroy();
      });
  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  }
onMounted(()=>{
  getBokeData()
})
</script>

<template>
  <div class="main">
    <div class="serach">
      <el-button class="goback" @click="GoBack()">
        <component class="icons" :is="Back"></component>
        返回上一个界面
      </el-button>
    </div>
    <el-scrollbar class="containter">
      <el-skeleton :loading="loading" animated :throttle="500">
        <template #template>
          <div class="boke">
            <el-skeleton-item variant="h2" style="width: 20%;margin-left:40%;text-align: center;"/><br/>
            <el-skeleton-item variant="h3" style="width: 20%;margin-left:40%;margin-top:10px;text-align: center;" /><br/>
            <el-skeleton-item variant="span" style="width: 200px;" />
            <el-skeleton-item variant="span" style="width: 400px;" />
            <el-skeleton-item variant="span" style="width: 300px;" />
            <el-skeleton-item variant="span" style="width: 200px;" />
            <el-skeleton-item variant="span" style="width: 400px;" />
            <el-skeleton-item variant="span" style="width: 300px;" />
          </div>
        </template>
        <template #default>
          <div class="boke">
            <h2>{{bokeData.title ? bokeData.title : ''}}</h2>
            <h3 class="time">{{bokeData.loadTime ? bokeData.loadTime : ''}}</h3>
            <div class="content" v-html="bokeData.txt"></div>
          </div>
        </template>
      </el-skeleton>
      <div class="pl">
        <h2>评论区域：</h2>
        <el-button class="plbuttom primary" @click="handleAdd()">
          <component class="icons" :is="Back"></component>
          评论
        </el-button>
        <div clss="pls">
          <el-skeleton :loading="loading" animated :throttle="500" :count="3">
            <template #template>
              <div class="pinlun">
                <div>
                  <el-skeleton-item variant="image" style="width:36px;height:36px;border-radius: 50%;" />          
                </div>
                <div class="text">
                  <el-skeleton-item variant="h2" style="width: 50px;height:12px;"/><br/>
                  <el-skeleton-item variant="span" style="width: 70px;height:8px;" /><br/>
                  <el-skeleton-item variant="span" style="width: 200px;" />
                </div>
              </div>
            </template>
            <template #default>
              <div class="pinlun" v-for="item in pinlunData" :key="item.plid">
                <div>          
                  <el-image class="img" src="https://isteyft.top:3000/ServerImage/assets/user.png" />
                </div>
                <div class="text">
                  <h2>{{item.username}}</h2>
                  <span>{{item.uploadTime}}</span>
                  <div class="content" v-html="item.txt"></div>
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </el-scrollbar>
    <el-dialog
    v-model="dialogVisible"
    title="新增评论"
    width="90%"
    :before-close="handleClose">
       <!--需要注意的是设置了:inline="true"，
        会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
        在css进行处理-->
    <el-form :inline="true"  :model="bokeContent" :rules="rules" ref="contentBoke">
      <el-row>
        <el-col :span="24">
        <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="bokeContent.txt"
        style="height: 400px;"
        @onCreated="handleCreated"/>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
  </div>
</template>

<style scoped lang="less">
img,video {
  max-width: 90%;
}
.icons {
  height: 2vh;
  width: 2vw;
}
.main {
  transition-duration: 1000ms;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  //height: 500px;
  background: var(--el-bg-color);
  gap: 10px;
  img,video {
    max-width: 90%;
  }
}
.containter {
  .boke {
    min-height: 50px;
    margin-top: 10px;
    h2 {
      text-align: center;
      font-size: 2em;
      font-weight: 500;
    }
    .time {
      margin: 0 auto;
      margin-top: 10px;
      font-size: 1em;
      color: #555666;
      text-align: center;
    }
    .content {
      margin-top: 20px;
    }
  }
}
.pl {
  margin-top: 15px;
  padding: 5px;
  border-top: 3px solid #f0f0f2;
  h2 {
    font-size: 1em;
    font-weight: 500;
  }
}
.plbuttom {
  margin-top: 20px;
  margin-bottom: 20px;
}
.pinlun {
  margin: 0 auto;
  width: 80%;
  display: flex;
  padding: 10px;
  background: var(--el-bg-color);
  border-bottom: 1px solid #f0f0f2;
  gap: 10px;
  margin-bottom: 10px;
  .img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }
  span {
    font-size: 0.4em;
    color: #555666;
  }
}

.edit {
  border: 1px solid #ccc;
  height: 200px;
  width: 100%;
}
@media (max-width:768px) {
  .main {
    width: 100%;
    //height: 100%;
    margin-bottom: 50px;
    background-color: var(--el-content-bg-color);
  }
  .pl {
    border-top: 2px solid #d4caca;
  }
  .pinlun {
    margin: 0 auto;
    width: 100%;
    display: flex;
    padding: 10px;
  }
}
</style>