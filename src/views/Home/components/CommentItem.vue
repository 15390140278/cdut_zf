<template>
  <div>
    <p>{{comment.content}}</p>
    <span>时间：{{comment.date}}| 用户{{comment.userId}}</span>
    <!-- 用户可以删除自己的评论 -->
    <el-button v-if="user && user.id == comment.userId" type="primary" @click="removeDialog">删除</el-button>
  </div>
</template>

<script>
import removeCommentRequest from '../../../api/house/removeComment'
import { mapGetters } from 'vuex'

export default {
  props: {
    comment: {
      type: Object
    }
  },
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    async removeDialog() {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await removeCommentRequest({
        id: this.comment.id
      })
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.$bus.$emit('refresh')
      }
    }
  }
}
</script>

<style scoped>
</style>