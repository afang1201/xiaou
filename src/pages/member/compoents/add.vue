<template>
  <div>
    <el-dialog
      title="会员修改"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRules'>
        <el-form-item label="手机号" prop='phone'>
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop='nickname'>
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="form.password" placeholder='为了你的账号安全，原密码已已隐藏'></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// axios请求
import {getMebberOne, editMebber} from '../../../utils/request'
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      form: {},
      formRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          { validator: checkMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '用户密码的长度在3~15个字符之间',
            trigger: 'blur'
          }
        ],
        nickname: [
          {required: true, message: '请输入用户昵称', trigger: 'blur'}
        ]
      }
    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      reqMember: 'member/reqMember'
    }),
    // 获取会员详情 （1条）
    look (id) {
      // 发请求
      getMebberOne(id).then((res) => {
        if (res.data.code === 200) {
          // 这个时候form是没有id的
          this.form = res.data.list
          this.form.uid = id
          this.form.password = ''
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 修改菜单
    update () {
      this.$refs.addFormRef.validate(valid => {
        console.log(valid)
        if (!valid) return
        editMebber(this.form).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.empty()
            this.cancel()
            this.reqMember()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    // 弹框消失
    cancel () {
      this.info.isshow = false
    },
    // 数据重置
    empty () {
      this.form = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      }
      this.$refs.addFormRef.resetFields()
    },
    // 窗口关闭
    close () {
      this.empty()
    }
  },
  computed: {
    ...mapGetters({
      memberList: 'member/memberList'
    })
  }
}
</script>

<style>
</style>
