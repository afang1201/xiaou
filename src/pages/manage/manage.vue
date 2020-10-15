<template>
  <div>
     <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-add :info='info' ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  components: {
    vList,
    vAdd
  },
  data () {
    return {
      // 控制弹出框显示与切换
      info: {
        isshow: false,
        isAdd: true
      }
    }
  },
  methods: {
    // 点击添加按钮
    add () {
      this.info.isshow = true
      this.info.isAdd = true
    },
    // 编辑
    edit (id) {
      this.info.isshow = true
      this.info.isAdd = false
      this.$refs.add.look(id)
    }
  }
}
</script>

<style scoped>
.el-button {
  margin: 15px 0;
}
</style>
