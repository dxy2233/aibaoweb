<template>
  <div id="contrastlist" v-title="'比价'">
    <topBar :title="'比价'"></topBar>

    <loading :show="showLoading" text=""></loading>

    <div class="wrap">
      <div class="caption">
        {{ title }}
        <span @click="mask = true">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-filter"></use>
          </svg>筛选
        </span>
      </div>
      <div class="content">
        <div class="loadmore" ref="loadmorescroll">
          <div>
            <div class="list" v-for="(item,index) in content" :key="index" @click="link(item.id, item.cpid, item.be)">
              <div class="main">
                <div class="pic">
                  <img :src="item.pic" alt="">
                  <div v-if="item.buy_status != 0" class="sale"></div>
                </div>
                <div class="info">
                  <div class="name">{{ item.name }}</div>
                  <div class="label">{{ item.labels }}</div>
                </div>
                <div class="round">
                  <div class="circle">
                    <x-circle :percent="item.CP - 2" :stroke-width="7" :trail-width="7"
                    stroke-color="#8db7e1" trail-color="#D9ECFF">
                      <span>{{ item.CP }}<br>CP</span>
                    </x-circle>
                  </div>
                  <div class="price">
                    ￥{{ item.price }}
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

    <div class="filter" v-show="mask">
      <div class="btn-close" @click="mask = false">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg> -->
      </div>

      <div class="filtercontent">
        <div class="row">
          <div class="title">性别</div>
          <radio class="sex" @update="updateSex" :content="sexData" :selected="0" :sign="'gender'"></radio>
        </div>
        <div class="row">
          <div class="title">年龄</div>
          <allPicker @update="updateOld" :title="'年龄'" :selected="[30]"
          :text="'30岁'" :content="oldData" :index="30"></allPicker>
        </div>
        <div class="row">
          <div class="title">保障期限</div>
          <radio @update="updateDeadline" :content="deadlineData" :selected="'2'" :sign="'deadline'"></radio>
        </div>
        <div class="row">
          <div class="title">缴费期限</div>
          <radio @update="updateTime" :content="timeData" :selected="timeSelected" :sign="'longTime'"></radio>
        </div>
        <div class="row" v-if="type == 1">
          <div class="title">保额</div>
          <allPicker @update="updatePrice" :title="'保额'" :selected="['4']"
          :text="'40万'" :content="priceData" :index="3"></allPicker>
        </div>

        <div class="row" v-if="type == 2">
          <div class="title">保额</div>
          <allPicker @update="updatePrice" :title="'保额'" :selected="['3']"
          :text="'30万'" :content="priceData" :index="2"></allPicker>
        </div>
        <div class="row" v-if="type == 2">
          <div class="title">是否返还</div>
          <radio @update="updateRe" :content="reData" :selected="2" :sign="'re'"></radio>
        </div>
        <div class="row" v-if="type == 2">
          <div class="title">是否包含身故责任</div>
          <radio @update="updateDead" :content="deadData" :selected="2" :sign="'dead'"></radio>
        </div>
        <div class="row" v-if="type == 2" style="margin-bottom:70px;">
          <div class="title">重疾数量</div>
          <radio @update="updateWeight" :content="weightData" :selected="0" :sign="'weight'"></radio>
        </div>
        <div class="row" v-if="type == 2" style="margin-bottom:80px;">
          <div class="title">轻症数量</div>
          <radio @update="updateSmall" :content="smallData" :selected="0" :sign="'small'"></radio>
        </div>
      </div>

      <div class="foot">
        <div @click="filter">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/TopBar'
import Radio from '@/components/Radio'
import allPicker from '@/components/AllPicker'
import BScroll from 'better-scroll'
import { XCircle, Loading } from 'vux'
import wx from 'weixin-js-sdk'
export default {
  name: 'ContrastList',
  components: {
    topBar,
    BScroll,
    XCircle,
    Radio,
    allPicker,
    Loading
  },
  props: {
    type: {}
  },
  data () {
    return {
      content: [],
      end: false,
      lazy: false,
      mask: false,
      showLoading: false,
      sexData: [{name: '男', value: 0}, {name: '女', value: 1}],
      gender: 1,
      oldData: [[]],
      age: [30],
      deadlineData: [{name: '1-10年', value: 0}, {name: '11-20年', value: 1},
        {name: '21-30年', value: 2}, {name: '30年以上', value: 3}],
      SecurityPeriod: 2, // 保障期限
      timeSelected: 1,
      PaymentDeadline: 1, // 缴费时长
      priceData: [[{text: '10万', value: '1'}, {text: '20万', value: '2'},
        {text: '30万', value: '3'}, {text: '40万', value: '4'}, {text: '50万', value: '5'},
        {text: '60万', value: '6'}, {text: '100万', value: '7'}, {text: '150万', value: '8'}]],
      SecurityCredits: ['4'], // 保额
      reData: [{name: '是', value: 0}, {name: '否', value: 1}, {name: '不限', value: 2}], // 是否返还
      return: 3,
      deadData: [{name: '是', value: 0}, {name: '否', value: 1}, {name: '不限', value: 2}], // 是否身故
      death: 3,
      weightData: [{name: '1-6种', value: 0}, {name: '7-25种', value: 1}, {name: '26-50种', value: 2},
        {name: '51-80种', value: 3}, {name: '80种以上', value: 4}],
      criticalIllness: 0, // 重疾数量
      smallData: [{name: '0-10种', value: 0}, {name: '11-20种', value: 1}, {name: '21-30种', value: 2},
        {name: '31-50种', value: 3}, {name: '50种以上', value: 4}],
      illness: 0 // 轻症数量
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Contrast') {
      to.meta.isBack = false
    }
    next()
  },
  mounted () {
    for (let i = 0; i <= 105; i++) {
      this.oldData[0].push({
        text: i + '岁',
        value: i
      })
    }
    this.getInfo()
    this.$nextTick(() => {
      this.listScroll()
      this.getWX()
    })
  },
  activated () {
    this.mask = false // 保存状态进入后关闭筛选框
    if (!this.$route.meta.isBack) {
      for (let i = 0; i <= 105; i++) {
        this.oldData[0].push({
          text: i + '岁',
          value: i
        })
      }
      this.getInfo()
      this.$nextTick(() => {
        this.listScroll()
        this.getWX()
      })
    }
    this.$route.meta.isBack = true
  },
  methods: {
    getInfo () {
      this.axios.get('/api2/getContrastList', {
        params: {
          type: this.type
        }
      }).then(res => {
        this.content = res.data.content.list
        this.lazy = true
      })
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
        if (this.end) return
        if (parseInt(this.type) === 1) {
          this.axios.post('/api2/getContrastListMore', {
            params: {
              filter: {
                PaymentDeadline: this.PaymentDeadline,
                SecurityCredits: this.SecurityCredits,
                SecurityPeriod: this.SecurityPeriod,
                age: this.age,
                gender: parseInt(this.gender)
              },
              nums: this.content.length,
              type: '1'
            }
          }).then(res => {
            if (res.data.content.length === 0) {
              this.end = true
            }
            this.content = this.content.concat(res.data.content)
          }).then(() => {
            this.scroll.refresh()
            this.scroll.finishPullUp()
          })
        } else if (parseInt(this.type) === 2) {
          this.axios.post('/api2/getContrastListMore', {
            params: {
              filter: {
                PaymentDeadline: this.PaymentDeadline,
                SecurityCredits: this.SecurityCredits,
                SecurityPeriod: this.SecurityPeriod,
                age: this.age,
                criticalIllness: this.criticalIllness,
                death: this.death,
                gender: parseInt(this.gender),
                illness: this.illness,
                return: this.return
              },
              nums: this.content.length,
              type: '2'
            }
          }).then(res => {
            if (res.data.content.length === 0) {
              this.end = true
            }
            this.content = this.content.concat(res.data.content)
          }).then(() => {
            this.scroll.refresh()
            this.scroll.finishPullUp()
          })
        }
      })
    },
    updateSex (value) {
      this.gender = value[0] + 1
    },
    updateOld (value) {
      this.age[0] = value[0]
    },
    updateDeadline (value) {
      this.SecurityPeriod = value[0]
    },
    updateTime (value) {
      this.PaymentDeadline = value[0]
    },
    updatePrice (value) {
      this.SecurityCredits[0] = value[0]
    },
    updateRe (value) {
      this.return = value[0] + 1
    },
    updateDead (value) {
      this.death = value[0] + 1
    },
    updateWeight (value) {
      this.criticalIllness = value[0]
    },
    updateSmall (value) {
      this.illness = value[0]
    },
    filter () {
      this.mask = false
      this.end = false
      if (parseInt(this.type) === 1) {
        this.axios.post('/api2/getContrastListMore', {
          params: {
            filter: {
              PaymentDeadline: this.PaymentDeadline,
              SecurityCredits: this.SecurityCredits,
              SecurityPeriod: this.SecurityPeriod,
              age: this.age,
              gender: parseInt(this.gender)
            },
            nums: 0,
            type: '1'
          }
        }).then(res => {
          this.content = res.data.content
          this.scroll.scrollTo(0, 0)
          this.scroll.finishPullUp()
        })
      } else if (parseInt(this.type) === 2) {
        this.axios.post('/api2/getContrastListMore', {
          params: {
            filter: {
              PaymentDeadline: this.PaymentDeadline,
              SecurityCredits: this.SecurityCredits,
              SecurityPeriod: this.SecurityPeriod,
              age: this.age,
              criticalIllness: this.criticalIllness,
              death: this.death,
              gender: parseInt(this.gender),
              illness: this.illness,
              return: this.return
            },
            nums: 0,
            type: '2'
          }
        }).then(res => {
          this.content = res.data.content
          this.scroll.scrollTo(0, 0)
          this.scroll.finishPullUp()
        })
      }
    },
    link (id, cpid, be) {
      this.$router.push({ name: 'ProductDetail', params: {id: id, cpid: cpid, be: be, maxcp: true} })
    },
    getWX () {
      let nowUrl = window.location.href
      this.axios.get('/api/getWxToken', {
        params: {
          url: nowUrl
        }
      }).then((response) => {
        sessionStorage.appId = response.data.appID
        sessionStorage.timestamp = response.data.timestamp
        sessionStorage.nonceStr = response.data.nonceStr
        sessionStorage.signature = response.data.signature
        this.startWX(parseInt(this.type))
      })
    },
    startWX (type) {
      wx.config({
        debug: false,
        appId: sessionStorage.appId,
        timestamp: sessionStorage.timestamp,
        nonceStr: sessionStorage.nonceStr,
        signature: sessionStorage.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
      })
      wx.ready(function () {
        let title
        if (type === 1) {
          title = '寿险'
        } else {
          title = '重疾'
        }
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
        wx.onMenuShareTimeline({
          title: 'AI比价 | 这些高CP值的' + title + '治好您的选择障碍', // 分享标题
          link: '', // 分享链接
          imgUrl: 'https://cdn.aibaodata.com/2017/12/14/logo.jpg'
        })
        // 朋友
        wx.onMenuShareAppMessage({
          title: 'AI比价 | 这些高CP值的' + title + '治好您的选择障碍', // 分享标题
          desc: '最具性价比的寿险排行榜，CP值给您答案。', // 分享描述
          link: '', // 分享链接
          imgUrl: 'https://cdn.aibaodata.com/2017/12/14/logo.jpg'
        })
      })
      wx.error(function (res) {
        console.log(res)
      })
    }
  },
  watch: {
    SecurityPeriod (value) {
      if (value < this.PaymentDeadline) {
        this.PaymentDeadline = this.SecurityPeriod
        this.timeSelected = this.SecurityPeriod
      }
    }
  },
  computed: {
    timeData () {
      let tem = [{name: '0-10年', value: 0}, {name: '11-20年', value: 1},
        {name: '21-30年', value: 2}, {name: '30年以上', value: 3}]
      tem.length = this.SecurityPeriod + 1
      return tem
    },
    title () {
      if (parseInt(this.type) === 1) {
        return '寿险'
      } else {
        return '重疾'
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
#contrastlist {
  height: 100%;
}

.loadmore {
  height: 100%;
  overflow: hidden;
}

.wrap {
  height: calc(100% - 170px);
}

.caption {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background: #fff;
  height: 80px;
  line-height: 80px;
  font-size: var(--m-fs);
  color: var(--m-bgc);
  & span {
    font-size: var(--m2-fs);
  }
  & .icon {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    margin-top: -10px;
  }
}

.content {
  border-top: 2PX solid #eee;
  height: 100%;
  & .seat {
    height: 40px;
  }
}

.list {
  background: #fff;
  padding: var(--edge);
  border-bottom: 2PX solid #eee;
  & .main {
    display: flex;
  }
  & .pic {
    flex: 1;
    position: relative;
    width: 170px;
    height: 170px;
    & img {
      width: 100%;
      height: 100%;
      border: 2PX solid #eee;
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
    flex: 2;
    margin-left: var(--edge);
    & .name {
      font-size: var(--m2-fs);
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
  & .round {
    flex: 1;
    & .price {
      font-size: var(--m3-fs);
      margin-top: 10px;
      margin-right: 10px;
    }
    & .circle {
      width: 120px;
      height: 120px;
      font-size: var(--m-fs);
      color: var(--blue);
      float: right;
    }
  }
}

.list:first-child {
  margin-top: 20px;
}

/* 筛选 */
.filter {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  & .btn-close {
    color: var(--s-bgc);
    float: right;
    margin-right: 20px;
    margin-top: 20px;
  }
  & .foot {
    position: absolute;
    bottom: 0;
    border-top: 1PX solid #eee;
    width: 100%;
    height: 100px;
    background: #f8f8f8;
    & div {
      float: right;
      background: var(--blue);
      color: #fff;
      font-size: var(--m-fs);
      width: 200px;
      height: 60px;
      line-height: 60px;
      margin-top: 20px;
      margin-right: 20px;
      text-align: center;
      border-radius: 10px;
    }
  }
  & .filtercontent {
    padding: 0 20px;
    height: calc(100% - 100px);
    overflow-y: auto;
    & .row {
      margin-bottom: 40px;
      & .title {
        font-size: var(--m2-fs);
        color: var(--s-bgc);
        margin-bottom: 10px;
      }
      & #radio {
        height: 60px;
        line-height: 60px;
        text-align: center;
        align-items: center;
      }
      & #radio >>> .radiowrap {
        width: 162px;
        flex: none;
        margin-top: 20px;
      }
      & #radio >>> .radiowrap:not(:nth-child(4)) {
        margin-right: 2%;
      }
      & #allpicker {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: var(--m-fs);
        color: var(--m-bgc);
        border: 1PX solid #eee;
        border-radius: 10px;
        text-indent: 20px;
      }
    }
    & .row:first-child {
      margin-top: 20px;
    }
  }
}

.end {
  text-align: center;
  padding: 20px 0;
  font-size: var(--s-fs);
  color: #ccc;
  position: relative;
  & .before {
    position: absolute;
    border-top: 1PX solid #eee;
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
