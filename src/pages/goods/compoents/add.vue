<template>
  <div class="goods">
    <el-form ref="addFormRef" :model="form" label-width="80px" :rules='formRule'>
      <el-form-item >
        <h3>{{$route.params.type}}</h3>
      </el-form-item>
      <el-form-item label="一级分类" prop='first_cateid'>
        <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeCate">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop='second_cateid'>
        <el-select v-model="form.second_cateid" placeholder="请选择">
           <el-option label="请选择" value="" disabled></el-option>
          <el-option v-for="item in cate2" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop='goodsname'>
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop='price'>
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop='market_price'>
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <div class="my-upload">
          <h3>+</h3>
          <img class="img" v-if="imgUrl" :src="imgUrl" alt />
          <input class="my-input" type="file" @change="getFile" />
        </div>
      </el-form-item>
      <el-form-item label="商品规格" prop='specsid'>
        <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpecs">
          <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" prop='specsattr'>
        <el-select v-model="form.specsattr" placeholder="请选择" multiple>
          <el-option v-for="item in shuxing2" :key="item.id" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" prop='isnew'>
        <el-radio v-model="form.isnew" :label="1">是</el-radio>
        <el-radio v-model="form.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" prop='ishot'>
        <el-radio v-model="form.ishot" :label="1">是</el-radio>
        <el-radio v-model="form.ishot" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述">
        <edit-form ref='descpirt'></edit-form>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="$route.params.type==='添加商品'">添 加</el-button>
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// axios请求
import { getGoodOne, getCateList, addGood, editGood } from '../../../utils/request'
export default {
  data () {
    return {
      form: {
        second_cateid: '',
        first_cateid: '',
        goodsname: '',
        price: '',
        market_price: '',
        img: '',
        specsid: '',
        specsattr: [],
        isnew: '',
        ishot: '',
        status: 1,
        description: ''
      },
      imgUrl: '',
      cate2: [],
      shuxing2: [],
      formRule: {
        first_cateid: [
          {required: true, message: '请选择一级分类', trigger: 'change'}
        ],
        second_cateid: [
          {required: true, message: '请选择二级分类', trigger: 'change'}
        ],
        goodsname: [
          {required: true, message: '请输入商品名', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'}
        ],
        market_price: [
          {required: true, message: '请输入商品市场价格', trigger: 'blur'}
        ],
        specsid: [
          {required: true, message: '请选择商品规格', trigger: 'change'}
        ],
        specsattr: [
          {required: true, message: '请选择规格属性', trigger: 'change'}
        ],
        isnew: [
          {required: true, message: '请选择是否新品', trigger: 'change'}
        ],
        ishot: [
          {required: true, message: '请选择是否热卖', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      reqGoodsList: 'goods/reqGoodsList',
      reqCate: 'cate/reqCate',
      reqspecsList: 'specs/reqspecsList',
      reqGoodsTotal: 'goods/reqGoodsTotal'
    }),
    // 获取菜单详情 （1条）
    look (id) {
      // 发请求
      getGoodOne(id).then((res) => {
        if (res.data.code === 200) {
          // 这个时候form是没有id的
          this.form = res.data.list
          this.form.id = id
          this.getSecond()
          this.getShuixng()
          this.form.specsattr = JSON.parse(this.form.specsattr)
          this.imgUrl = this.$imgPre + this.form.img
          this.$refs.descpirt.editor.txt.html(this.form.description)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 添加菜单
    add () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        this.form.description = this.$refs.descpirt.editor.txt.html()
        this.form.specsattr = JSON.stringify(this.form.specsattr)
        addGood(this.form).then((res) => {
          if (res.data.code === 200) {
          // 成功
            this.$message.success(res.data.msg)
            // 弹框消失
            this.cancel()
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
        this.form.description = this.$refs.descpirt.editor.txt.html()
        this.form.specsattr = JSON.stringify(this.form.specsattr)
        console.log(this.form)
        editGood(this.form).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.cancel()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    },
    // 弹框消失
    cancel () {
      this.$router.push('/goods')
    },
    // 数据重置
    empty () {
      this.form = {
        second_cateid: '',
        first_cateid: '',
        goodsname: '',
        price: '',
        market_price: '',
        img: '',
        specsid: '',
        specsattr: [],
        isnew: '',
        ishot: '',
        status: 1,
        descpirt: ''
      }
    },
    // 获取文件
    getFile (e) {
      let file = e.target.files[0]
      console.log(file)
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
    // 分类改变
    changeCate () {
      this.form.second_cateid = ''
      this.getSecond()
    },
    // 获得二级分类
    getSecond () {
      getCateList({ pid: this.form.first_cateid }).then((res) => {
        if (res.data.code === 200) {
          this.cate2 = res.data.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 商品规格改变
    changeSpecs () {
      // 商品规格变了，商品属性先置空
      this.form.specsattr = []
      this.getShuixng()
    },
    // 获得规格属性
    getShuixng () {
      this.shuxing2 = this.specsList.find((item) => {
        return item.id === this.form.specsid
      }).attrs
    }
  },
  computed: {
    ...mapGetters({
      goodList: 'goods/goodList',
      cateList: 'cate/cateList',
      specsList: 'specs/specsList'
    })
  },
  mounted () {
    this.reqCate()
    this.reqspecsList()
    if (!this.$route.params.type) {
      this.$router.go(-1)
      this.$message.warning('页面信息已更改请重新选择要编辑的商品')
    } else if (this.$route.params.type === '修改商品') { this.look(this.$route.params.id) }
  }
}
</script>

<style scoped>
.el-form {
  margin-top: 15px;
}
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
h3{
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 26px;
  color: #606266;
}
</style>
