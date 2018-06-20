<template>
  <div id="tips">
    <div class="warp" v-if="show">
      <!-- 左边内容 -->
      <div class="left" @click="showMask">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Prompt"></use>
        </svg>
        <!-- 主要内容 -->
        <div class="main">
          {{ content }}
        </div>
      </div>
      <!-- 右边图标 -->
      <div class="right" @click="hide">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  data () {
    return {
      show: true,
      content: ''
    }
  },
  mounted () {
    if (this.$route.name === 'Treasury') {
      this.content = '每个产品深度解析，覆盖全市场主流产品。'
    }
    if (this.$route.name === 'Contrast') {
      this.content = '什么是CP值(Cost Performance性价比分值)？'
    }
  },
  methods: {
    hide () {
      this.show = false
    },
    showMask () {
      this.$emit('showMask')
    }
  }
}
</script>

<style scoped>
@import '../assets/css/global.css';
.warp {
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: #fef8e4;
  display: flex;
  text-align: center;
  & .left {
    flex: 7;
    color: #fea648;
    margin-left: -10px;
  }
  & .main {
    color: #fea648;
    font-size: var(--m3-fs);
    display: inline-block;
  }
  & .right {
    flex: 1;
  }
  & .icon {
    width: 35px;
    height: 35px;
    margin-top: -10px;
  }
}
</style>
