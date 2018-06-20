<template>
  <div id="tryform">
    <div class="row" v-for="(item,index) in content" :key="index">
      <div class="left">
        {{ item.name }}
      </div>
      <div class="right">
        <!-- 日期选择 -->
        <div v-if="item.type === 'datepicker'">
          <datePicker @update="updatePrice" :text="item.text" :selected="item.selected"
          :maxDate="item.maxDate" :minDate="item.minDate" :sign="item.id"></datePicker>
        </div>
        <!-- 单选radio -->
        <div v-if="item.type === 'radio'">
          <radio @update="updatePrice" :content="item.value" :selected="item.selected"
          :sign="item.id"></radio>
        </div>
        <!-- 单选picker -->
        <div v-if="item.type === 'singlepicker'">
          <allPicker @update="updatePrice" :title="item.name" :selected="item.selected"
          :text="item.text" :content="item.data" :sign="item.id" :index="item.index"></allPicker>
        </div>
        <!-- 选择份数 -->
        <div v-if="item.type === 'lpynumberpicker'">
          <nums @update="updatePrice" :max="item.max" :min="item.min" :selected="item.selected" :sign="item.id"></nums>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datePicker from '@/components/DatePicker'
import radio from '@/components/Radio'
import allPicker from '@/components/AllPicker'
import nums from '@/components/Nums'
export default {
  name: 'TryForm',
  components: {
    datePicker,
    radio,
    allPicker,
    nums
  },
  props: {
    content: {},
    id: {}
  },
  data () {
    return {
      tryInfo: {}
    }
  },
  mounted () {
    // 生成保费试算上传的数据
    let temDate = {}
    this.content.forEach(function (user, index, arr) {
      if (user.type === 'singlepicker') {
        temDate[user.id] = user.selected[0]
      } else {
        temDate[user.id] = user.selected
      }
    })
    this.tryInfo = temDate
    localStorage.tryInfo = JSON.stringify(this.tryInfo)
  },
  methods: {
    // 保费试算
    updatePrice (value) {
      if (value[1] === 'nums') {
        this.$emit('changeNum', value[0])
      }
      this.tryInfo[value[1]] = value[0]
      this.axios.post('/api2/updatePrice', {
        ID: this.id,
        tryInfo: this.tryInfo
      }).then(res => {
        this.$emit('changePrice', [res.data.price, res.data.unit])
        localStorage.tryInfo = JSON.stringify(this.tryInfo)
      })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
.row {
  display: flex;
  font-size: var(--m-fs);
  height: 70px;
  line-height: 70px;
  padding: var(--edge) 0;
  & .left {
    flex: 2;
    color: var(--s-bgc);
  }
  & .right {
    flex: 3;
    text-align: center;
  }
}

#allpicker, #datepicker {
  border: 1PX solid #e5e5e5;
  border-radius: 10px;
}

#radio >>> .radiowrap:first-child {
  margin-right: 4%;
}
</style>
