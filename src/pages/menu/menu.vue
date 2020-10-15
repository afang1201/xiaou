<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-add :info='info' ref="add"></v-add>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import vList from './compoents/list'
import vAdd from './compoents/add'
export default {
  data () {
    return {
      info: {
        isshow: false,
        isAdd: true
      }

    }
  },
  components: {
    vList,
    vAdd
  },
  methods: {
    add () {
      this.info.isshow = true
      this.info.isAdd = true
    },
    edit (id) {
      this.info.isshow = true
      this.info.isAdd = false
      // 让add组件发起获取详情的请求
      this.$refs.add.look(id)
    }
  }

}
</script>

<style scoped>

</style>
