<template>
  <div id="strict" v-title="'严选'">
    <div class="banner"><img src="../../assets/img/banner.jpg" alt=""></div>

    <div class="tab">
      <div class="list" :class="{ active: index == selected }"
      v-for="(item,index) in productTitle" :key="index" @click="change(index)">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
        <div class="text">{{item.name}}</div>
      </div>
    </div>

    <tabList :content="content[selected]"></tabList>

    <tabBar></tabBar>
  </div>
</template>

<script>
import tabList from '@/components/strict/Tablist'
import tabBar from '@/components/TabBar'
import wx from 'weixin-js-sdk'
export default {
  name: 'Strict',
  components: {
    tabList,
    tabBar
  },
  data () {
    return {
      productTitle: [
        { name: '意外', icon: '#icon-accident' },
        { name: '重疾', icon: '#icon-illness' },
        { name: '寿险', icon: '#icon-Life' },
        { name: '医疗', icon: '#icon-Medical' },
        { name: '财险', icon: '#icon-Finance' }
      ],
      selected: 0, // 选择tab的索引
      content: [] // 所有列表信息
    }
  },
  mounted () {
    // 获取产品列表
    this.axios.get('/api2/getIndexList').then(res => {
      this.content = res.data.content
    })
    this.$nextTick(() => {
      this.getWX()
    })
  },
  methods: {
    // 更改选项卡视图
    change (index) {
      this.selected = index
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
        let wxUrl = window.location.href.replace('#', '~')
        this.startWX(wxUrl)
      })
    },
    startWX (url) {
      wx.config({
        debug: false,
        appId: sessionStorage.appId,
        timestamp: sessionStorage.timestamp,
        nonceStr: sessionStorage.nonceStr,
        signature: sessionStorage.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
        wx.onMenuShareTimeline({
          title: 'AI保严选 | 精算师严格把关选择保险，好的保障，没那么贵', // 分享标题
          link: url, // 分享链接
          imgUrl: 'https://cdn.aibaodata.com/2017/12/14/logo.jpg'
        })
        // 朋友
        wx.onMenuShareAppMessage({
          title: 'AI保严选 | 精算师严格把关选择保险，好的保障，没那么贵', // 分享标题
          desc: '满足刚性需求，结合定价模型，实时搜罗保险大数据，精算师严格把关选出最具性价比的精品。', // 分享描述
          link: url, // 分享链接
          imgUrl: 'https://cdn.aibaodata.com/2017/12/14/logo.jpg'
        })
      })
      wx.error(function (res) {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/css/global.css';
/* 头部图片 */
.banner {
  width: 100%;
  font-size: 0;
  & img {
    width: 100%;
    height: auto;
  }
}

/* 选项卡 */
.tab {
  display: flex;
  padding: 30px 0;
  background: var(--bgc);
  color: var(--blue);
  box-shadow: 0 0.083rem 0.167rem rgba(0,0,0,.06);
  & .list {
    flex: 1;
    text-align: center;
    & .icon {
    width: 65px;
    height: 65px;
    padding: 4px;
    }
    & .text {
      font-size: var(--m-fs);
    }
  }
  & .active {
    color: var(--red);
  }
}
</style>
