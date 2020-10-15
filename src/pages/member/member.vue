<template>
  <div>
    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
    <v-add ref="add" :info='info'></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import vList from './compoents/list'
import vAdd from './compoents/add'
export default {
  props: [],
  components: {
    vList,
    vAdd
  },
  data () {
    return {
      // 传递给add的数据
      info: {
        // 添加弹框的状态
        isshow: false
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 编辑
    edit (id) {
      this.info.isshow = true
      // 让add组件发起获取详情的请求
      this.$refs.add.look(id)
    }
  },
  mounted () {}
}
</script>
<style scoped>
</style>
