<template>
  <div>
   <el-button type="primary" @click="add">添加</el-button>
    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加组件 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from './compoents/add'
import vList from './compoents/list'
export default {
  data () {
    return {
      info: {
        // 添加弹框的状态
        isshow: false,
        // 添加还是编辑的状态 true添加 ，false 编辑
        isAdd: true
      }
    }
  },
  components: {
    vAdd,
    vList
  },
  methods: {
    add () {
      this.info.isshow = true
      this.info.isAdd = true
    },
    edit (id) {
      this.info.isshow = true
      this.info.isAdd = false
      this.$refs.add.look(id)
    }
  }
}
</script>

<style>

</style>
