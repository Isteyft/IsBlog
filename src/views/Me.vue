<script setup>
import '@/assets/less/boke.css'
import { ref,onMounted,reactive,shallowRef,onBeforeUnmount,getCurrentInstance } from "vue"
import { UploadPlAPI,GetBokePlAPI,GetBokeIdAPI } from "@/api/api";
import '@wangeditor/editor/dist/css/style.css';
import { ElMessage } from 'element-plus';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {useUserStore} from '@/stores/user'
import Prism from "prismjs"//代码高亮core
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js"//行号插件
import "prismjs/themes/prism-tomorrow.min.css"//高亮主题
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css"//行号插件的样式
import "prismjs/plugins/toolbar/prism-toolbar.css"//行号插件的样式
import "prismjs/plugins/toolbar/prism-toolbar.js"//行号插件的样式
import "prismjs/plugins/show-language/prism-show-language.js"//行号插件的样式
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js"//行号插件的样式
const store = useUserStore()
const loading = ref(true)
const id = 1
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
      bokeContent.bokeId = id
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
  username: store.userInfo.username ? store.userInfo.username : '游客',
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
  username: [{ required: true, message: '内容是必填项', trigger: "blur"}],
  txt: [{ required: true,validator: validateContent, message: '内容是必填项' }]
})
  // 编辑器实例，必须用 shallowRef，重要！
  const mode = ref('default')
  const editorRef = shallowRef()
  const toolbarConfig = {};
  toolbarConfig.excludeKeys = [
    'uploadImage',
    'uploadVideo',
]
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
onMounted(async ()=>{
  await getBokeData()
  Prism.highlightAll()
})
</script>

<template>
  <div class="guanyu">
    <MyDec />
    <div class="guanyu-container">
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
              <h3 class="visit"><el-icon><View /></el-icon>{{bokeData.visit}}</h3>
              <div class="content editor-content-view line-numbers" data-plugin-header="show-language" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="超时" v-html="bokeData.txt"></div>
            </div>
          </template>
        </el-skeleton>
        <div class="pl">
          <h2 class="title">评论区域：</h2>
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
                    <div class="content editor-content-view" v-html="item.txt"></div>
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
        <el-col :span="12">
          <el-form-item label="留言名称" prop="username">
            <el-input v-model="bokeContent.username" placeholder="请输入留言名称" />
          </el-form-item>
        </el-col>
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
  </div>
</template>

<style scoped lang="less">
.guanyu {
  display: flex;
}
img,video {
  max-width: 90%;
}
.icons {
  height: 2vh;
  width: 2vw;
}
.guanyu-container {
  min-width: 568px;
  width: 75%;
  transition-duration: 1000ms;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color);
  gap: 10px;
  img,video {
    max-width: 90%;
  }
}
.containter {
  .boke {
    min-height: 500px;
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
    .visit {
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
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 1.5em;
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
  h2 {
    font-size: 1em;
    font-weight: 500;
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
  .guanyu-container {
    width: 100%;
    max-width: 768px;
    min-width: 368px;
    background-color: var(--el-content-phone-bg-color);
  }
  .pl {
    background-color: var(--el-content-phone-bg-color);
    border-top: 2px solid #d4caca;
  }
  .pinlun {
    background-color: var(--el-boke-phone-bg-color);
    margin: 0 auto;
    width: 100%;
    display: flex;
    padding: 10px;
  }
}
</style>