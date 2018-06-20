<template>
  <div id="citypicker">
    <div class="select" @click="showPicker">{{ selectedText[0] }}</div>
    <Picker @select="handleSelect(arguments)" :data="linkageData" :selected-index="selectedIndex"
          ref="linkpicker" :title="title" @change="handleChange" cancelTxt="取消" confirmTxt="确定"></Picker>
  </div>
</template>

<script>
import Picker from '@/components/Picker'
export default {
  name: 'CityPicker',
  components: {
    Picker
  },
  props: {
    data: {},
    title: {},
    selectedIndex: {
      type: Array,
      default () {
        return [0, 0, 0]
      }
    }
  },
  data () {
    return {
      tempIndex: [0, 0, 0]
    }
  },
  computed: {
    linkageData () {
      const [provinceList, cityList, areaList] = this.data
      const provinces = provinceList
      const cities = cityList[provinces[this.tempIndex[0]].value]
      const areas = areaList[cities[this.tempIndex[1]].value]
      return [provinces, cities, areas]
    }
  },
  watch: {
    linkageData () {
      this.$refs.linkpicker.refresh()
    }
  },
  methods: {
    showPicker () {
      this.$refs.linkpicker.setData(this.linkageData)
      this.$refs.linkpicker.show()
    },
    handleSelect (args) {
      this.$emit('select', ...args)
    },
    handleChange (i, newIndex) {
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 2; j > i; j--) {
          this.tempIndex.splice(j, 1, 0)
          this.$refs.linkpicker.scrollTo(j, 0)
        }
        this.tempIndex.splice(i, 1, newIndex)
      }
    }
  }
}
</script>
