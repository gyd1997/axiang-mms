<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="../../assets/logo.png" width="80px" alt="">
      <span class="title">阿香会员管理系统</span>
    </a>
    <el-dropdown @command="handleCommand(command)">
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
export default {
  methods: {
    handleCommand (command) {
      this.$message('点击了')
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