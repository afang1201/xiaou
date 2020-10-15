<template>
  <!-- 信息表格 -->
  <el-table
    :data="menuList"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :tree-props="{children: 'children'}"
  >
    <el-table-column prop="id" label="菜单编号" width="90"></el-table-column>
    <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
    <el-table-column prop="icon" label="菜单图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="菜单地址"></el-table-column>
    <el-table-column prop="type" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.type==1">启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
        <del-btn @del='del(scope.row.id)'></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {delMenu} from '../../../utils/request'
import {successAlert, warningAlert} from '../../../utils/alert'
export default {
  methods: {
    ...mapActions({
      reqMenu: 'menu/reqMenu'
    }),
    // 编辑菜单
    edit (id) {
      console.log(1)
      this.$emit('edit', id)
    },
    // 删除菜单
    del (id) {
      // 发起删除请求
      delMenu(id).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg)
          this.reqMenu()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      menuList: 'menu/menuList'
    })
  },
  mounted () {
    this.reqMenu()
  }
}
</script>

<style>
</style>
