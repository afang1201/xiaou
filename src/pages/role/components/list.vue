<template>
   <!-- 信息表格 -->
  <el-table
    :data="rouleList"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :tree-props="{children: 'children'}"
  >
    <el-table-column prop="id" label="角色编号" width="90"></el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="scope">
        <el-button type="primary" @click="editBtn(scope.row.id)">编辑</el-button>
        <del-btn @del="delet(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {delRole} from '../../../utils/request'
export default {
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      'reqRole': 'role/reqRole'
    }),
    // 点击编辑
    editBtn (id) {
      this.$emit('edit', id)
    },
    delet (id) {
      delRole(id)
      this.reqRole()
    }
  },
  computed: {
    ...mapGetters({
      'rouleList': 'role/rouleList'
    })
  },
  mounted () {
    this.reqRole()
  }
}
</script>

<style>

</style>
