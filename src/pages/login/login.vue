<template>
 <div class="login">
      <div class="box">
        <h3 class="center">登录</h3>
        <div class="line">
          <el-input placeholder="请输入账号" clearable v-model="loginInfo.username"></el-input>
        </div>
        <div class="line">
          <el-input placeholder="请输入密码" clearable show-password v-model="loginInfo.password"></el-input>
        </div>
        <div class="center line">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import {userLogin} from '../../utils/request'
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      // 用户登录信息
      loginInfo: {username: '', password: ''}
    }
  },
  methods: {
    ...mapActions({
      reqUserInfo: 'reqUserInfo'
    }),
    // 用户登录请求
    login () {
      userLogin(this.loginInfo).then(res => {
        if (res.data.code === 200) {
          this.reqUserInfo(res.data.list)
          localStorage.setItem('userInfo', JSON.stringify(res.data.list))
          this.$router.push('/index')
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      usreInfo: 'usreInfo'
    })
  }
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#553443,#303D60);
  position: relative;
}
.box{
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: #ffffff;
  border-radius: 20px;
}
.center{
  text-align: center;
}
.line{
  margin-top: 20px;
}
</style>
