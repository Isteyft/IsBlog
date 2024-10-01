<script setup>
import { ref,getCurrentInstance,onMounted,reactive,nextTick } from "vue"
import '@wangeditor/editor/dist/css/style.css';
// import { useRoute } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus';
import { GetImageAPI,DelImageAPI,UpdateImageAPI } from "@/api/api";
import { genFileId } from 'element-plus'
import {useUserStore} from '@/stores/user'
const store = useUserStore()
const tableData = ref([])
const tableLabel = reactive([
  {
    prop: "wallpaperId",
    label: "ID编号",
    width: "200px",
  },
  {
    prop: "labels",
    label: "标签",
  },
  {
    prop: "renderWallpaper",
    label: "图片",
    width: "200px",
  },
  {
    prop: "uploadTime",
    label: "修改时间",
  },
  {
    prop: "username",
    label: "上传者",
  },
])
const queryObj = {
  username: '',
  pageNum: 1, 
  pageSize: 3,
  ss: '',
  total: 0
}
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('default', options);
}
const getImageData = async () => {
  // console.log(config)
  const data = await GetImageAPI(queryObj)
  // console.log(data)
  tableData.value = data.data.wallpaperlist.list
  queryObj.total = data.data.count
  tableData.value.forEach(item => {
        item.wallpaper = "https://isteyft.top:3000/ServerImage/"+item.wallpaperId
        item.uploadTime = formatTime(item.uploadTime);
    });
}
const { proxy } = getCurrentInstance(); // 获取当前组件实例的代理
const formInline = reactive({
  keyWord: ''
})
const onSerach = () => {
  queryObj.ss = formInline.keyWord 
  getImageData()
}
//切换页面
const handleChange1 = (page) => {
  queryObj.pageNum = page
  getImageData()
}
//删除
const handleDelete = (val) => {
  ElMessageBox.confirm("你确认要删除吗").then(async ()=>{
    await DelImageAPI(val.wallpaperId)
    ElMessage({
      showClose:true,
      message:'删除成功',
      type:'success'
    })
    getImageData()
  })
  // console.log(val);
}
const action = ref('add')
const actionmethod = ref('post')
const actionhref = ref('https://isteyft.top:8888/v2/wp/upload')
const dialogVisible = ref(false)
const bokeContent = reactive({
  labels: ''
})
const rules = reactive({
  labels: [{ required: true, message: "标签是必填项", trigger: "blur" }],

})
const handleClose = () => {
  dialogVisible.value = false
}
const handleCancel = () => {
  dialogVisible.value = false
}
const handleAdd = () => {
  action.value = 'add'
  actionhref.value = 'https://isteyft.top:8888/v2/wp/upload'
  actionmethod.value = 'post'
  dialogVisible.value = true
}
const token = store.userInfo.token
const heads = ref({'Authorization':`Bearer ${token}`})
let res = null;
const handleUploadSuccess = (val) => {
  res = val
  if (res) {
        dialogVisible.value = false
        proxy.$refs['contentBoke'].resetFields()
        bokeContent.labels = ''
        getImageData()
      }
}
const handleUploadError = (val) => {
  res = val
  console.log(res);
  ElMessage({
    showClose: true,
    message: "请输入正确的内容",
    type: "error",
  })
}
const onSubmit = () => {
  proxy.$refs['contentBoke'].validate(async (vaild)=>{
    if (vaild) {
      bokeContent.tag = bokeContent.labels
      bokeContent.username = store.userInfo.username
      upload.value.data = bokeContent.value
       if (action.value === 'add') {
        upload.value.submit()
      }
      if(action.value == 'edit'){
        upload.value.submit()
        res = await UpdateImageAPI(bokeContent)
      }
      if (res) {
        dialogVisible.value = false
        proxy.$refs['contentBoke'].resetFields()
        bokeContent.labels = ''
        getImageData()
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
const handleEdit = (val) => {
  action.value = 'edit'
  actionhref.value = 'https://isteyft.top:8888/v2/wp/update'
  actionmethod.value = 'PUT'
  dialogVisible.value = true
  nextTick(()=>{
        //因为在第一次显示弹窗的时候form组件没有加载出来，如果直接对formUser赋值，这个值会作为form表单的初始值
        //所以使用nextTick，赋值的操作在一个微任务中，这样就可以避免在from表单加载之前赋值
        Object.assign(bokeContent,{...val})
        //这里需要改变sex数据类型，是因为el-option的value有类型的校验
    })
}
const upload = ref()
const handleExceed = function(files) {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
}
onMounted(()=>{
  getImageData()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd()">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="请输入关键词" v-model="formInline.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerach">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="item in tableLabel" :key='item.bokeId' :label="item.label" :prop="item.prop">
        <template v-if="item.prop === 'renderWallpaper'" #default="{ row }">
          <img :src="row.wallpaper" alt="wallpaper" style="max-width: 100px; max-height: 100px" />
        </template>
        </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="paper" :default-page-size="queryObj.pageSize" layout="prev,pager,next" size="small" :total="queryObj.total" @current-change="handleChange1"/>
    <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增博客' : '编辑博客'"
    width="90%"
    :before-close="handleClose">
       <!--需要注意的是设置了:inline="true"，
        会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
        在css进行处理-->
    <el-form :inline="true"  :model="bokeContent" :rules="rules" ref="contentBoke">
      <el-row>
        <el-col :span="24">
          <el-form-item label="图片标签" prop="labels">
            <el-input v-model="bokeContent.labels" placeholder="请输入标签" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-upload
          ref="upload"
          class="upload-demo"
          drag
          :method="actionmethod"
          :action="actionhref"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :headers="heads"
          :data="bokeContent"
          @success="handleUploadSuccess"
          @error="handleUploadError"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖动上传或者<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png图片，大小不超过500kb
            </div>
          </template>
        </el-upload>
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
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .paper {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table{
    width: 100%;
    height: 500px;
  }
}
.select-clearn {
  display: flex;
}
</style>