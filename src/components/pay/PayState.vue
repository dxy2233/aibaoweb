<template>
  <div id="paystate" v-title="'订单信息'">
    <div class="code" v-if="twocode">
      <img src="../../assets/img/twocode.jpg" alt="">
      <div>
        请使用微信扫描二维码关注<br>
        “AI保数据”公众号<br>
        方便管理保单，使用更多便捷功能
      </div>
    </div>

    <div v-if="state==1" class="header">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sucess"></use>
      </svg>
      <p>保单支付成功</p>
      <button type="button" name="button" @click="found">查看订单</button>
    </div>

    <div v-if="state==0" class="header">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fail"></use>
      </svg>
      <p>保单支付失败</p>
      <button type="button" name="button" @click="found">查看订单</button>
    </div>

    <div class="main">
      <div class="content">
        <div>
          <span>商品名称：</span>
          <span>{{ content.name }}</span>
        </div>
        <div>
          <span>订单号：</span>
          <span>{{ orderSn }}</span>
        </div>
        <div>
          <span>支付方式：</span>
          <span>{{ content.paytype | typefliter }}</span>
        </div>
        <div>
          <span>支付时间：</span>
          <span>{{ content.paytime }}</span>
        </div>
        <div>
          <span>支付金额：</span>
          <span :class="{payfalse:state==1}">￥{{ content.money }}</span>
        </div>
      </div>
    </div>

    <div v-if="state==0" class="foot">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-warning"></use>
      </svg>
      <p>失败原因：请截图并联系客服处理。为您带来的不便，敬请谅解！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayState',
  props: {
    orderSn: {},
    state: {}
  },
  data () {
    return {
      content: [],
      twocode: false
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.axios.get('/api2/orderInfo', {
        params: {
          orderSn: this.orderSn
        }
      }).then(res => {
        this.content = res.data.order
        if (!res.data.subscribe) {
          setTimeout(() => {
            this.twocode = true
          }, 1000)
        }
      })
    },
    found () {
      this.$router.push({ name: 'UserOrderDetail', params: {id: this.content.id} })
    }
  },
  filters: {
    typefliter (value) {
      switch (value) {
        case 'wx':
          return '微信支付'
        case 'alipay':
          return '支付宝'
        case 'bank':
          return '银行卡'
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
.header {
  background: linear-gradient(#85b6e7, #4a83bc);
  width: 100%;
  height: 400px;
  text-align: center;
  color: #fff;
  & .icon {
    padding-top: 60px;
    margin-bottom: 20px;
    height: 100px;
    width: 100px;
  }
  & p {
    display: block;
    font-size: var(--m-fs);
    margin-bottom: 40px;
  }
  & button {
    font-size: var(--m-fs);
    color: #fff;
    border: none;
    border-radius: 10px;
    background: none;
    border: 2PX solid #fff;
    padding: 20px 80px;
  }
}
.main {
  font-size: var(--s-fs);
  height: 320px;
  background-color: #fff;
  padding: 40px;
  & .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    & div {
      display: flex;
      justify-content: flex-start;
    & span:nth-child(1) {
        flex: 1;
        color: var(--b-bgc);
      }
    & span:nth-child(2) {
        flex: 3;
        color: var(--s-bgc);
      }
    & .payfalse {
        color: var(--red) !important;
      }
    }
  }
}
.foot {
  padding: 30px 40px 0;
  color: var(--red);
  font-size: var(--s-fs);
  display: flex;
  & .icon {
    width: 35px;
    height: 35px;
    margin-top: 1px;
    margin-right: 5px;
  }
}

.code {
  position: fixed;
  background-color: #000;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  margin-top: 400px;
  & img {
    display: block;
    margin: 0 auto;
    width: 500px;
  }
  & div {
    color: #fff;
    font-size: var(--m-fs);
    text-align: center;
    width: 460px;
    margin: 20px auto 0;
    padding: 20px;
    border: 2PX solid #333;
    border-radius: 50px;
  }
}
</style>
