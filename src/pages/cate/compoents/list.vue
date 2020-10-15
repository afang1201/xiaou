<template>
  <el-table
    :data="cateList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="分类编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" sortable width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
       <img :src="$imgPre+scope.row.img" alt="" v-if="scope.row.pid!==0">
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @del="dele(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {delCate} from '../../../utils/request'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      cateList: 'cate/cateList'
    })
  },
  methods: {
    ...mapActions({
      reqCate: 'cate/reqCate'
    }),
    // 编辑
    edit (id) {
      this.$emit('edit', id)
    },
    // 删除
    dele (id) {
      delCate(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.reqCate()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  mounted () {
    this.reqCate()
  }
}
</script>
<style scoped>
img{
    width: 100px;
    height: 100px;
}
</style>
