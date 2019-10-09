<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
      <el-form-item prop="username">
        <el-input v-model="searchMap.username" placeholder="账号" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="姓名" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchList">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="salary" label="薪酬"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="500px">
      <el-form 
        :rules="rules"
        :model="pojo"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="pojo.username" ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pojo.name" ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="pojo.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="pojo.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            v-model="pojo.entryDate"
            type="date"
            placeholder="点击选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('pojoForm')">确 定</el-button>
        <!-- <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import staffApi from '../../api/staff'
export default {
  data () {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      searchMap: {},
      total: 0,
      searchMap: {
        username: '',
        name: ''
      },
      dialogFormVisible: false,
      pojo: {
        username: '',
        name: '',
        age: '',
        mobile: '',
        salary: '',
        entryDate: null
      },
      rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    fetchList () {
      staffApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        const data = response.data.data
        this.list = data.rows
        this.total = data.total
      })
    },
    handleEdit () {
      
    },
    handleDelete () {

    },
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchList()
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.$nextTick(()=> {
        this.$refs['pojoForm'].resetFields()
      })
    },
    addData (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          staffApi.add(this.pojo).then(response => {
            const resp = response.data
            if (resp.flag) {
              this.fetchList()
              this.dialogFormVisible = false
              this.$message({
                message: '新增成功, 初始密码为: 123456',
                type: 'success'
              })
            } else {
              this.$message({
                message: resp.message,
                type: 'warning'
              })
            }
          })
        } else {
          return false
        }
      })
      
    }
  }
}
</script>