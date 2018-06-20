<template>
  <div id="paysub" v-title="'填写信息'">
    <div class="header">
      <div class="policy">
      <p>
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-sucess"></use>
        </svg>保单已提交
      </p>
      </div>
      <span class="prompty">(请在保单生效日期前完成支付)</span>
    </div>

    <div class="productlist">
      <div class="left">{{ name }}</div>
      <div class="right">￥{{ price }}</div>
    </div>

    <div class="paymode">选择支付方式</div>

    <div class="paymodelist">
      <div class="left">
        <div class="logo">
          <svg slot="icon" class="icon" aria-hidden="true">
            <use xlink:href="#icon-WechatPay"></use>
          </svg>
        </div>
        <div class="info">
          <div class="title">微信支付</div>
          <div class="remark">亿万用户的选择，更快更安全</div>
        </div>
      </div>
      <div class="right">
        <label>
          <input type="radio" checked>
          <label class="i-check"></label>
        </label>
      </div>
    </div>

    <div class="foot">
      <div class="submit" @click="pay">确认支付: ￥{{ price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySub',
  props: {
    orderSn: {}
  },
  data () {
    return {
      name: '',
      price: '',
      url: ''
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.axios.get('/api2/getOrderInfo', {
        params: {
          orderSn: this.orderSn
        }
      }).then(res => {
        this.name = res.data.name
        this.price = res.data.price
        this.url = res.data.url
      })
    },
    pay () {
      window.location.href = this.url
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
.header {
  background-color: #fff;
  width: 100%;
  height: 160px;
  text-align: center;
  margin-bottom: 10px;
  & .policy p {
    font-size: var(--m-fs);
    color: var(--d-bgc);
    padding-top: 40px;
    padding-bottom: 10px;
  }
  & .prompty {
    font-size: var(--s-fs);
    color: #aaa;
  }
  & .icon {
    width: 35px;
    height: 35px;
    color: #35ad2e;
    margin-right: 10px;
  }
}

.productlist {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  height: 70px;
  line-height: 70px;
  padding: 20px;
  font-size: var(--m3-fs);
  & .right {
    color: var(--red);
  }
}

.paymode {
  color: var(--m-bgc);
  font-size: var(--s-fs);
  padding: 20px;
}

.paymodelist {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100px;
  line-height: 100px;
  background: #fff;
  & .left {
    display: flex;
    & .icon {
      width: 65px;
      height: 65px;
      padding-right: 10px;
    }
    & .info {
      line-height: 2;
      & .title {
        font-size: var(--m3-fs);
        height: 50%;
      }
      & .remark {
        font-size: var(--s-fs);
        color: var(--s-bgc);
        height: 50%;
      }
    }
  }
  & input {
    display: none;
  }
  & .i-check {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 2PX solid #eee;
    border-radius: 50%;
    background-size: 100%;
    margin: 0 10px -10px 0;
  }
  & input[type=radio]:checked + .i-check{
    background: var(--blue) url('../../assets/img/check.png') center center no-repeat;
    background-size: 50% 40%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top: 110px;
    right: 0;
  }
}

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #6699cc;
  font-size: var(--m-fs);
  color: #fff;
  text-align: center;
}
</style>
