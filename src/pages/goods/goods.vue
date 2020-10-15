<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import vList from './compoents/list'
export default {
  props: [],
  components: {
    vList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 点击了添加按钮
    add () {
      this.$router.push({name: '商品添加与修改', params: {type: '添加商品'}})
    },
    // 编辑
    edit (id) {
      // 让add组件发起获取详情的请求
      this.$router.push({name: '商品添加与修改', params: {id, type: '修改商品'}})
    }
  },
  mounted () {}
}
</script>
<style scoped>
</style>
