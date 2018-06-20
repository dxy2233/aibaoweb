import Vue from 'vue'
import Router from 'vue-router'
// 首页
// import Strict from '@/components/strict/Strict'
// 保库
// import Treasury from '@/components/treasury/Treasury'
// import TreasuryList from '@/components/treasury/TreasuryList'
// 比价
// import Contrast from '@/components/contrast/Contrast'
// import ContrastList from '@/components/contrast/ContrastList'
// 定制
// import Decision from '@/components/decision/Decision'
// import DecisionList from '@/components/decision/DecisionList'
// import DecisionStep from '@/components/decision/DecisionStep'
// import DecisionCase from '@/components/decision/DecisionCase'
// 个人信息
// import User from '@/components/user/User'
// import AboutUs from '@/components/user/AboutUs'
// import UserClaims from '@/components/user/UserClaims'
// import UserQuestion from '@/components/user/UserQuestion'
// import UserOrder from '@/components/user/UserOrder'
// import UserOrderDetail from '@/components/user/UserOrderDetail'
// 产品详情
// import ProductDetail from '@/components/product/ProductDetail'
// import HealthInfo from '@/components/product/HealthInfo'
// 支付流程
// import Order from '@/components/pay/Order'
// import OrderConfirm from '@/components/pay/OrderConfirm'
// import PaySub from '@/components/pay/PaySub'
// import PayState from '@/components/pay/payState'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/strict',
      name: 'Strict',
      // component: Strict,
      component: resolve => require(['@/components/strict/Strict'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/',
      redirect: '/strict'
    },
    {
      path: '/index/1',
      redirect: '/strict'
    },
    {
      path: '/user',
      name: 'User',
      // component: User,
      component: resolve => require(['@/components/user/User'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/treasury',
      name: 'Treasury',
      // component: Treasury,
      component: resolve => require(['@/components/treasury/Treasury'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/treasurylist/:type',
      name: 'TreasuryList',
      // component: TreasuryList,
      component: resolve => require(['@/components/treasury/TreasuryList'], resolve),
      props: true,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: '/contrast',
      name: 'Contrast',
      // component: Contrast,
      component: resolve => require(['@/components/contrast/Contrast'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/contrastlist/:type',
      name: 'ContrastList',
      // component: ContrastList,
      component: resolve => require(['@/components/contrast/ContrastList'], resolve),
      props: true,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: '/decision',
      name: 'Decision',
      // component: Decision,
      component: resolve => require(['@/components/decision/Decision'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/decisionstep',
      name: 'DecisionStep',
      // component: DecisionStep,
      component: resolve => require(['@/components/decision/DecisionStep'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/decisionlist',
      name: 'DecisionList',
      // component: DecisionList,
      component: resolve => require(['@/components/decision/DecisionList'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/decisioncase/:id',
      name: 'DecisionCase',
      // component: DecisionCase,
      component: resolve => require(['@/components/decision/DecisionCase'], resolve),
      props: true,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      // component: AboutUs,
      component: resolve => require(['@/components/user/AboutUs'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/userclaims',
      name: 'UserClaims',
      // component: UserClaims,
      component: resolve => require(['@/components/user/UserClaims'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/userquestion',
      name: 'UserQuestion',
      // component: UserQuestion,
      component: resolve => require(['@/components/user/UserQuestion'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/userorder/:type',
      name: 'UserOrder',
      // component: UserOrder,
      component: resolve => require(['@/components/user/UserOrder'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/userorderdetail/:id',
      name: 'UserOrderDetail',
      // component: UserOrderDetail,
      component: resolve => require(['@/components/user/UserOrderDetail'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      // component: ProductDetail,
      component: resolve => require(['@/components/product/ProductDetail'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/healthinfo/:id',
      name: 'HealthInfo',
      // component: HealthInfo,
      component: resolve => require(['@/components/product/HealthInfo'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/order/:id',
      name: 'Order',
      // component: Order,
      component: resolve => require(['@/components/pay/Order'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/orderconfirm/:orderSn',
      name: 'OrderConfirm',
      // component: OrderConfirm,
      component: resolve => require(['@/components/pay/OrderConfirm'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/paysub/:orderSn',
      name: 'PaySub',
      // component: PaySub,
      component: resolve => require(['@/components/pay/PaySub'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/paystate/:orderSn/:state',
      name: 'PayState',
      // component: PayState,
      component: resolve => require(['@/components/pay/PayState'], resolve),
      props: true,
      meta: {
        keepAlive: false
      }
    }
  ]
})
