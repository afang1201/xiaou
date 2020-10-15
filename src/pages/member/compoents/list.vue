<template>
  <div>
    <!-- 信息表格 -->
    <el-table :data="memberList" style="width: 100%" row-key="id" border lazy>
      <el-table-column prop="id" label="用户编号" width="90"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column prop="type" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      reqMember: 'member/reqMember'
    }),
    // 编辑菜单
    edit (id) {
      this.$emit('edit', id)
    }
  },
  computed: {
    ...mapGetters({
      memberList: 'member/memberList'
    })
  },
  mounted () {
    this.reqMember()
  }
}
</script>

<style>
</style>
