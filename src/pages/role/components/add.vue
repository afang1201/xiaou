<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRules'>
        <el-form-item label="角色名称" prop='rolename'>
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <!-- 树形控件 -->
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title',}"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {addRole, getRoleOne, editRole} from '../../../utils/request'
export default {
  props: ['info'],
  data () {
    return {
      form: {
        rolename: '',
        menus: '[]',
        status: 1
      },
      formRules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      'reqRole': 'role/reqRole',
      'reqMenu': 'menu/reqMenu',
      reqUserInfo: 'reqUserInfo'
    }),
    // 获取角色信息 （1条）
    look (id) {
      // 发请求
      getRoleOne(id).then((res) => {
        if (res.data.code === 200) {
          // 这个时候form是没有id的
          this.form = res.data.list
          this.form.id = id
          // 解决json报错
          if (this.form.menus !== 'undefined') { this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus)) }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 添加角色
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        // 获得树形组件选择项信息,添加到要提交的form对象中
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        addRole(this.form).then(res => {
          if (res.data.code === 200) {
          // 成功
            this.$message.success(res.data.msg)
            // 数据重置
            this.empty()
            // 弹框消失
            this.cancel()
            // list数据要刷新
            this.reqRole()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    // 修改角色
    update () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        editRole(this.form).then(res => {
          if (res.data.code === 200) {
            this.empty()
            this.cancel()
            this.reqRole()
            this.$confirm('角色信息已更改是否重新登录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/login')
              this.reqUserInfo({})
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消重新登录'
              })
            })
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
      this.$refs.addFormRef.resetFields()
      this.form = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      }
    },
    // 窗口关闭
    close () {
      this.$refs.addFormRef.resetFields()
      // 如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty()
      }
    },
    // 修改了pid
    changePid () {
      if (this.form.pid === 0) {
        this.form.type = 1
      } else {
        this.form.type = 2
      }
    }
  },
  computed: {
    ...mapGetters({
      'rouleList': 'role/rouleList',
      'menuList': 'menu/menuList'
    })
  },
  mounted () {
    // 缓存
    if (this.menuList.length === 0) {
      this.reqMenu()
    }
  }

}
</script>

<style>
</style>
