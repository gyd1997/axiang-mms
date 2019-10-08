<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="商品名称" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input 
          readonly 
          v-model="searchMap.supplierName" 
          placeholder="选择供应商" 
          style="width: 200px;"
          @click.native="dialogSupplierVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchList">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码" width="90"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
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

    <!-- 选择供应商对话框 -->
    <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
      <supplier :isDialog="true" @option-supplier="optionSupplier"></supplier> 
    </el-dialog>
  </div>
</template>

<script>
import goodsApi from '../../api/goods'
import Supplier from '../supplier/supplier' 

export default {
  data () {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchMap: {},
      dialogSupplierVisible: false
    }
  },
  components: {
    Supplier
  },
  created () {
    this.fetchList()
  },
  methods: {
    fetchList () {
      goodsApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
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
    handleCurrentChange () {
      this.currentPage = val
      this.fetchList()
    },
    optionSupplier (currentRow) {
      console.log(currentRow)
      this.searchMap.supplierName = currentRow.name // 供应商名称
      this.searchMap.supplierid = currentRow.id // 供应商ID
      this.dialogSupplierVisible = false
    }
  }
}
</script>