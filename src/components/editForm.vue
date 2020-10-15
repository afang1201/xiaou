
<template>
        <div id="editor" class="editor"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  mounted () {
    this.editor = new E('#editor')
    this.editor.create()
  }
}
</script>
<style  scoped>

</style>
