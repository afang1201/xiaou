<template>
  <el-table
    :data="bannerList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column prop="id" label="编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="title" label="轮播图标题" sortable width="180">
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
import {delBanner} from '../../../utils/request'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      bannerList: 'banner/bannerList'
    })
  },
  methods: {
    ...mapActions({
      reqBanner: 'banner/reqBanner'
    }),
    // 编辑
    edit (id) {
      this.$emit('edit', id)
    },
    // 删除
    dele (id) {
      delBanner(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.reqBanner()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  mounted () {
    this.reqBanner()
  }
}
</script>
<style scoped>
img{
    width: 100px;
    height: 100px;
}
</style>
