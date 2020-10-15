<template>
  <div>
    <!-- 信息表格 -->
    <el-table
      :data="manageList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" width="90"></el-table-column>
      <el-table-column prop="rolename" label="用户角色" width="180"></el-table-column>
       <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="editBtn(scope.row.uid)">编辑</el-button>
          <del-btn @del="delet(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!--
    total：设置总数
    page-size：每页数量
    current-change：当前页码发生了改变，就会触发，参数就是当前的页码
    -->
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
import { mapActions, mapGetters } from 'vuex'
import {delManage} from '../../../utils/request'
export default {
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      reqManage: 'manage/reqManage',
      reqManageTotal: 'manage/reqManageTotal',
      changePageAction: 'manage/changePageAction'
    }),
    // 点击编辑
    editBtn (uid) {
      this.$emit('edit', uid)
    },
    // 页码改变
    changePage (e) {
      this.changePageAction(e)
    },
    // 点击删除
    delet (uid) {
      delManage(uid).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          // 更新列表信息
          this.reqManage()
          // 更新页码信息
          this.reqManageTotal()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      manageList: 'manage/manageList',
      total: 'manage/total',
      size: 'manage/size'
    })
  },
  mounted () {
    this.reqManage()
    this.reqManageTotal()
  }
}
</script>

<style>
</style>
