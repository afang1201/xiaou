<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRules'>
        <el-form-item label="菜单名称" prop='title'>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1" prop='icon'>
          <el-select v-model="form.icon" placeholder="请选择上级菜单">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else prop='url'>
          <el-select v-model="form.url" placeholder="请选择上级菜单"  >
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'' + item.path"
            >
            </el-option>
          </el-select>
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
// 路由地址
import {indexRoutes} from '../../../router/index'
import {mapActions, mapGetters} from 'vuex'
// axios请求
import {addMenu, getMenuInfo, editMenu} from '../../../utils/request'
// 弹窗
import {successAlert, warningAlert} from '../../../utils/alert'
export default {
  data () {
    return {
      // 图标
      icons: [
        'el-icon-s-tools',
        'el-icon-user',
        'el-icon-camera',
        'el-icon-message-solid'
      ],
      // // 路由
      indexRoutes: indexRoutes,
      form: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      },
      // 验证规则
      formRules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请选择菜单地址', trigger: 'change' }
        ],
        icon: [
          { required: true, message: '请选择菜单图标', trigger: 'change' }
        ]
      }

    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      'reqMenu': 'menu/reqMenu'
    }),
    // 获取菜单详情 （1条）
    look (id) {
      // 发请求
      getMenuInfo(id).then((res) => {
        if (res.data.code === 200) {
          // 这个时候form是没有id的
          this.form = res.data.list
          this.form.id = id
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 添加菜单
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        addMenu(this.form).then(res => {
          if (res.data.code === 200) {
          // 成功
            successAlert(res.data.msg)
            // 数据重置
            this.empty()
            // 弹框消失
            this.cancel()
            // list数据要刷新
            this.reqMenu()
          } else {
            warningAlert(res.data.msg)
          }
        })
      })
    },
    // 修改菜单
    update () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        // 验证通过
        editMenu(this.form).then(res => {
          if (res.data.code === 200) {
            successAlert(res.data.msg)
            this.empty()
            this.cancel()
            this.reqMenu()
          } else {
            warningAlert(res.data.msg)
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
      'menuList': 'menu/menuList'
    })
  }

}
</script>

<style>
</style>
