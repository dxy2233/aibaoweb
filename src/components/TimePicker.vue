<template>
  <div id="timepicker">
    <div>
      <div class="select" @click="showPicker">{{ selectedText[0] }}</div>
      <Picker @select="handleSelect(0,arguments)" :data="data" :selected-index="selectedIndex"
            ref="picker" :title="'起飞时间'" cancelTxt="取消" confirmTxt="确定"></Picker>
    </div>
  </div>
</template>

<script>
import Picker from '@/components/Picker'
let data1 = (a, b) => {
  let data1 = []
  for (let i = a; i < b; i++) {
    if (i < 10) {
      data1.push({
        text: '0' + i,
        value: '0' + i
      })
    } else {
      data1.push({
        text: i,
        value: i
      })
    }
  }
  return data1
}
export default {
  name: 'TimePicker',
  components: {
    Picker
  },
  data () {
    return {
      data: [data1(0, 24), data1(0, 60)],
      selectedIndex: [0, 0],
      selectedText: ['请选择时间']
    }
  },
  methods: {
    showPicker () {
      this.$refs.picker.show()
    },
    handleSelect (index, args) {
      this.selectedText.splice(index, 1, args[2].join(':'))
      this.$emit('update', args[0])
    }
  }
}
</script>

<style scoped>

</style>
