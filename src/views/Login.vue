<template>
  <div class="body-login">
    <el-form :model="user" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item>
        <el-input type="input" placeholder="请输入账号" v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import { useRouter } from 'vue-router'
import {loginAPI} from '@/api/api'
import {useUserStore} from '@/stores/user'
const user = reactive({
  username: '',
  password: ''
})
const router = useRouter()
const store = useUserStore()
const handleLogin = async () => {
  const res = await loginAPI(user)
  store.userInfo = {
    username: user.username,
    token: res.data.data1
  }
  if (res.data.data2 === 'admin') {
    router.push('/admin')
  } else {
    router.push('/home')
  }
}
</script>

<style scoped lang="less">
.body-login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/background.jpg");
  background-size: cover;
  overflow: hidden;
}
.login-container {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>