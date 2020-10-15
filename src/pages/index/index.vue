<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
          :default-active="curActive"
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 多选菜单 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="top" @click="loginOut">
            <span>{{userInfo.username}}</span>
            <i class="el-icon-s-custom"></i>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      // 解决刷新侧边菜单不变色跳转问题
      curActive: ''
    }
  },
  methods: {
    ...mapActions({
      reqUserInfo: 'reqUserInfo'
    }),
    loginOut () {
      this.$confirm('是否确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.reqUserInfo({})
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted () {
    this.curActive = this.$route.path
    // console.log(this.$route.path)
    // let defaultMenu = window.location.hash.substr(
    //   window.location.hash.indexOf('/')
    // )
    // this.curActive = defaultMenu
  }
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
}
.el-aside {
  background-color: #545c64;
}
.el-menu {
  border: none;
}
.top{
  float: right;
  cursor: pointer;
  margin: 20px 15px 0 0;
}
</style>
