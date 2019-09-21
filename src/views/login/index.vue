<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
      <h2 class="login-title">阿香会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { login, getUserInfo } from '../../api/login'
  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.form.username, this.form.password).then(response => {
              const resp = response.data
              if (resp.flag) {
                // 验证成功, 通过token去获取用户信息
                getUserInfo(resp.data.token).then(response => {
                  // 获取到了用户的数据
                  const respUser = response.data
                  if (respUser.flag) {
                    console.log('userInfo', respUser.data)
                    // 1. 保存 token, 用户信息
                    localStorage.setItem('ax-mms-user', JSON.stringify(respUser.data))
                    localStorage.setItem('ax-mms-token', resp.data.token)
                    // 2. 前往首页
                    this.$router.push('/')
                  } else {
                    this.$message({
                      message: respUser.message,
                      type: 'warning'
                    });
                  }
                })
              } else {
                // 未通过, 弹出警告
                this.$message.error('错了哦，这是一条错误消息');
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../../assets/login.jpg');
  .login-form {
    width: 350px;
    margin: 160px auto;
    background: rgba(255, 255, 255, .8);
    padding: 28px;
    border-radius: 20px;
    .login-title {
      color: #303133;
      text-align: center;
    }
  }
}

</style>