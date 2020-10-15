<template>
<div>
  <!-- 信息表格 -->
  <el-table
    :data="specsList"
    style="width: 100%"
    row-key="id"
    border
    lazy
  >
    <el-table-column prop="id" label="规格编号" width="90"></el-table-column>
    <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
    <el-table-column  label="规格属性">
      <template slot-scope="scope">
        <el-tag type="success" v-for="(item,i) in scope.row.attrs" :key='i'>{{item}}</el-tag>
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
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {delSpecs} from '../../../utils/request'
export default {
  methods: {
    ...mapActions({
      reqspecsList: 'specs/reqspecsList',
      changePageAction: 'specs/changePageAction',
      reqSpecsTotal: 'specs/reqSpecsTotal'
    }),
    // 编辑菜单
    edit (id) {
      this.$emit('edit', id)
    },
    // 删除菜单
    del (id) {
      // 发起删除请求
      delSpecs(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.reqspecsList()
          this.reqSpecsTotal()
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
      specsList: 'specs/specsList',
      total: 'specs/total',
      size: 'specs/size'
    })
  },
  mounted () {
    this.reqspecsList()
    this.reqSpecsTotal()
  }
}
</script>

<style>
</style>
