import Vue from 'vue'
import delBtn from '../components/delBtn'
import editForm from '../components/editForm'
let obj = {
  delBtn,
  editForm
}
for (let i in obj) {
  Vue.component(i, obj[i])
}
