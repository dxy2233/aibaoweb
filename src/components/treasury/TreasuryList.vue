<template>
  <div id="treasurylist" v-title="'保库'">
    <topBar :title="'保库'"></topBar>

    <loading :show="showLoading" text=""></loading>

    <div class="tab">
      <div :class="{ active: index == selectMenu && mask == true }" v-for="(item,index) in menu" :key="index" @click="screen(index)">{{ item | title(index) }}
        <svg class="icon" :class="{ activeIcon: index == selectMenu && mask == true }" aria-hidden="true">
          <use xlink:href="#icon-moreDown"></use>
        </svg>
      </div>
    </div>
    <div class="tab2" v-if="mask">
      <div :class="{ activeTab2: index == selectMenu2[selectMenu] }" v-for="(item,index) in menu2" :key="index" @click="screenTab2(index)">{{ item }}</div>
    </div>

    <div class="mask" v-if="mask" @click="nomask"></div>

    <div class="main">
      <div class="loadmore" ref="loadmorescroll">
        <div class="warp">
          <div class="list" v-for="(item,index) in content" :key="index" @click="link(item.id)">
            <div>
              <div class="pic">
                <img :src="item.pic" alt="">
                <div v-if="item.buy_status != 0" class="sale"></div>
              </div>
              <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="label">{{ item.labels }}</div>
                <div class="price">
                  <span>￥{{ item.price }}</span>&nbsp;起
                </div>
              </div>
            </div>
          </div>
          <div class="nocase" v-if="content.length == 0 && lazy">
            <img src="../../assets/img/nocases.png" alt="">
            <p>没有符合条件的产品</p>
          </div>
          <div class="end" v-if="end"><div class="before"></div>我是有底线的<div class="after"></div></div>
          <div class="seat"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'vux'
import topBar from '@/components/TopBar'
import BScroll from 'better-scroll'
export default {
  name: 'TreasuryList',
  components: {
    topBar,
    BScroll,
    Loading
  },
  props: {
    type: {}
  },
  data () {
    return {
      list0: ['不限', '少儿', '成人', '中老年', '女性'],
      list1: ['不限', '10万以下', '11~20万', '21~30万', '31~50万', '51~100万', '100万以上'],
      list2: ['不限', '一年及以内', '长期险-定期', '长期险-终身'],
      menu2: [],
      selectMenu: 5,
      selectMenu2: [0, 0, 0],
      content: [],
      mask: false,
      end: false,
      lazy: false,
      showLoading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Treasury') {
      to.meta.isBack = false
    }
    next()
  },
  mounted () {
    this.getInfo()
    this.$nextTick(() => {
      this.listScroll()
    })
  },
  activated () {
    if (!this.$route.meta.isBack) {
      this.getInfo()
      this.$nextTick(() => {
        this.listScroll()
        this.selectMenu2 = [0, 0, 0]
        this.mask = false
      })
    }
    this.$route.meta.isBack = true
  },
  methods: {
    getInfo () {
      this.axios.get('/api2/getSecurityList', {
        params: {
          type: this.type,
          sort: {},
          nums: 0
        }
      }).then(res => {
        this.content = res.data.content
        this.lazy = true
      })
    },
    addInfo () {
      if (this.end) return
      this.showLoading = true
      let temSort = {people: this.selectMenu2[0], price: this.selectMenu2[1], time: this.selectMenu2[2]}
      this.axios.get('/api2/getSecurityList', {
        params: {
          type: this.type,
          sort: temSort,
          nums: this.content.length
        }
      }).then(res => {
        if (res.data.content.length === 0) {
          this.end = true
        }
        this.content = this.content.concat(res.data.content)
      }).then(() => {
        this.scroll.finishPullUp()
        this.scroll.refresh()
        setTimeout(() => {
          this.showLoading = false
        }, 500)
      })
    },
    link (id) {
      this.$router.push({ name: 'ProductDetail', params: {id: id} })
    },
    listScroll () {
      this.scroll = new BScroll(this.$refs.loadmorescroll, {
        pullUpLoad: {
          threshold: -50
        },
        scrollY: true,
        mouseWheel: true,
        click: true,
        taps: true
      })
      this.scroll.on('pullingUp', () => {
        this.addInfo()
      })
    },
    screen (index) {
      if (index === this.selectMenu && this.mask === true) {
        this.mask = false
      } else {
        this.menu2 = this['list' + index]
        this.selectMenu = index
        this.mask = true
      }
    },
    screenTab2 (index) {
      this.end = false
      this.selectMenu2[this.selectMenu] = index
      this.mask = false
      // 触发计算属性
      this.list0.push([])
      this.list0.pop([])
      let temSort = {people: this.selectMenu2[0], price: this.selectMenu2[1], time: this.selectMenu2[2]}
      this.axios.get('/api2/getSecurityList', {
        params: {
          type: this.type,
          sort: temSort,
          nums: 0
        }
      }).then(res => {
        this.content = res.data.content
        this.scroll.scrollTo(0, 0)
        this.scroll.finishPullUp()
      })
    },
    nomask () {
      this.mask = false
      this.selectMenu = 5
    }
  },
  computed: {
    menu () {
      let one, two, three
      one = this.list0[this.selectMenu2[0]]
      two = this.list1[this.selectMenu2[1]]
      three = this.list2[this.selectMenu2[2]]
      return [one, two, three]
    }
  },
  filters: {
    title (value, index) {
      if (value === '不限') {
        if (index === 0) {
          return '适合人群'
        } else if (index === 1) {
          return '保障额度'
        } else if (index === 2) {
          return '保障期限'
        }
      } else {
        return value
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
#treasurylist {
  height: 100%;
}

.mask {
  position: fixed;
  z-index: 2;
  opacity: .7;
  background: #000;
  height: 100%;
  width: 100%;
}

.tab {
  display: flex;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: #fff;
  font-size: var(--s-fs);
  color: var(--s-bgc);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  border-bottom: 1PX solid #eee;
  z-index: 5;
  & div {
    flex: 1;
  }
  & div:not(:last-child) {
    border-right: 1PX solid #eee;
  }
  & .icon {
    width: 30px;
    height: 30px;
  }
  & .active {
    color: var(--blue);
  }
  & .activeIcon {
    transform:rotate(180deg);
  }
}

.tab2 {
  position: fixed;
  width: 100%;
  z-index: 4;
  & div {
    height: 70px;
    line-height: 70px;
    background: #fff;
    padding: 0 20px;
    font-size: var(--s-fs);
    color: var(--m-bgc);
    border-bottom: 1PX solid #eee;
  }
  & .activeTab2 {
    color: var(--blue);
  }
}

.main {
  height: calc(100% - 170px);
}

.loadmore {
  height: 100%;
  overflow: hidden;
}

.list {
  margin-top: 20px;
  background: #fff;
  /* height: 220px; */
  padding: var(--edge);
  & .pic {
    position: relative;
    float: left;
    width: 218px;
    height: 218px;
    & img {
      width: 100%;
      height: 100%;
      border: 1PX solid #eee;
    }
    & .sale {
      position: absolute;
      left: 0;
      top: -10px;
      width: 160px;
      height: 80px;
      background-image: url("../../assets/img/sale.png");
      background-size: 50%;
      background-repeat: no-repeat;
    }
  }
  & .info {
    overflow: hidden;
    padding-left: var(--edge);
    & .name {
      font-size: var(--b-fs);
      min-height: 80px;
      line-height: 40px;
    }
    & .label {
      font-size: var(--s-fs);
      color: var(--s-bgc);
      height: 80px;
      line-height: 40px;
    }
  }
}

.seat {
  height: 50px;
}

.end {
  text-align: center;
  padding: 20px 0;
  font-size: var(--s-fs);
  color: #ccc;
  position: relative;
  & .before {
    position: absolute;
    border-top: 2px solid #eee;
    width: 250px;
    left: 13px;
    top: 42px;
  }
  & .after {
    position: absolute;
    border-top: 1PX solid #eee;
    width: 250px;
    right: 13px;
    top: 42px;
  }
}

.nocase {
  & img {
    width: 250px;
    display: block;
    margin: 100px auto 40px;
  }
  & p {
    text-align: center;
    color: var(--s-bgc);
    font-size: var(--m-fs);
  }
}
</style>
