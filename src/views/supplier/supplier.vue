<template>
  <div>
    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="供应商名称"></el-table-column>
      <el-table-column prop="linkman" label="联系人" width="90"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
      searchMap: {} // 条件查询的绑定字段值
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    fetchList () {
      supplierApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        const data = response.data.data
        this.list = data.rows
        this.total = data.total
        console.log(this.list)
      })
    },
    handleEdit (id) {
      console.log('编辑', id)
    },
    handleDelete (id) {
      console.log('删除', id)
    },
    // 当每页显示条数改变后, 进行调用该方法, val是当前改变后条数
    handleSizeChange (val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchList()
    }
  }
}
</script>