<script setup>
import { ref,getCurrentInstance,onMounted,reactive,onBeforeUnmount,shallowRef,nextTick } from "vue"
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import { useRoute } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus';
import { GetPlAPI,GetBokeAPI,DelBokeAPI,UpdateBokeAPI,UploadBokeAPI } from "@/api/api";
import {useUserStore} from '@/stores/user'
import { useRouter } from "vue-router";
import { formatTime } from "@/utils/formatTime";
const router = useRouter()
const store = useUserStore()
const tableData = ref([])
const tableLabel = reactive([
  {
    prop: "top",
    label: "置顶",
  },
  {
    prop: "bokeId",
    label: "ID编号",
    width: "200px",
  },
  {
    prop: "title",
    label: "标题",
  },
  {
    prop: "tag",
    label: "标签",
  },
  {
    prop: "loadTime",
    label: "上传时间",
  },
  {
    prop: "uploadTime",
    label: "修改时间",
  },
])
const queryObj = {
  username: '',
  pageNum: 1, 
  pageSize: 6,
  ss: '',
  total: 0
}
const getBokeData = async () => {
  const test = await GetPlAPI(queryObj)
  // console.log(data)
  if (test.code === 401) {
    router.push('/login')
  }
  // console.log(config)
  const data = await GetBokeAPI(queryObj)
  // console.log(data)
  tableData.value = data.data.bokelist.list
  queryObj.total = data.data.count
  tableData.value.forEach(item => {
        item.loadTime = formatTime(item.loadTime);
        item.uploadTime = formatTime(item.uploadTime);
    });
}
const { proxy } = getCurrentInstance(); // 获取当前组件实例的代理
const formInline = reactive({
  keyWord: ''
})
const onSerach = () => {
  if(formInline.keyWord === '') return
  queryObj.ss = formInline.keyWord 
  getBokeData()
}
//切换页面
const handleChange1 = (page) => {
  queryObj.pageNum = page
  getBokeData()
}
//删除
const handleDelete = (val) => {
  ElMessageBox.confirm("你确认要删除吗").then(async ()=>{
    await DelBokeAPI(val.bokeId)
    ElMessage({
      showClose:true,
      message:'删除成功',
      type:'success'
    })
    getBokeData()
  })
  // console.log(val);
}
const action = ref('add')
const dialogVisible = ref(false)
const bokeContent = reactive({
  title: '',
  imgurl: '',
  tag: '',
  top: 'false',
  txt: ''
})
const rules = reactive({
  title: [{ required: true, message: "标题是必填项", trigger: "blur" }],
  imgurl: [{ required: false, message: "文章封面是选填项", trigger: "blur" }],
  tag: [{ required: true, message: "标签是选填项", trigger: "blur" }],
  top: [{ required: true, message: "是否置顶是必选项", trigger: "change" }],
  txt: [{ required: true, message: '内容是必填项' }]
})
const handleClose = () => {
  dialogVisible.value = false
}
const handleCancel = () => {
  dialogVisible.value = false
}
const handleAdd = () => {
  action.value = 'add'
  dialogVisible.value = true
}
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
      bokeContent.username = store.userInfo.username
      if (bokeContent.imgurl === null || bokeContent.imgurl === '') {
        bokeContent.imgurl = 'https://isteyft.top/assets/bg1-Dsmlmim0.jpg'
      }
      let res = null;
       if (action.value === 'add') {
        res = await UploadBokeAPI(bokeContent)
      }
      if(action.value == "edit"){
        res = await UpdateBokeAPI(bokeContent)
      }
      if (res) {
        dialogVisible.value = false
        proxy.$refs['contentBoke'].resetFields()
        getBokeData()
        ElMessage({
        showClose: true,
        message: "修改成功",
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
const handleEdit = (val) => {
  action.value = 'edit'
  dialogVisible.value = true
  val.top = val.top === 'yes' ? 'true' : 'false';
  nextTick(()=>{
        Object.assign(bokeContent,{...val})
    })
}

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
onMounted(()=>{
  getBokeData()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd()">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSerach">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="item in tableLabel" :key='item.bokeId' :label="item.label" :prop="item.prop"/>
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
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="bokeContent.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="文章封面" prop="imgurl">
            <el-input v-model="bokeContent.imgurl" placeholder="请输入图片链接"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item class="select-clearn" label="是否置顶" prop="top">
            <el-select  v-model="bokeContent.top" placeholder="请选择">
              <el-option label="是" value="true" />
              <el-option label="否" value="false" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="文章标签" prop="tag">
            <el-input v-model="bokeContent.tag" placeholder="请输入标签" />
          </el-form-item>
        </el-col>
      </el-row>
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
    background: var(--el-content-bg-color);
  }
  .el-table{
    width: 100%;
    height: 500px;
  }
}
.el-input{
  width: 500px;
}
@media (min-width:1024px) {
  .el-input{
    width: 800px;
  }
}
@media (max-width:1024px) {
  .el-input{
    width: 650px;
  }
}
@media (max-width:768px) {
  .el-input{
    width: 500px;
  }
}
@media (max-width:600px) {
  .el-input{
    width: 300px;
  }
}
.select-clearn {
  display: flex;
}
</style>