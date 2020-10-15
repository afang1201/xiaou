<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加菜单' : '编辑菜单'" :visible.sync="info.isshow" @closed="close">
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRules'>
        <el-form-item label="活动名称" prop='title'>
          <el-input v-model="form.title" @change="cl"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required >

          <el-col :span="11">
            <el-form-item prop='begintime'>
              <el-date-picker
                type="datetime"
                placeholder="开始日期"
                v-model="form.begintime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop='endtime'>
              <el-date-picker
                type="datetime"
                placeholder="结束日期"
                v-model="form.endtime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="一级分类" prop='first_cateid'>
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeCate">
            <el-option
              v-for="(item,i) in cateList"
              :key="i"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop='second_cateid'>
          <el-select v-model="form.second_cateid" placeholder="请选择" @change="changeSecond">
           <el-option label="请选择" value="" disabled></el-option>
          <el-option v-for="(item,i) in cate2" :key="i" :label="item.catename" :value="item.id"></el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="商品" prop='second_cateid'>
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="请选择" value="" disabled></el-option>
          <el-option v-for="(item,i) in goodList" :key="i" :label="item.goodsname" :value="item.id"></el-option>
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
// eslint-disable-next-line no-unused-vars
import {addSecklist, editSecklist, getCateList, getSecklistOne} from '../../../utils/request'
export default {
  data () {
    // 验证日期的规则
    var checkDate = (rule, value, cb) => {
      let a = new Date(Number(this.form.begintime))
      let b = new Date(Number(this.form.endtime))
      if (a < b) {
        return cb()
      }

      cb(new Error('结束日期必须大于开始日期'))
    }
    return {
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
        title: [
          {required: true, message: '请输入活动名称', trigger: 'blur'}
        ],
        endtime: [
          {required: true, message: '请输入活动结束时间', trigger: 'change'},
          { validator: checkDate, trigger: 'change' }
        ],
        begintime: [
          {required: true, message: '请输入活动开始时间', trigger: 'change'}
        ],
        first_cateid: [
          {required: true, message: '请选择一级分类', trigger: 'change'}
        ],
        second_cateid: [
          {required: true, message: '请选择二级分类', trigger: 'change'}
        ],
        goodsid: [
          {required: true, message: '请选择商品', trigger: 'change'}
        ]
      }
    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      reqCate: 'cate/reqCate',
      reqGoodsList: 'goods/reqGoodsList',
      reqseckillList: 'seckill/reqseckillList'
    }),
    // 测试
    cl () {
      console.log('--------form-----')
      console.log(this.form)
      console.log('--------seckillList-----')
      console.log(this.seckillList)
    },
    // 获取菜单详情 （1条）
    async look (id) {
    //  后台参数不合法弃用
      // getSecklistOne(id).then((res) => {
      //   if (res.data.code === 200) {
      //     // 这个时候form是没有id的
      //     this.form = res.data.list
      //     this.form.id = id
      //     // 获取二级分类
      //     this.getSecond()
      //     // 获取商品
      //     this.reqGoodsList({fid: this.form.first_cateid, sid: this.form.second_cateid})
      //     // 时间戳
      //     this.form.begintime = new Date(this.form.begintime)
      //     this.form.endtime = new Date(this.form.endtime)
      //     console.log(this.form)
      //   } else {
      //     this.$message.error(res.data.msg)
      //   }
      // })
      // this.getSecond()
      // let form1 = this.seckillList.find(function (item) { return item.id === id })
      let form = JSON.stringify(this.seckillList.find(function (item) { return item.id === id }))
      let form1 = JSON.parse(form)
      // console.log(form1)
      form1.begintime = new Date(Number(form1.begintime))
      form1.endtime = new Date(Number(form1.endtime))
      await this.getSecond()
      await this.reqGoodsList({fid: form1.first_cateid, sid: form1.second_cateid})
      this.form = form1
    },
    // 添加菜单
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.form.begintime = new Date(this.form.begintime).getTime()
        this.form.endtime = new Date(this.form.endtime).getTime()
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
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.form.begintime = new Date(this.form.begintime).getTime() + ''
        this.form.endtime = new Date(this.form.endtime).getTime() + ''
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
      this.reqGoodsList({fid: this.form.first_cateid, sid: this.form.second_cateid})
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
.line{
  text-align: center;
}
</style>
