<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRule'>
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop='catename'>
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" v-if="form.pid!=0">
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
import { addCates, getCateOne, editCate } from '../../../utils/request'
export default {
  data () {
    return {
      // 图片地址
      imgUrl: '',
      form: {
        pid: 0,
        catename: '',
        img: null,
        status: 1
      },
      formRule: {
        catename: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ]
      }
    }
  },
  props: ['info'],
  methods: {
    ...mapActions({
      reqCate: 'cate/reqCate'
    }),
    // 获取商品详情 （1条）
    look (id) {
      // 发请求
      getCateOne(id).then((res) => {
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
    // 添加商品分类
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        addCates(this.form).then((res) => {
          if (res.data.code === 200) {
          // 成功
            this.$message.success(res.data.msg)
            // 数据重置
            this.empty()
            // 弹框消失
            this.cancel()
            // list数据要刷新
            this.reqCate()
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
        editCate(this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.empty()
            this.cancel()
            this.reqCate()
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
      this.form = {}
      this.imgUrl = ''
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
      cateList: 'cate/cateList'
    })
  },
  mounted () {
    if (this.cateList.length === 0) {
      this.reqCate()
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
