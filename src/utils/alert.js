import Vue from 'vue'
let vm = new Vue()
export const successAlert = (msg) => {
  vm.$message.success(msg)
}
export const warningAlert = (msg) => {
  vm.$message.warning(msg)
}
