<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加管理员' : '编辑管理员'" :visible.sync="info.isshow" @closed="close">
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRule'>
        <el-form-item label="所属角色" prop='roleid'>
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value></el-option>
            <el-option
              v-for="item in rouleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" prop='username'>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="form.password" placeholder='为了您的账户安全，原始密码已隐藏'></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addManag, editManage, getManageOne} from '../../../utils/request'
import {mapGetters, mapActions} from 'vuex'
export default {
  props: ['info'],
  data () {
    return {
      form: {},
      formRule: {
        roleid: [
          {required: true, message: '请选择所属角色', trigger: 'change'}
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      reqRole: 'role/reqRole',
      reqManage: 'manage/reqManage',
      reqManageTotal: 'manage/reqManageTotal'
    }),
    // 添加管理员
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        addManag(this.form).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            // 更新列表信息
            this.reqManage()
            // 更新页码
            this.reqManageTotal()
            this.cancel()
          } else {
            this.$message.error(res.data.msg)
          }
          this.empty()
        })
      })
    },
    // 获取被修改管理员信息
    look (uid) {
      getManageOne(uid).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.list
          this.form.password = ''
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 提交修改管理员
    update () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        editManage(this.form).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            // 更新列表信息
            this.reqManage()
          } else {
            this.$message.error(res.data.msg)
          }
          this.empty()
          this.cancel()
        })
      })
    },
    close () {
      this.$refs.addFormRef.resetFields()
      // 如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    // 取消
    cancel () {
      this.info.isshow = false
    },
    // 数据重置
    empty () {
      this.$refs.addFormRef.resetFields()
      this.form = {
        roleid: '',
        username: '',
        password: '',
        status: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      rouleList: 'role/rouleList'
    })
  },
  mounted () {
    if (this.rouleList.length === 0) {
      this.reqRole()
    }
  }
}
</script>

<style scoped>
</style>
