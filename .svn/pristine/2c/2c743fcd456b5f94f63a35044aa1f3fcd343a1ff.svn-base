<template>
  <div id="radio">
    <div class="radiowrap" v-for="(item,index) in content" :key="index">
      <input type="radio" :id="sign+index" :value="item.value" v-model="select">
      <label :for="sign+index">{{ item.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    selected: {},
    content: {},
    sign: {}
  },
  data () {
    return {
      select: '',
      lazy: false // 第一次渲染不加载
    }
  },
  mounted () {
    this.select = this.selected
    this.$nextTick(() => {
      this.lazy = true
    })
  },
  updated () {
    if (this.content.length < this.select + 1 && this.$route.name !== 'ProductDetail') {
      this.select = this.selected
    }
  },
  watch: {
    select (select) {
      if (this.lazy) {
        this.$emit('update', [select, this.sign])
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/global.css';
#radio {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.radiowrap {
  /* width: 48%; */
  flex: 1;
}

.radiowrap:not(:last-child) {
  /* margin-right: 4%; */
}

label {
  display: block;
  border: 1PX solid var(--blue);
  background-color: #fff;
  color: var(--blue);
  text-align: center;
  border-radius: 10PX;
  height: 100%;
}

input {
  display: none;
}

input[type=radio]:checked + label {
  background-color: var(--blue);
  color: #fff;
}
</style>
