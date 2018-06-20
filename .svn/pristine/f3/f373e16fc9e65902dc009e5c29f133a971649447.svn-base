<template>
  <div id="allpicker">
    <div v-if="content && content.length == 1">
      <div class="select" @click="showPicker">{{ selectedText[0] }}</div>
      <Picker @select="handleSelect(arguments)" :data="content" :selected-index="selectedIndex"
            ref="picker" :title="title" cancelTxt="取消" confirmTxt="确定"></Picker>
    </div>

    <div v-if="cdnDate.length > 1  && !cdnDate[0].next[0].next">
      <div class="select" @click="showLinkPicker('cityData')">{{ selectedText[0] }}</div>
      <Picker @select="handleSelect1(arguments)" :data="cityData" :selected-index="selectedIndexCity"
            ref="picker" @change="handleChangeCity" :title="title" cancelTxt="取消" confirmTxt="确定"></Picker>
    </div>

    <div v-if="cdnDate.length > 1  && cdnDate[0].next[0].next">
      <div class="select" @click="showLinkPicker('jobData')">{{ selectedText[0] }}</div>
      <Picker @select="handleSelect1(arguments)" :data="jobData" :selected-index="selectedIndexJob"
            ref="picker" @change="handleChangeJob" :title="title" cancelTxt="取消" confirmTxt="确定"></Picker>
    </div>
  </div>
</template>

<script>
import Picker from '@/components/Picker'
export default {
  name: 'AllPicker',
  components: {
    Picker
  },
  props: {
    content: {}, // 所有数据
    text: {
      default: '请选择'
    }, // 初始显示的值
    title: {}, // picker标题
    selected: {}, // 默认选项的值
    index: {
      default: 0
    }, // 默认选项的索引
    sign: {},
    url: {} // json链接
  },
  data () {
    return {
      selectedText: [], // 外层显示
      selectedIndex: [0],
      selectedIndexCity: [0, 0],
      selectedIndexJob: [0, 0, 0],
      cdnDate: [] // cdn链接时的总数据
    }
  },
  mounted () {
    this.selectedText = [this.text]
    this.selectedIndex[0] = this.index
    if (this.url) {
      this.axios(this.url).then(res => {
        this.cdnDate = res.data
      })
    }
  },
  methods: {
    showPicker () {
      this.$refs.picker.show()
    },
    showLinkPicker (value) {
      this.$refs.picker.setData(this[value])
      this.$refs.picker.show()
    },
    handleSelect (args) {
      this.selectedText.splice(0, 1, args[2].join('-'))
      this.$emit('update', [args[0][0], this.sign])
    },
    handleSelect1 (args) {
      this.selectedText.splice(0, 1, args[2].join('-'))
      this.$emit('update', args[0])
    },
    handleChangeCity (i, newIndex) {
      if (i === 0) {
        this.cityData[1] = this.cdnDate[newIndex].next
        this.$refs.picker.setData(this.cityData)
        this.$refs.picker.scrollTo(1, 0)
      }
    },
    handleChangeJob (i, newIndex) {
      if (i === 0) {
        this.jobData[1] = this.cdnDate[newIndex].next
        this.jobData[2] = this.cdnDate[newIndex].next[0].next
        this.$refs.picker.setData(this.jobData)
        this.$refs.picker.scrollTo(1, 0)
        this.$refs.picker.scrollTo(2, 0)
      }
    }
  },
  computed: {
    cityData () {
      if (this.cdnDate.length > 0) {
        const provinces = this.cdnDate
        const cities = provinces[this.selectedIndexCity[0]].next
        return [provinces, cities]
      }
    },
    jobData () {
      if (this.cdnDate.length > 0) {
        const one = this.cdnDate
        const two = one[this.selectedIndexJob[0]].next
        const three = two[this.selectedIndexJob[1]].next
        return [one, two, three]
      }
    }
  }
}
</script>

<style scoped>

</style>
