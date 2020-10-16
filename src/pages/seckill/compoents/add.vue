<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加菜单' : '编辑菜单'" :visible.sync="info.isshow" @closed="close">
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules="formRules">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title" ></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-date-picker
            v-model="date"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeCate">
            <el-option
              v-for="(item,i) in cateList"
              :key="i"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecond">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="(item,i) in cate2" :key="i" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" prop="second_cateid">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="(item,i) in goodList"
              :key="i"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import {
  addSecklist,
  editSecklist,
  getCateList,
  getSecklistOne
} from '../../../utils/request'
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        title: '',
        endtime: null,
        begintime: null,
        first_cateid: '',
        second_cateid: '',
        status: 1,
        goodsid: ''
      },
      cate2: [],
      formRules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        first_cateid: [
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        second_cateid: [
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        goodsid: [{ required: true, message: '请选择商品', trigger: 'change' }]
      },
      // 日期设置初始类型为字符串，避免后期因复杂数据更改导致v-model不生效
      date: ''
    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      reqCate: 'cate/reqCate',
      reqGoodsList: 'goods/reqGoodsList',
      reqseckillList: 'seckill/reqseckillList'
    }),
    // 获取菜单详情 （1条）
    async look (id) {
      getSecklistOne(id).then(async (res) => {
        if (res.data.code === 200) {
          // 时间戳
          res.data.list.begintime = new Date(Number(res.data.list.begintime))
          res.data.list.endtime = new Date(Number(res.data.list.endtime))
          this.form = res.data.list
          // 获取二级分类
          await this.getSecond()
          // 获取商品
          await this.reqGoodsList({
            fid: res.data.list.first_cateid,
            sid: res.data.list.second_cateid
          })

          // 这个时候form是没有id的
          this.form.id = id
          this.date = [this.form.begintime + '', this.form.begintime + '']
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 添加菜单
    add () {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return
        this.form.begintime = new Date(this.date[0]).getTime() + ''
        this.form.endtime = new Date(this.date[1]).getTime() + ''
        addSecklist(this.form).then((res) => {
          if (res.data.code === 200) {
            // 成功
            this.$message.success(res.data.msg)
            // 数据重置
            this.empty()
            // 弹框消失
            this.cancel()
            // list数据要刷新
            this.reqseckillList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    // 修改菜单
    update () {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return
        this.form.begintime = new Date(this.date[0]).getTime() + ''
        this.form.endtime = new Date(this.date[1]).getTime() + ''
        editSecklist(this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.empty()
            this.cancel()
            this.reqseckillList()
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
        title: '',
        endtime: null,
        begintime: null,
        first_cateid: '',
        second_cateid: '',
        status: 1,
        goodsid: ''
      }
      this.cate2 = []
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
    // 一级分类修改
    changeCate () {
      this.form.goodsid = ''
      this.form.second_cateid = ''
      this.getSecond()
    },
    // 获得二级分类
    async getSecond () {
      await getCateList({ pid: this.form.first_cateid }).then((res) => {
        if (res.data.code === 200) {
          this.cate2 = res.data.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 二级分类修改
    changeSecond () {
      this.form.goodsid = ''
      this.reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      })
    }
  },
  computed: {
    ...mapGetters({
      cateList: 'cate/cateList',
      goodList: 'goods/goodList',
      seckillList: 'seckill/seckillList'
    })
  },
  mounted () {
    this.reqCate()
    this.reqseckillList()
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
.el-button {
  margin: 0;
}
.line {
  text-align: center;
}
</style>
