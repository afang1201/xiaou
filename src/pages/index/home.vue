<template>
  <div>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import echarts from 'echarts'
export default {
  props: [],
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      cateList: 'cate/cateList'
    })
  },
  // watch: {
  //   cateList: {
  //     handler () {
  //       if (this.cateList) {
  //         // 基于准备好的dom，初始化echarts实例
  //         var myChart = echarts.init(document.getElementById('main'))

  //         // 指定图表的配置项和数据
  //         var option = {
  //           title: {
  //             text: '商品分类'
  //           },
  //           tooltip: {},
  //           legend: {
  //             data: ['下级分类数量']
  //           },
  //           xAxis: {
  //             data: this.cateList.map(item => item.catename)

  //           },
  //           yAxis: {},
  //           series: [
  //             {
  //               name: '下级分类数量',
  //               type: 'line',
  //               data: this.cateList.map(item => item.children.length)
  //               // this.cateList.map(item => item.children.length)
  //             }
  //           ]
  //         }

  //         // 使用刚指定的配置项和数据显示图表。
  //         myChart.setOption(option)
  //       }
  //     },
  // deep: true
  // }
  // },
  methods: {
    ...mapActions({
      reqCate: 'cate/reqCate'
    }),
    chart () {
      var myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '商品分类'
        },
        tooltip: {},
        legend: {
          data: ['下级分类数量']
        },
        xAxis: {
          type: 'category',
          data: this.cateList.map(item => item.catename)
        },
        yAxis: {},
        series: [
          {
            name: '下级分类数量',
            type: 'bar',
            // 添加验证防止分类无下级分类导致报错
            data: this.cateList.map(item => {
              return item.children ? item.children.length : 0
            })
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  async mounted () {
    await this.reqCate()
    if (this.cateList) {
      this.chart()
    }
  }
}
</script>
<style scoped>
.box {
  width: 800px;
  height: 400px;
  margin: 20px auto;
  border: 1px solid #cccccc;
}
</style>
