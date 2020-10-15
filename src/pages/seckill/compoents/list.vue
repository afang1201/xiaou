<template>
  <!-- 信息表格 -->
  <el-table
    :data="seckillList"
    style="width: 100%"
    row-key="id"
    border
    lazy
  >
    <el-table-column prop="title" label="活动名称" ></el-table-column>
    <el-table-column prop="type" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @del='del(scope.row.id)'></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {delSecklist} from '../../../utils/request'
export default {
  methods: {
    ...mapActions({
      reqseckillList: 'seckill/reqseckillList'
    }),
    // 编辑菜单
    edit (id) {
      this.$emit('edit', id)
    },
    // 删除菜单
    del (id) {
      // 发起删除请求
      delSecklist(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.reqseckillList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      seckillList: 'seckill/seckillList'
    })
  },
  async mounted () {
    await this.reqseckillList()
  }
}
</script>

<style>
</style>
