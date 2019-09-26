<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="../../assets/logo.png" width="80px" alt="">
      <span class="title">阿香会员管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a" icon="el-icon-edit">修改密码</el-dropdown-item>
        <el-dropdown-item command="b" icon="el-icon-close">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from '../../api/login'
export default {
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'a':
          this.$message(`修改密码`)
          break;
        case 'b':
          const token = localStorage.getItem('ax-mms-token')
          logout(token).then(response => {
            const resp = response.data
            if (resp.flag) {
              // 退出成功
              // 清除本地数据
              localStorage.removeItem('ax-mms-token')
              localStorage.removeItem('ax-mms-user')
              // 回到登录页面
              this.$router.push('/login')
            } else {
              this.$message({
                message: resp.message,
                type: 'warning',
                duration: 500 // 弹出停留时间
              })
            }
          })
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  vertical-align: middle;
  padding: 0px 10px 4px 40px;
}
.title {
  position: absolute;
  color: #fff;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
}
</style>