<template>
  <div>
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员姓名" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型" style="width: 120px;">
          <el-option 
            v-for="option in payTypeOptions" 
            :key="option.type" 
            :label="option.name" 
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
          value-format="yyyy-MM-dd"
          style="width: 200px;">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchList">查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名" width="90"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <span>{{scope.row.payType | payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"></el-table-column>
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

    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form 
        :model="pojo"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px">
        <el-form-item label="会员卡号">
          <el-input v-model="pojo.cardNum" ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名">
          <el-input v-model="pojo.name" ></el-input>
        </el-form-item>
        <el-form-item label="会员生日">
          <el-date-picker
            v-model="pojo.birthday"
            type="date"
            placeholder="会员生日"
            value-format="yyyy-MM-dd"
            style="width: 200px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-select v-model="pojo.payType" placeholder="支付类型" style="width: 120px;">
            <el-option 
              v-for="option in payTypeOptions" 
              :key="option.type" 
              :label="option.name" 
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址">
          <el-input v-model="pojo.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from '../../api/member'

const payTypeOptions = [
  {type: '1', name: '现金'},
  {type: '2', name: '微信'},
  {type: '3', name: '支付宝'},
  {type: '4', name: '银行卡'}
]

export default {
  data () {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示10条数据
      searchMap: { // 条件查询绑定的条件值
        cardNum: '',
        name: '',
        payType: '',
        birthday: ''
      }, 
      payTypeOptions, // 支付类型
      dialogFormVisible: false, // 对话框控制
      pojo: {}
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    fetchList () {
      memberApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        const resp = response.data
        this.list = resp.data.rows
        this.total = resp.data.total
      })
    },
    handleEdit (id) {
      console.log('编辑', id)
    },
    handleDelete (id) {
      console.log('编辑', id)
    },
    handleSizeChange (val) {
      // 当每页显示条数改变后, 被触发
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange (val) {
      // 当页码改变后, 被触发, val 是最新的页面
      this.currentPage = val
      this.fetchList()
    },
    resetForm (formName) {
      console.log(1)
      this.$refs[formName].resetFields()
    }
  },
  filters: {
    payTypeFilter (type) {
      const payObj = payTypeOptions.find(obj => obj.type === type)
      return payObj ? payObj.name : null
    }
  }
}
</script>