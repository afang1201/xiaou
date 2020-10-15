<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加菜单' : '编辑菜单'" :visible.sync="info.isshow" @closed="close">
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRules'>
        <el-form-item label="规格名称" prop='specsname'>
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(item, index) in attrArr" :key="index">
          <div class="con">
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addAttr(item)">新增规格属性</el-button>
            <el-button type="danger" v-else @click="del(index)">删除</el-button>
          </div>
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
import { mapActions, mapGetters } from 'vuex'
// axios请求
import {addSpecs, getSpecsOne, editSpecs} from '../../../utils/request'
export default {
  data () {
    return {
      form: {
        specsname: '',
        attrs: '',
        status: 1
      },
      attrArr: [{ value: '' }],
      formRules: {
        specsname: [
          {required: true, message: '请输入规格名称', trigger: 'blur'}
        ]
      }
    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      reqspecsList: 'specs/reqspecsList',
      reqSpecsTotal: 'specs/reqSpecsTotal'

    }),
    // 获取菜单详情 （1条）
    look (id) {
      // 发请求
      getSpecsOne(id).then((res) => {
        if (res.data.code === 200) {
          // 这个时候form是没有id的
          if (res.data.list[0].attrs.length !== 0) {
            res.data.list[0].attrs = JSON.parse(res.data.list[0].attrs)
          }
          // 注意下标获得数据为数组并非对象
          this.form = res.data.list[0]
          this.form.attrs.forEach((item) => {
            this.attrArr.push({ value: item })
          })
          this.form.id = id
          console.log(this.form)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addAttr (item) {
      this.attrArr.push({ value: item.value })
      item.value = ''
    },
    // 删除规格属性
    del (index) {
      this.attrArr.splice(index, 1)
    },
    // 添加菜单
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.attrArr.splice(0, 1)
        this.form.attrs = JSON.stringify(this.attrArr.map((item, index) => item.value))
        addSpecs(this.form).then((res) => {
          if (res.data.code === 200) {
          // 成功
            this.$message.success(res.data.msg)
            // 数据重置
            this.empty()
            // 弹框消失
            this.cancel()
            // list数据要刷新
            this.reqspecsList()
            // 更新页码
            this.reqSpecsTotal()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    // 修改菜单
    update () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.attrArr.splice(0, 1)
        this.form.attrs = JSON.stringify(this.attrArr.map((item, index) => item.value))
        editSpecs(this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.empty()
            this.cancel()
            this.reqspecsList()
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
        specsname: '',
        attrs: '',
        status: 1
      }
      this.attrArr = [{ value: '' }]
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
      specsList: 'specs/specsList'
    })
  }
}
</script>

<style scoped>
.con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
.el-button{
  margin: 0;
}
</style>
