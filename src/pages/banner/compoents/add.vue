<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加轮播图分类' : '编辑轮播图分类'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRules'>
        <el-form-item label="标题" prop='title'>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" prop='img'>
        <!-- 原生 上传文件 start-->
        <!-- 如果添加成功之后，再次添加上一次的文件，就不会再出发change；如果要解决这个bug,我们就在弹框消失的时候，将input也销毁 -->
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="">
            <input v-if="info.isshow" class="my-input" type="file" @change="getFile" />
          </div>
        <!-- 原生 上传文件 end-->
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
import { addBanner, editBanner, getBannerOne } from '../../../utils/request'
export default {
  data () {
    var checkImg = (rule, value, cb) => {
      if (this.imgUrl !== '') {
        return cb()
      }
      cb(new Error('请上传图片'))
    }
    return {
      // 图片地址
      imgUrl: '',
      form: {
        title: '',
        status: 2
      },
      formRules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        img: [
          { validator: checkImg, trigger: 'blur' }
        ]
      }
    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      reqBanner: 'banner/reqBanner'
    }),
    // 获取轮播图详情 （1条）
    look (id) {
      // 发请求
      getBannerOne(id).then((res) => {
        if (res.data.code === 200) {
          // 这个时候form是没有id的
          this.form = res.data.list
          this.form.id = id
          this.imgUrl = this.$imgPre + res.data.list.img
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 获取文件
    getFile (e) {
      let file = e.target.files[0]
      // 1.大小不超过2M 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('文件不能超过2M')
        return
      }

      // 2.是图片
      let imgExtArr = ['.jpg', '.png', '.jpeg', '.gif']
      let extname = file.name.slice(file.name.lastIndexOf('.')) // '.jpg'
      if (!imgExtArr.some((item) => item === extname)) {
        this.$message.error('文件格式不正确')
        return
      }
      // URL.createObjectURL() 可以通过文件生成一个地址
      this.imgUrl = URL.createObjectURL(file)
      // 将文件保存在form.img
      this.form.img = file
    },
    // 添加轮播图分类
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        addBanner(this.form).then((res) => {
          if (res.data.code === 200) {
          // 成功
            this.$message.success(res.data.msg)
            // 数据重置
            this.empty()
            // 弹框消失
            this.cancel()
            // list数据要刷新
            this.reqBanner()
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
        editBanner(this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.empty()
            this.cancel()
            this.reqBanner()
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
        status: 2
      }
      this.imgUrl = ''
      this.$refs.addFormRef.resetFields()
    },
    // 窗口关闭
    close () {
      this.$refs.addFormRef.resetFields()
      // 如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty()
      }
    }
  },
  computed: {
    ...mapGetters({
      bannerList: 'banner/bannerList'
    })
  },
  mounted () {
    if (this.bannerList.length === 0) {
      this.reqBanner()
    }
  }
}
</script>

<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
