<script setup>
import { ref,getCurrentInstance,onMounted,reactive,onBeforeUnmount,shallowRef,nextTick } from "vue"
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import { useRoute } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus';
import { GetPlAPI,DelPlAPI,UpdatePlAPI } from "@/api/api";
const tableData = ref([])
const tableLabel = reactive([
  {
    prop: "bokeId",
    label: "ID编号",
    width: "200px",
  },
  {
    prop: "plid",
    label: "评论编号",
  },
  {
    prop: "txt",
    label: "评论内容",
  },
  {
    prop: "uploadTime",
    label: "修改时间",
  },
  {
    prop: "username",
    label: "评论名",
  },
])
const queryObj = {
  username: '',
  pageNum: 1, 
  pageSize: 6,
  ss: '',
  total: 0
}
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('default', options);
}
const getPlData = async () => {
  // console.log(config)
  const data = await GetPlAPI(queryObj)
  // console.log(data)
  tableData.value = data.data.pinlunlist.list
  queryObj.total = data.data.count
  tableData.value.forEach(item => {
        item.uploadTime = formatTime(item.uploadTime);
    });
}
const { proxy } = getCurrentInstance(); // 获取当前组件实例的代理
const formInline = reactive({
  keyWord: ''
})
const onSerach = () => {
  queryObj.ss = formInline.keyWord 
  getPlData()
}
//切换页面
const handleChange1 = (page) => {
  queryObj.pageNum = page
  getPlData()
}
//删除
const handleDelete = (val) => {
  ElMessageBox.confirm("你确认要删除吗").then(async ()=>{
    await DelPlAPI(val.bokeId)
    ElMessage({
      showClose:true,
      message:'删除成功',
      type:'success'
    })
    getPlData()
  })
  // console.log(val);
}
const action = ref('add')
const dialogVisible = ref(false)
const bokeContent = reactive({
  username: '',
  txt: ''
})
const rules = reactive({
  username: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  txt: [{ required: true, message: '内容是必填项' }]
})
const handleClose = () => {
  dialogVisible.value = false
}
const handleCancel = () => {
  dialogVisible.value = false
}
const onSubmit = () => {
  proxy.$refs['contentBoke'].validate(async (vaild)=>{
    if (vaild) {
      let res = null;
      if(action.value == "edit"){
        res = await UpdatePlAPI(bokeContent)
      }
      if (res) {
        dialogVisible.value = false
        proxy.$refs['contentBoke'].resetFields()
        bokeContent.txt = ''
        getPlData()
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
  nextTick(()=>{
        //因为在第一次显示弹窗的时候form组件没有加载出来，如果直接对formUser赋值，这个值会作为form表单的初始值
        //所以使用nextTick，赋值的操作在一个微任务中，这样就可以避免在from表单加载之前赋值

        Object.assign(bokeContent,{...val})
        //这里需要改变sex数据类型，是因为el-option的value有类型的校验
    })
}

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
  getPlData()
})
</script>

<template>
  <div class="user-header">
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
    :title="action == 'edit' ? '编辑评论' :'编辑评论'"
    width="90%"
    :before-close="handleClose">
       <!--需要注意的是设置了:inline="true"，
        会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
        在css进行处理-->
    <el-form :inline="true"  :model="bokeContent" :rules="rules" ref="contentBoke">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="bokeContent.username" placeholder="请输入用户名" />
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