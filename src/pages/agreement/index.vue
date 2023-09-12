<template>
  <div class="content complianceContent">
    <div v-html="content">{{ content }}</div>
  </div>
</template>

<script>
import { queryAgreementOne } from '@/api/user'

export default {
  name: 'Agreement',
  data() {
    return {
      content: '',
      type: ''
    }
  },
  created() {
    this.type = this.$route.query.type
    this.platformType = this.$route.query.platformType
    this.getContent()
  },
  methods: {
    async getContent() {
      try {
        const { data } = await queryAgreementOne({
          type: this.type,
          platformType: this.platformType
        })
        if (data && data.content) {
          this.content = data.content
        }
      } catch (e) {
        console.log(e, 'error')
      }
    }
  }
}
</script>

<style>
  .complianceContent img {
    max-width: 100%;
  }
</style>

<style scoped>
  .content {
    font-size: 30px;
    padding: 20px;
    word-break: break-word;
  }
</style>
