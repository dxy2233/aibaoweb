<template>
  <div id="tab-bar">
    <div class="content" :class="{ active: item.index == $route.name }"
    v-for="item in content" :key="item.index" @click="link(item.index)">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="item.ico"></use>
      </svg>
      <div class="text">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data () {
    return {
      content: [
        {name: '严选', ico: '#icon-jewelry', index: 'Strict'},
        {name: '保库', ico: '#icon-box', index: 'Treasury'},
        {name: '比价', ico: '#icon-process', index: 'Contrast'},
        {name: '定制', ico: '#icon-lights', index: 'Decision'},
        {name: '我的', ico: '#icon-account', index: 'User'}
      ],
      path: '' // 当前路由地址
    }
  },
  mounted () {
    this.path = this.$route.name // 进入页面匹配active
  },
  methods: {
    // 切换主页面
    link (path) {
      this.$router.push({ name: path })
    }
  }
}
</script>

<style scoped>
@import '../assets/css/global.css';
#tab-bar {
  position: fixed;
  bottom: 0;
  background: var(--bgc);
  width: 100%;
  border-top: 1px solid #e5e5e5;
  display: flex;
  z-index: 100;
  & .active {
    color: var(--blue);
  }
}

.content {
  color: var(--s-bgc);
  flex: 1;
  text-align: center;
  padding: 18px 0 8px;
}

.text {
  font-size: var(--s-fs);
}
</style>
