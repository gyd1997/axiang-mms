<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="供应商名称" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="linkman" v-if="!isDialog">
        <el-input v-model="searchMap.linkman" placeholder="联系人" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" v-if="!isDialog">
        <el-input v-model="searchMap.mobile" placeholder="联系电话" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchList">查询</el-button>
        <el-button type="primary" @click="handleAdd" v-if="!isDialog">新增</el-button>
        <el-button @click="resetForm('searchForm')" v-if="!isDialog">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      height="500"
      border
      style="width: 100%"
      :highlight-current-row="isDialog"
      @current-change="handleCurrentChange">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人" width="90"></el-table-column>
      <el-table-column prop="mobile" label="联系电话" v-if="!isDialog"></el-table-column>
      <el-table-column prop="remark" label="备注" v-if="!isDialog"></el-table-column>
      <el-table-column label="操作"  v-if="!isDialog" width="150">
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
      :layout="!isDialog ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :total="total">
    </el-pagination>

    <el-dialog v-if="!isDialog" title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form 
        :rules="rules"
        :model="pojo"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px">
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name" ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="pojo.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierApi from '../../api/supplier'

export default {
  data () {
    return {
      list: [],
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前页码
      total: 0, // 总记录数
      searchMap: { // 条件查询的绑定字段值
        name: '',
        linkman: '',
        mobile: ''
      }, 
      dialogFormVisible: false,
      pojo: {
        id: null,
        name: '',
        linkman: '',
        mobile: '',
        remark: ''
      },
      rules: {
        name: [
          {required: true, message: '供应商不能为空', trigger: 'blur'}
        ],
        linkman: [
          {required: true, message: '联系人不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.fetchList()
  },
  props: {
    isDialog: Boolean
  },
  methods: {
    fetchList () {
      supplierApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        const data = response.data.data
        this.list = data.rows
        this.total = data.total
      })
    },
    handleEdit (id) {
      this.handleAdd()
      supplierApi.getById(id).then(response => {
        const resp = response.data
        if (resp.flag) {
          this.pojo = resp.data
        } else {
          this.$message({
            message: resp.message,
            type: 'warning'
          })
        }
      })
    },
    handleDelete (id) {
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消'
      }).then(() => {
        supplierApi.delete(id).then(response => {
          const resp = response.data
          this.$message({
            message: resp.message,
            type: resp.flag ? 'success' : 'error'
          })
          if (resp.flag) {
            this.fetchList()
          }
        })
      }).catch()
    },
    // 当每页显示条数改变后, 进行调用该方法, val是当前改变后条数
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.fetchList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['pojoForm'].resetFields()
      })
    },
    addData (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          supplierApi.add(this.pojo).then(response => {
            const resp = response.data
            if (resp.flag) {
              this.fetchList()
              this.dialogFormVisible = false
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
    },
    updateData (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          supplierApi.update(this.pojo).then(response => {
            const resp = response.data
            if (resp.flag) {
              this.fetchList()
              this.dialogFormVisible = false
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
    },
    handleCurrentChange (currentRow) {
      this.$emit('option-supplier', currentRow)
    }
  }
}
</script>