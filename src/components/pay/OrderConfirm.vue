<template>
  <div id="orderconfirm" v-title="'填写信息'">
    <div class="productInfo">
      <div class="productName">{{ content.productName }}</div>
      <div class="info">
        <span class="name">生效日期：</span>
        <span class="content">{{ content.startDate }}</span>
      </div>
      <div class="info" v-if="content.endDate">
        <span class="name">终止日期：</span>
        <span class="content">{{ content.endDate }}</span>
      </div>
      <div class="info" v-if="content.waitDate">
        <span class="name">等待期：</span>
        <span class="content">{{ content.waitDate }}</span>
      </div>
      <div class="info" v-if="content.baoe">
        <span class="name">保障额度：</span>
        <span class="content">{{ content.baoe }}</span>
      </div>
      <div class="info">
        <span class="name">价格：</span>
        <span class="content" style="color:#cc0000;font-weight:bold;">￥{{ content.money }}</span>
      </div>
    </div>

    <div class="orderInfo">
      <div class="list" v-for="(item,index) in content.list" :key="index">
        <div class="caption">{{ item.heading }}</div>
        <div class="info">
          <span class="name">姓名：</span>
          <span class="content">{{ item.name }}</span>
        </div>
        <div class="info">
          <span class="name">证件类型：</span>
          <span class="content">{{ item.type }}</span>
        </div>
        <div class="info">
          <span class="name">证件号：</span>
          <span class="content">{{ item.idnum }}</span>
        </div>
        <div class="info">
          <span class="name">手机号：</span>
          <span class="content">{{ item.phone }}</span>
        </div>
      </div>
    </div>

    <div class="clause">
      <label>
        <input type="checkbox" v-model="val" id="tem">
        <label class="i-check" for="tem"></label>我已阅读并同意
      </label>
      <a v-for="(item,index) in content.files" :key="index" :href="item.src" class="link">《{{ item.name }}》</a>
    </div>
    <div class="foot">
      <div class="unsubmit" :class="{submit:!val}" @click="toBuy">立即支付</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirm',
  props: {
    orderSn: {}
  },
  data () {
    return {
      content: [],
      val: false
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.axios.get('/api2/getOrderConfirm', {
        params: {
          orderSn: this.orderSn
        }
      }).then(res => {
        this.content = res.data.content
      })
    },
    toBuy () {
      if (!this.val) return
      this.$router.push({ name: 'PaySub', params: { orderSn: this.orderSn } })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
.productInfo,.orderInfo {
  margin-bottom: 20px;
  border-bottom: 2PX solid #e5e5e5;
  padding: 40px;
  background: #fff;
  & .productName,& .caption {
    margin-bottom: 15px;
    font-size: var(--m-fs);
    color: #000;
    font-weight: normal;
    position: relative;
  }
  & .caption {
    text-indent: 20px;
  }
  & .caption:before {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    width: 10px;
    height: 40px;
    background: var(--blue);
  }
}

.orderInfo {
  border-top: 2PX solid #e5e5e5;
  & .list:not(:last-child) {
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 2PX solid #e5e5e5;
  }
}

.info {
  margin-bottom: 5px;
  display: flex;
  font-size: var(--m2-fs);
  color: var(--m-bgc);
  & .name {
    flex: 1;
  }
  & .content {
    flex: 2.5;
  }
}

.clause {
  margin-top: 50px;
  margin: 0 20px;
  font-size: var(--m2-fs);
  text-align: center;
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
  & input[type=checkbox]:checked + .i-check{
    background: var(--blue) url('../../assets/img/check.png') center center no-repeat;
    background-size: 50% 40%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top: 110px;
    right: 0;
  }
  & .link {
    text-decoration: none;
    color: var(--blue);
  }
}

.foot {
  padding: 40px 0;
}

.unsubmit {
  text-align: center;
  font-size: var(--m-fs);
  color: #fff;
  background-color: var(--blue);
  box-shadow: 0 0.111rem 0.417rem #eee;
  width: 80%;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
  border-radius: 10px;
}

.submit {
  background-color: #ccc;
  box-shadow: 0 0.111rem 0.417rem #c1dcf5;
}
</style>
