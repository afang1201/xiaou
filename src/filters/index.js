import vue from 'vue'
let obj = {

}
for (let i in obj) {
  vue.filter(i, obj[i])
}
