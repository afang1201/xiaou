<template>
<div>
  <!-- 信息表格 -->
  <el-table
    :data="goodList"
    style="width: 100%"
    row-key="id"
    border
    lazy
  >
    <el-table-column prop="id" label="商品编号" width="90"></el-table-column>
    <el-table-column prop="goodsname" label="商品名称" ></el-table-column>
    <el-table-column prop="price" label="商品价格" ></el-table-column>
    <el-table-column prop="market_price" label="市场价格" ></el-table-column>
    <el-table-column label="图片" width='180'>
      <template slot-scope="scope">
       <img :src="$imgPre+scope.row.img" alt="" >
      </template>
    </el-table-column>
    <el-table-column prop="type" label="是否新品">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
        <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
     <el-table-column prop="type" label="是否热卖">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
        <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
     <el-table-column prop="type" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @del='del(scope.row.id)'></del-btn>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page='page'
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {delGood} from '../../../utils/request'
export default {
  methods: {
    ...mapActions({
      reqGoodsList: 'goods/reqGoodsList',
      changePageAction: 'goods/changePageAction',
      reqGoodsTotal: 'goods/reqGoodsTotal'
    }),
    // 编辑菜单
    edit (id) {
      this.$emit('edit', id)
    },
    // 删除菜单
    del (id) {
      // 发起删除请求
      delGood(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.reqGoodsTotal()
          this.reqGoodsList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 页码改变
    changePage (e) {
      this.changePageAction(e)
    }
  },
  computed: {
    ...mapGetters({
      goodList: 'goods/goodList',
      total: 'goods/total',
      size: 'goods/size',
      page: 'goods/page'
    })
  },
  mounted () {
    this.reqGoodsTotal()
    this.reqGoodsList()
  }
}
</script>

<style scoped>
img{
  width: 120px;
  height: 120px;
}
</style>
