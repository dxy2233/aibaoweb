<template>
  <div id="decisionstep" v-title="'定制'">
    <toast v-model="show" :time="800" type="text" width="300px" position="middle" :text="toastText"></toast>
    <loading :show="showLoading" text=""></loading>
    <!-- 增加家庭成员的遮罩层和弹出层 -->
    <actionsheet v-model="mask" @on-click-mask="maskCity = false, maskAddPerson = false"></actionsheet>
    <div class="confirm" v-if="maskAddPerson">
      <div class="txt">请添加投保对象</div>
      <div class="main">
        <div class="wrap">
          <div class="son" @click="addSon"></div>
          <div>儿子</div>
        </div>
        <div class="wrap">
          <div class="daughter" @click="addDaughter"></div>
          <div>女儿</div>
        </div>
      </div>
    </div>

    <div class="module zero">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">您好，我是AI保的智能顾问-爱宝。<br/>请花2分钟回答几个问题，为您定制保障方案。
            <br/>您越认真，我越靠谱！</div>
          <div class="question" v-if="step == 0">
            <div class="btn" @click="add">开始定制吧
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyou"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 0">
        <div class="text">开始定制保障方案</div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module one" v-if="step >= 1">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(1/13)我该称呼您先生还是女士呢？</div>
          <div class="question" v-if="step == 1">
            <div class="main">
              <div class="sexradio">
                <input type="radio" id="m" value="m" v-model="sex">
                <i class="i-check"></i>
                <label for="m">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-nan"></use>
                  </svg>
                </label>
                <div>先生</div>
              </div>
              <div class="sexradio">
                <input type="radio" id="f" value="f" v-model="sex">
                <i class="i-check"></i>
                <label for="f">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-nv"></use>
                  </svg>
                </label>
                <div>女士</div>
              </div>
            </div>
            <div class="btn" @click="one">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 1">
        <div class="text">{{ sex | sexF }}</div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module two" v-if="step >= 2">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(2/13)您要为哪些家人投保呢？<span>(可单选可多选，也可点击“+”添加更多)</span></div>
          <div class="question" v-if="step == 2">
            <div class="main">
              <div class="checkbox" v-for="(item,index) in family" :key="index">
                <input type="checkbox" :id="index" :value="item" v-model="person">
                <i class="i-check"></i>
                <label :for="index" :class="'family' + item.value"></label>
                <div>{{ item.value | personF }}</div>
              </div>
              <div class="checkbox">
                <label class="familyAdd" @click="addFamily">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iconjia"></use>
                  </svg>
                </label>
                <div>添加</div>
              </div>
            </div>
            <div class="btn" @click="two">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 2">
        <div class="text">投保对象：
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}
            <span v-if="index < person.length-1">、</span>
          </span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module three" v-if="step >= 3">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(3/13)被保人的出生日期是？<span>(请填写身份证对应的出生日期)</span></div>
          <div class="question" v-if="step == 3">
            <div class="main">
              <div class="picker" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <datePicker @update="changeBirth($event, index)" :text="birth[index]" :selected="birth[index]"></datePicker>
                </div>
              </div>
            </div>
            <div class="btn" @click="three">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 3">
        <div class="text">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ birth[index][0] }}-{{ birth[index][1] }}-{{ birth[index][2] }}<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module four" v-if="step >= 4">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(4/13)被保人的职业类型是？</div>
          <div class="question" v-if="step == 4">
            <div class="main">
              <div class="picker" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div v-if="jobType[0][job[index]]">
                  <allPicker @update="changeJob($event, index)" :content="jobType" :index="job[index]" :text="jobType[0][job[index]].text" :title="'职业类型'"></allPicker>
                </div>
                <div v-else>
                  <allPicker @update="changeJob($event, index)" :content="jobType" :index="job[index]" :title="'职业类型'"></allPicker>
                </div>
              </div>
            </div>
            <div class="btn" @click="four">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 4">
        <div class="text">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ jobType[0][job[index]].text }}<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module five" v-if="step >= 5">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(5/13)被保人的个人年收入是？<span>(请填写0-9999中的整数，如无收入请填写0)</span></div>
          <div class="question" v-if="step == 5">
            <div class="main">
              <div class="txt" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <input type="text" maxlength="4" v-model="income[index]">万/年
                </div>
              </div>
            </div>
            <div class="btn" @click="five">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 5">
        <div class="text">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ income[index] }}万/年<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module six" v-if="step >= 6">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(6/13)被保人的个人保险预算是？<span>(请填写200-99999中的整数)</span></div>
          <div class="question" v-if="step == 6">
            <div class="main">
              <div class="txt" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <input type="text" maxlength="5" v-model="budget[index]"><span style="color:red;font-size:.494rem;font-weight:600;">元</span>/年
                </div>
              </div>
            </div>
            <div class="btn" @click="six">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 6">
        <div class="text">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ budget[index] }}元/年<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module seven" v-if="step >= 7">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(7/13)被保人是否有社保？<span>(社保包括城镇职工医保、城镇居民医保、新农合)</span></div>
          <div class="question" v-if="step == 7">
            <div class="main">
              <div class="radiobox" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div class="list">
                  <div class="radiowrap">
                    <input type="radio" :id="'security' + index + 1" value=1 v-model="security[index]">
                    <label :for="'security' + index + 1"></label>
                    <label :for="'security' + index + 1">有社保</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'security' + index + 0" value=0 v-model="security[index]">
                    <label :for="'security' + index + 0"></label>
                    <label :for="'security' + index + 0">无社保</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" @click="seven">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 7">
        <div class="text">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ security[index] | securityF }}社保<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module eight" v-if="step >= 8">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(8/13)被保人的长期居住地？</div>
          <div class="question" v-if="step == 8">
            <div class="main">
              <div class="location" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <div @click="showCitybox(index)" :class="{ same: citySame[index] }">{{ city[1][index] }}</div>
                  <div class="radiowrap" v-if="index > 0">
                    <input type="checkbox" :id="'city' + index" v-model="citySame[index]">
                    <label :for="'city' + index"></label>
                    <label :for="'city' + index">同上</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" @click="eight">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 8">
        <div class="text">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ city[1][index] }}<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="cityLocation" v-if="maskCity">
      <div @click="selectCity(locationCity)">{{ locationCity.city }}</div>
      <span>定位城市</span>
      <div class="btn-close" @click="mask = false, maskCity = false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
    <div class="citybox" v-if="maskCity">
      <div class="cityrow">
        <div class="title">热门城市</div>
        <div class="citycontent">
          <div v-for="(item,index) in hotCity" :key="index" @click="selectCity(item)">{{ item.city }}</div>
        </div>
      </div>
      <div class="cityrow">
        <div class="title">更多城市（点击字母快速定位）</div>
        <div class="citycontent">
          <a v-for="(item,index) in cityCode" :key="index" @click="goAnchor('#anchor-'+index)">{{ item.type }}</a>
        </div>
      </div>
      <div class="cityrow" v-for="(item,index) in cityCode" :key="index">
        <div class="title" :id="'anchor-'+index">{{ item.type }}</div>
        <div class="citycontent">
          <div v-for="(item2,index2) in item.content" :key="index2" @click="selectCity(item2)">{{ item2.city }}</div>
        </div>
      </div>
    </div>

    <div class="module nine" v-if="step >= 9">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(9/13)被保人是否开车？<span>(可跳过)</span></div>
          <div class="question" v-if="step == 9">
            <div class="main">
              <div class="radiobox" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <div class="radiowrap">
                    <input type="radio" :id="'car' + index + 2" value=2 v-model="car[index]">
                    <label :for="'car' + index + 2"></label>
                    <label :for="'car' + index + 2">经常</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'car' + index + 1" value=1 v-model="car[index]">
                    <label :for="'car' + index + 1"></label>
                    <label :for="'car' + index + 1">偶尔</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'car' + index + 0" value=0 v-model="car[index]">
                    <label :for="'car' + index + 0"></label>
                    <label :for="'car' + index + 0">从不</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" @click="nine">选好了，继续</div>
            <div class="skip" @click="skip('car')">跳过</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 9">
        <div class="text" v-if="car.length > 0">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ car[index] | skipsF }}<br/></span>
        </div>
        <div class="text" v-else>
          <span>跳过</span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module ten" v-if="step >= 10">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(10/13)被保人是否旅游出行？<span>(可跳过)</span></div>
          <div class="question" v-if="step == 10">
            <div class="main">
              <div class="radiobox" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <div class="radiowrap">
                    <input type="radio" :id="'travel' + index + 2" value=2 v-model="travel[index]">
                    <label :for="'travel' + index + 2"></label>
                    <label :for="'travel' + index + 2">经常</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'travel' + index + 1" value=1 v-model="travel[index]">
                    <label :for="'travel' + index + 1"></label>
                    <label :for="'travel' + index + 1">偶尔</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'travel' + index + 0" value=0 v-model="travel[index]">
                    <label :for="'travel' + index + 0"></label>
                    <label :for="'travel' + index + 0">从不</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" @click="ten">选好了，继续</div>
            <div class="skip" @click="skip('travel')">跳过</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 10">
        <div class="text" v-if="travel.length > 0">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ travel[index] | skipsF }}<br/></span>
        </div>
        <div class="text" v-else>
          <span>跳过</span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module eleven" v-if="step >= 11">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(11/13)被保人是否运动？<span>(可跳过)</span></div>
          <div class="question" v-if="step == 11">
            <div class="main">
              <div class="radiobox" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <div class="radiowrap">
                    <input type="radio" :id="'sports' + index + 2" value=2 v-model="sports[index]">
                    <label :for="'sports' + index + 2"></label>
                    <label :for="'sports' + index + 2">经常</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'sports' + index + 1" value=1 v-model="sports[index]">
                    <label :for="'sports' + index + 1"></label>
                    <label :for="'sports' + index + 1">偶尔</label>
                  </div>
                  <div class="radiowrap">
                    <input type="radio" :id="'sports' + index + 0" value=0 v-model="sports[index]">
                    <label :for="'sports' + index + 0"></label>
                    <label :for="'sports' + index + 0">从不</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" @click="eleven">选好了，继续</div>
            <div class="skip" @click="skip('sports')">跳过</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 11">
        <div class="text" v-if="sports.length > 0">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：{{ sports[index] | skipsF }}<br/></span>
        </div>
        <div class="text" v-else>
          <span>跳过</span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module twelve" v-if="step >= 12">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(12/13)被保人是否有以下不良习惯？<span>(可单选，可多选，可跳过)</span></div>
          <div class="question" v-if="step == 12">
            <div class="main">
              <div class="radiobox" v-for="(item,index) in person" :key="index">
                <div>
                  <div class="family" :class="'family' + item.value"></div>
                  <div class="name">{{ item.value | personF }}</div>
                </div>
                <div>
                  <div class="checkbox">
                    <input type="checkbox" :id="'custom' + index" v-model="customNone[index]" @change="changeNone(index)">
                    <label :for="'custom' + index"></label>
                    <label :for="'custom' + index">没有</label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" :id="'custom' + index + 1" value=1 v-model="custom[index]" :disabled="customNone[index]">
                    <label :for="'custom' + index + 1" :class="{ noselect: customNone[index] }"></label>
                    <label :for="'custom' + index + 1">饮食不规律</label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" :id="'custom' + index + 2" value=2 v-model="custom[index]" :disabled="customNone[index]">
                    <label :for="'custom' + index + 2" :class="{ noselect: customNone[index] }"></label>
                    <label :for="'custom' + index + 2">熬夜</label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" :id="'custom' + index + 3" value=3 v-model="custom[index]" :disabled="customNone[index]">
                    <label :for="'custom' + index + 3" :class="{ noselect: customNone[index] }"></label>
                    <label :for="'custom' + index + 3">喝酒</label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" :id="'custom' + index + 4" value=4 v-model="custom[index]" :disabled="customNone[index]">
                    <label :for="'custom' + index + 4" :class="{ noselect: customNone[index] }"></label>
                    <label :for="'custom' + index + 4">吸烟</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn" @click="twelve">选好了，继续</div>
            <div class="skip" @click="skip('custom')">跳过</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 12">
        <div class="text" v-if="custom[0] !== 0">
          <span v-for="(item,index) in person" :key="index">{{ item.value | personF }}：
            <span v-for="(item2,index2) in custom[index]" :key="index2">{{ item2 | customF }}<span v-if="index2 < custom[index].length - 1">、</span></span><br/>
          </span>
        </div>
        <div class="text" v-else>
          <span>跳过</span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module thirteen" v-if="step >= 13">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">(13/13)请填写您的家庭财务情况<span>(请填写0-9999中的整数，没有请填写0)</span></div>
          <div class="question" v-if="step == 13">
            <div class="main">
              <div>总资产<input type="text" maxlength="4" v-model="asset[0]">万元</div>
              <div>总负债<input type="text" maxlength="4" v-model="asset[1]">万元</div>
              <div>家庭年收入<input type="text" maxlength="4" v-model="asset[2]">万元</div>
            </div>
            <div class="btn" @click="thirteen">选好了，继续</div>
          </div>
        </div>
      </div>
      <div class="right" v-if="step > 13">
        <div class="text">
          <span>总资产：{{ asset[0] }}万/年<br/></span>
          <span>总负债：{{ asset[1] }}万/年<br/></span>
          <span>家庭年收入：{{ asset[2] }}万/年<br/></span>
        </div>
        <div class="photo">
          <img :src="userImg" alt="">
        </div>
      </div>
    </div>

    <div class="module end" v-if="step == 14">
      <div class="left">
        <div class="photo">
          <img src="../../assets/img/decision.png" alt="">
        </div>
        <div class="content">
          <div class="title">完成！为您定制的保险方案已经生成。<span>您可以分享给家人或朋友(您的信息我们将高度保密，请放心)</span></div>
          <div class="question">
            <img src="../../assets/img/dingzhi.jpg" alt="" @click="link">
          </div>
        </div>
      </div>
    </div>

    <!-- 撤销按键 -->
    <div class="revoke" v-if="step > 1 && step < 14 && !loading" @click="sub">返回上一题</div>

    <!-- loading -->
    <div class="spinner" v-if="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
import { Toast, Actionsheet, Loading } from 'vux'
import datePicker from '@/components/DatePicker'
import allPicker from '@/components/AllPicker'
import wx from 'weixin-js-sdk'
export default {
  name: 'DecisionStep',
  components: {
    Toast,
    datePicker,
    allPicker,
    Actionsheet,
    Loading
  },
  data () {
    return {
      show: false,
      mask: false, // 弹出层增加家庭人物
      maskAddPerson: false,
      maskCity: false,
      toastText: '',
      showLoading: false,
      step: 0,
      loading: false,
      userImg: '',
      id: '', // 最后跳转页面需要的ID
      sex: [], // 性别
      person: [], // 人物
      temPerson: [], // 临时人物数据
      personCount: 8, // 增加人物时index的计数
      family: [
        {value: 0, index: 0}, {value: 1, index: 1}, {value: 2, index: 2},
        {value: 3, index: 3}, {value: 4, index: 4}, {value: 5, index: 5},
        {value: 6, index: 6}, {value: 7, index: 7}
      ],
      birth: [], // 出生日期
      jobType: [[
        {text: '室内', value: 0}, {text: '室外普通', value: 1}, {text: '室外复杂', value: 2},
        {text: '学生', value: 3}, {text: '退休', value: 4}, {text: '其它', value: 5}
      ]],
      job: [], // 职业类型
      income: [], // 收入
      budget: [], // 预算
      security: [], // 有无社保
      locationCity: {city: '未开启定位', code: ''}, // 定位的城市
      hotCity: [{city: '北京', code: '110000'}, {city: '上海', code: '310000'}, {city: '广州', code: '440100'},
        {city: '深圳', code: '440300'}, {city: '杭州', code: '330100'}, {city: '南京', code: '320100'},
        {city: '天津', code: '120000'}, {city: '武汉', code: '420100'}, {city: '成都', code: '510100'},
        {city: '重庆', code: '500000'}, {city: '西安', code: '610100'}, {city: '苏州', code: '320500'}],
      cityIndex: '',
      citySame: [false],
      cityCode: [
        {type: 'A',
          content: [
            { code: '340800', city: '安庆', group: 'A' },
            { code: '520400', city: '安顺', group: 'A' },
            { code: '469021', city: '定安县', group: 'A' },
            { code: '410500', city: '安阳', group: 'A' },
            { code: '210300', city: '鞍山', group: 'A' },
            { code: '152900', city: '阿拉善盟', group: 'A' },
            { code: '610900', city: '安康', group: 'A' },
            { code: '513200', city: '阿坝', group: 'A' },
            { code: '542500', city: '阿里', group: 'A' },
            { code: '652900', city: '阿克苏', group: 'A' },
            { code: '654300', city: '阿勒泰', group: 'A' },
            { code: '820000', city: '澳门', group: 'A' }
          ]
        },
        {type: 'B',
          content: [
            { code: '110000', city: '北京', group: 'B' },
            { code: '340300', city: '蚌埠', group: 'B' },
            { code: '620400', city: '白银', group: 'B' },
            { code: '450500', city: '北海', group: 'B' },
            { code: '451000', city: '百色', group: 'B' },
            { code: '520500', city: '毕节', group: 'B' },
            { code: '469025', city: '白沙县', group: 'B' },
            { code: '469029', city: '保亭县', group: 'B' },
            { code: '130600', city: '保定', group: 'B' },
            { code: '220800', city: '白城', group: 'B' },
            { code: '220600', city: '白山', group: 'B' },
            { code: '210500', city: '本溪', group: 'B' },
            { code: '150200', city: '包头', group: 'B' },
            { code: '150800', city: '巴彦淖尔', group: 'B' },
            { code: '371600', city: '滨州', group: 'B' },
            { code: '610300', city: '宝鸡', group: 'B' },
            { code: '511900', city: '巴中', group: 'B' },
            { code: '652800', city: '巴音', group: 'B' },
            { code: '652700', city: '博尔塔拉', group: 'B' },
            { code: '530500', city: '保山', group: 'B' }
          ]
        },
        {type: 'C',
          content: [
            { code: '500000', city: '重庆', group: 'C' },
            { code: '340181', city: '巢湖', group: 'C' },
            { code: '341700', city: '池州', group: 'C' },
            { code: '341100', city: '滁州', group: 'C' },
            { code: '445100', city: '潮州', group: 'C' },
            { code: '451400', city: '崇左', group: 'C' },
            { code: '469026', city: '昌江县', group: 'C' },
            { code: '469023', city: '澄迈县', group: 'C' },
            { code: '130800', city: '承德', group: 'C' },
            { code: '130900', city: '沧州', group: 'C' },
            { code: '430100', city: '长沙', group: 'C' },
            { code: '430700', city: '常德', group: 'C' },
            { code: '431000', city: '郴州', group: 'C' },
            { code: '220100', city: '长春', group: 'C' },
            { code: '320400', city: '常州', group: 'C' },
            { code: '211300', city: '朝阳', group: 'C' },
            { code: '150400', city: '赤峰', group: 'C' },
            { code: '140400', city: '长治', group: 'C' },
            { code: '510100', city: '成都', group: 'C' },
            { code: '540300', city: '昌都', group: 'C' },
            { code: '652300', city: '昌吉', group: 'C' },
            { code: '532300', city: '楚雄', group: 'C' }
          ]
        },
        {type: 'D',
          content: [
            { code: '621100', city: '定西', group: 'D' },
            { code: '441900', city: '东莞', group: 'D' },
            { code: '469007', city: '东方', group: 'D' },
            { code: '460400', city: '儋州', group: 'D' },
            { code: '230600', city: '大庆', group: 'D' },
            { code: '232700', city: '大兴安岭', group: 'D' },
            { code: '210200', city: '大连', group: 'D' },
            { code: '210600', city: '丹东', group: 'D' },
            { code: '371400', city: '德州', group: 'D' },
            { code: '370500', city: '东营', group: 'D' },
            { code: '140200', city: '大同', group: 'D' },
            { code: '510600', city: '德阳', group: 'D' },
            { code: '511700', city: '达州', group: 'D' },
            { code: '532900', city: '大理', group: 'D' },
            { code: '533100', city: '德宏', group: 'D' },
            { code: '533400', city: '迪庆', group: 'D' }
          ]
        },
        {type: 'E',
          content: [
            { code: '420700', city: '鄂州', group: 'E' },
            { code: '422800', city: '恩施', group: 'E' },
            { code: '150600', city: '鄂尔多斯', group: 'E' }
          ]
        },
        {type: 'F',
          content: [
            { code: '341200', city: '阜阳', group: 'F' },
            { code: '350100', city: '福州', group: 'F' },
            { code: '440600', city: '佛山', group: 'F' },
            { code: '450600', city: '防城港', group: 'F' },
            { code: '361000', city: '抚州', group: 'F' },
            { code: '210400', city: '抚顺', group: 'F' },
            { code: '210900', city: '阜新', group: 'F' }
          ]
        },
        {type: 'G',
          content: [
            { code: '623000', city: '甘南', group: 'G' },
            { code: '440100', city: '广州', group: 'G' },
            { code: '450300', city: '桂林', group: 'G' },
            { code: '450800', city: '贵港', group: 'G' },
            { code: '520100', city: '贵阳', group: 'G' },
            { code: '360700', city: '赣州', group: 'G' },
            { code: '640400', city: '固原', group: 'G' },
            { code: '632600', city: '果洛', group: 'G' },
            { code: '511600', city: '广安', group: 'G' },
            { code: '510800', city: '广元', group: 'G' },
            { code: '513300', city: '甘孜', group: 'G' }
          ]
        },
        {type: 'H',
          content: [
            { code: '340100', city: '合肥', group: 'H' },
            { code: '341600', city: '亳州', group: 'H' },
            { code: '341000', city: '黄山', group: 'H' },
            { code: '340600', city: '淮北', group: 'H' },
            { code: '340400', city: '淮南', group: 'H' },
            { code: '441300', city: '惠州', group: 'H' },
            { code: '441600', city: '河源', group: 'H' },
            { code: '451200', city: '河池', group: 'H' },
            { code: '451100', city: '贺州', group: 'H' },
            { code: '460100', city: '海口', group: 'H' },
            { code: '130400', city: '邯郸', group: 'H' },
            { code: '131100', city: '衡水', group: 'H' },
            { code: '410600', city: '鹤壁', group: 'H' },
            { code: '230100', city: '哈尔滨', group: 'H' },
            { code: '231100', city: '黑河', group: 'H' },
            { code: '230400', city: '鹤岗', group: 'H' },
            { code: '420200', city: '黄石', group: 'H' },
            { code: '421100', city: '黄冈', group: 'H' },
            { code: '430400', city: '衡阳', group: 'H' },
            { code: '431200', city: '怀化', group: 'H' },
            { code: '320800', city: '淮安', group: 'H' },
            { code: '211400', city: '葫芦岛', group: 'H' },
            { code: '150100', city: '呼和浩特', group: 'H' },
            { code: '150700', city: '呼伦贝尔', group: 'H' },
            { code: '632300', city: '黄南', group: 'H' },
            { code: '630200', city: '海东', group: 'H' },
            { code: '632800', city: '海西', group: 'H' },
            { code: '632500', city: '海南', group: 'H' },
            { code: '632200', city: '海北', group: 'H' },
            { code: '371700', city: '菏泽', group: 'H' },
            { code: '610700', city: '汉中', group: 'H' },
            { code: '650500', city: '哈密', group: 'H' },
            { code: '653200', city: '和田', group: 'H' },
            { code: '532500', city: '红河', group: 'H' },
            { code: '330100', city: '杭州', group: 'H' },
            { code: '330500', city: '湖州', group: 'H' }
          ]
        },
        {type: 'J',
          content: [
            { code: '620300', city: '金昌', group: 'J' },
            { code: '620900', city: '酒泉', group: 'J' },
            { code: '620200', city: '嘉峪关', group: 'J' },
            { code: '440700', city: '江门', group: 'J' },
            { code: '445200', city: '揭阳', group: 'J' },
            { code: '410800', city: '焦作', group: 'J' },
            { code: '419001', city: '济源', group: 'J' },
            { code: '230800', city: '佳木斯', group: 'J' },
            { code: '230300', city: '鸡西', group: 'J' },
            { code: '421000', city: '荆州', group: 'J' },
            { code: '420800', city: '荆门', group: 'J' },
            { code: '220200', city: '吉林', group: 'J' },
            { code: '360400', city: '九江', group: 'J' },
            { code: '360200', city: '景德镇', group: 'J' },
            { code: '360800', city: '吉安', group: 'J' },
            { code: '210700', city: '锦州', group: 'J' },
            { code: '370100', city: '济南', group: 'J' },
            { code: '370800', city: '济宁', group: 'J' },
            { code: '140500', city: '晋城', group: 'J' },
            { code: '140700', city: '晋中', group: 'J' },
            { code: '330400', city: '嘉兴', group: 'J' },
            { code: '330700', city: '金华', group: 'J' }
          ]
        },
        {type: 'K',
          content: [
            { code: '410200', city: '开封', group: 'K' },
            { code: '530100', city: '昆明', group: 'K' },
            { code: '653100', city: '喀什', group: 'K' },
            { code: '650200', city: '克拉玛依', group: 'K' },
            { code: '653000', city: '克孜勒', group: 'K' }
          ]
        },
        {type: 'L',
          content: [
            { code: '341500', city: '六安', group: 'L' },
            { code: '350800', city: '龙岩', group: 'L' },
            { code: '620100', city: '兰州', group: 'L' },
            { code: '622901', city: '临夏', group: 'L' },
            { code: '621200', city: '陇南', group: 'L' },
            { code: '450200', city: '柳州', group: 'L' },
            { code: '451300', city: '来宾', group: 'L' },
            { code: '520200', city: '六盘水', group: 'L' },
            { code: '469024', city: '临高县', group: 'L' },
            { code: '469028', city: '陵水县', group: 'L' },
            { code: '131000', city: '廊坊', group: 'L' },
            { code: '410300', city: '洛阳', group: 'L' },
            { code: '411100', city: '漯河', group: 'L' },
            { code: '431300', city: '娄底', group: 'L' },
            { code: '220400', city: '辽源', group: 'L' },
            { code: '320700', city: '连云港', group: 'L' },
            { code: '211000', city: '辽阳', group: 'L' },
            { code: '371500', city: '聊城', group: 'L' },
            { code: '371300', city: '临沂', group: 'L' },
            { code: '371200', city: '莱芜', group: 'L' },
            { code: '141000', city: '临汾', group: 'L' },
            { code: '141100', city: '吕梁', group: 'L' },
            { code: '511100', city: '乐山', group: 'L' },
            { code: '510500', city: '泸州', group: 'L' },
            { code: '513400', city: '凉山', group: 'L' },
            { code: '540100', city: '拉萨', group: 'L' },
            { code: '540400', city: '林芝', group: 'L' },
            { code: '530700', city: '丽江', group: 'L' },
            { code: '530900', city: '临沧', group: 'L' },
            { code: '331100', city: '丽水', group: 'L' }
          ]
        },
        {type: 'M',
          content: [
            { code: '340500', city: '马鞍山', group: 'M' },
            { code: '440900', city: '茂名', group: 'M' },
            { code: '441400', city: '梅州', group: 'M' },
            { code: '231000', city: '牡丹江', group: 'M' },
            { code: '510700', city: '绵阳', group: 'M' },
            { code: '511400', city: '眉山', group: 'M' }
          ]
        },
        {type: 'N',
          content: [
            { code: '350900', city: '宁德', group: 'N' },
            { code: '350700', city: '南平', group: 'N' },
            { code: '450100', city: '南宁', group: 'N' },
            { code: '411300', city: '南阳', group: 'N' },
            { code: '320100', city: '南京', group: 'N' },
            { code: '320600', city: '南通', group: 'N' },
            { code: '360100', city: '南昌', group: 'N' },
            { code: '511000', city: '内江', group: 'N' },
            { code: '511300', city: '南充', group: 'N' },
            { code: '542400', city: '那曲', group: 'N' },
            { code: '533300', city: '怒江', group: 'N' },
            { code: '330200', city: '宁波', group: 'N' }
          ]
        },
        {type: 'P',
          content: [
            { code: '350300', city: '莆田', group: 'P' },
            { code: '620800', city: '平凉', group: 'P' },
            { code: '410400', city: '平顶山', group: 'P' },
            { code: '410900', city: '濮阳', group: 'P' },
            { code: '360300', city: '萍乡', group: 'P' },
            { code: '211100', city: '盘锦', group: 'P' },
            { code: '510400', city: '攀枝花', group: 'P' },
            { code: '530800', city: '普洱', group: 'P' }
          ]
        },
        {type: 'Q',
          content: [
            { code: '350500', city: '泉州', group: 'Q' },
            { code: '621000', city: '庆阳', group: 'Q' },
            { code: '441800', city: '清远', group: 'Q' },
            { code: '450700', city: '钦州', group: 'Q' },
            { code: '522600', city: '黔东南', group: 'Q' },
            { code: '522300', city: '黔西南', group: 'Q' },
            { code: '522700', city: '黔南', group: 'Q' },
            { code: '469002', city: '琼海', group: 'Q' },
            { code: '469030', city: '琼中县', group: 'Q' },
            { code: '130300', city: '秦皇岛', group: 'Q' },
            { code: '230200', city: '齐齐哈尔', group: 'Q' },
            { code: '230900', city: '七台河', group: 'Q' },
            { code: '429005', city: '潜江', group: 'Q' },
            { code: '370200', city: '青岛', group: 'Q' },
            { code: '530300', city: '曲靖', group: 'Q' },
            { code: '330800', city: '衢州', group: 'Q' }
          ]
        },
        {type: 'R',
          content: [
            { code: '371100', city: '日照', group: 'R' },
            { code: '540200', city: '日喀则', group: 'R' }
          ]
        },
        {type: 'S',
          content: [
            { code: '310000', city: '上海', group: 'S' },
            { code: '341300', city: '宿州', group: 'S' },
            { code: '350400', city: '三明', group: 'S' },
            { code: '440300', city: '深圳', group: 'S' },
            { code: '440500', city: '汕头', group: 'S' },
            { code: '440200', city: '韶关', group: 'S' },
            { code: '441500', city: '汕尾', group: 'S' },
            { code: '460200', city: '三亚', group: 'S' },
            { code: '130100', city: '石家庄', group: 'S' },
            { code: '411200', city: '三门峡', group: 'S' },
            { code: '411400', city: '商丘', group: 'S' },
            { code: '231200', city: '绥化', group: 'S' },
            { code: '230500', city: '双鸭山', group: 'S' },
            { code: '420300', city: '十堰', group: 'S' },
            { code: '421300', city: '随州', group: 'S' },
            { code: '430500', city: '邵阳', group: 'S' },
            { code: '220300', city: '四平', group: 'S' },
            { code: '220700', city: '松原', group: 'S' },
            { code: '320500', city: '苏州', group: 'S' },
            { code: '321300', city: '宿迁', group: 'S' },
            { code: '361100', city: '上饶', group: 'S' },
            { code: '210100', city: '沈阳', group: 'S' },
            { code: '640200', city: '石嘴山', group: 'S' },
            { code: '140600', city: '朔州', group: 'S' },
            { code: '611000', city: '商洛', group: 'S' },
            { code: '510900', city: '遂宁', group: 'S' },
            { code: '540500', city: '山南', group: 'S' },
            { code: '659001', city: '石河子', group: 'S' },
            { code: '330600', city: '绍兴', group: 'S' }
          ]
        },
        {type: 'T',
          content: [
            { code: '120000', city: '天津', group: 'T' },
            { code: '340700', city: '铜陵', group: 'T' },
            { code: '620500', city: '天水', group: 'T' },
            { code: '520600', city: '铜仁', group: 'T' },
            { code: '469022', city: '屯昌县', group: 'T' },
            { code: '130200', city: '唐山', group: 'T' },
            { code: '429006', city: '天门', group: 'T' },
            { code: '220500', city: '通化', group: 'T' },
            { code: '321200', city: '泰州', group: 'T' },
            { code: '211200', city: '铁岭', group: 'T' },
            { code: '150500', city: '通辽', group: 'T' },
            { code: '370900', city: '泰安', group: 'T' },
            { code: '140100', city: '太原', group: 'T' },
            { code: '610200', city: '铜川', group: 'T' },
            { code: '650400', city: '吐鲁番', group: 'T' },
            { code: '654200', city: '塔城', group: 'T' },
            { code: '331000', city: '台州', group: 'T' }
          ]
        },
        {type: 'W',
          content: [
            { code: '340200', city: '芜湖', group: 'W' },
            { code: '620600', city: '武威', group: 'W' },
            { code: '450400', city: '梧州', group: 'W' },
            { code: '469006', city: '万宁', group: 'W' },
            { code: '469005', city: '文昌', group: 'W' },
            { code: '469001', city: '五指山', group: 'W' },
            { code: '420100', city: '武汉', group: 'W' },
            { code: '320200', city: '无锡', group: 'W' },
            { code: '150900', city: '乌兰察布', group: 'W' },
            { code: '150300', city: '乌海', group: 'W' },
            { code: '640300', city: '吴忠', group: 'W' },
            { code: '371000', city: '威海', group: 'W' },
            { code: '370700', city: '潍坊', group: 'W' },
            { code: '610500', city: '渭南', group: 'W' },
            { code: '650100', city: '乌鲁木齐', group: 'W' },
            { code: '532600', city: '文山', group: 'W' },
            { code: '330300', city: '温州', group: 'W' }
          ]
        },
        {type: 'X',
          content: [
            { code: '341800', city: '宣城', group: 'X' },
            { code: '350200', city: '厦门', group: 'X' },
            { code: '130500', city: '邢台', group: 'X' },
            { code: '411000', city: '许昌', group: 'X' },
            { code: '410700', city: '新乡', group: 'X' },
            { code: '411500', city: '信阳', group: 'X' },
            { code: '420600', city: '襄阳', group: 'X' },
            { code: '429004', city: '仙桃', group: 'X' },
            { code: '420900', city: '孝感', group: 'X' },
            { code: '421200', city: '咸宁', group: 'X' },
            { code: '429021', city: '神农架', group: 'X' },
            { code: '430300', city: '湘潭', group: 'X' },
            { code: '433100', city: '湘西', group: 'X' },
            { code: '320300', city: '徐州', group: 'X' },
            { code: '360500', city: '新余', group: 'X' },
            { code: '152200', city: '兴安盟', group: 'X' },
            { code: '152500', city: '锡林郭勒', group: 'X' },
            { code: '630100', city: '西宁', group: 'X' },
            { code: '140900', city: '忻州', group: 'X' },
            { code: '610100', city: '西安', group: 'X' },
            { code: '610400', city: '咸阳', group: 'X' },
            { code: '532800', city: '西双版纳', group: 'X' },
            { code: '810000', city: '香港', group: 'X' }
          ]
        },
        {type: 'Y',
          content: [
            { code: '441700', city: '阳江', group: 'Y' },
            { code: '445300', city: '云浮', group: 'Y' },
            { code: '450900', city: '玉林', group: 'Y' },
            { code: '469027', city: '乐东县', group: 'Y' },
            { code: '230700', city: '伊春', group: 'Y' },
            { code: '420500', city: '宜昌', group: 'Y' },
            { code: '430600', city: '岳阳', group: 'Y' },
            { code: '430900', city: '益阳', group: 'Y' },
            { code: '431100', city: '永州', group: 'Y' },
            { code: '222400', city: '延边', group: 'Y' },
            { code: '321000', city: '扬州', group: 'Y' },
            { code: '320900', city: '盐城', group: 'Y' },
            { code: '360900', city: '宜春', group: 'Y' },
            { code: '360600', city: '鹰潭', group: 'Y' },
            { code: '210800', city: '营口', group: 'Y' },
            { code: '640100', city: '银川', group: 'Y' },
            { code: '632700', city: '玉树', group: 'Y' },
            { code: '370600', city: '烟台', group: 'Y' },
            { code: '140800', city: '运城', group: 'Y' },
            { code: '140300', city: '阳泉', group: 'Y' },
            { code: '610600', city: '延安', group: 'Y' },
            { code: '610800', city: '榆林', group: 'Y' },
            { code: '511500', city: '宜宾', group: 'Y' },
            { code: '511800', city: '雅安', group: 'Y' },
            { code: '654000', city: '伊犁', group: 'Y' },
            { code: '530400', city: '玉溪', group: 'Y' }
          ]
        },
        {type: 'Z',
          content: [
            { code: '350600', city: '漳州', group: 'Z' },
            { code: '620700', city: '张掖', group: 'Z' },
            { code: '440400', city: '珠海', group: 'Z' },
            { code: '442000', city: '中山', group: 'Z' },
            { code: '440800', city: '湛江', group: 'Z' },
            { code: '441200', city: '肇庆', group: 'Z' },
            { code: '520300', city: '遵义', group: 'Z' },
            { code: '130700', city: '张家口', group: 'Z' },
            { code: '410100', city: '郑州', group: 'Z' },
            { code: '411700', city: '驻马店', group: 'Z' },
            { code: '411600', city: '周口', group: 'Z' },
            { code: '430200', city: '株洲', group: 'Z' },
            { code: '430800', city: '张家界', group: 'Z' },
            { code: '321100', city: '镇江', group: 'Z' },
            { code: '640500', city: '中卫', group: 'Z' },
            { code: '370300', city: '淄博', group: 'Z' },
            { code: '370400', city: '枣庄', group: 'Z' },
            { code: '512000', city: '资阳', group: 'Z' },
            { code: '510300', city: '自贡', group: 'Z' },
            { code: '530600', city: '昭通', group: 'Z' },
            { code: '330900', city: '舟山', group: 'Z' }
          ]
        }
      ],
      city: [[], []], // 居住地
      car: [], // 是否经常开车
      travel: [], // 是否旅行
      sports: [], // 是否运动
      custom: [], // 不良习惯
      customNone: [], // 12问是否禁止checkbox
      asset: [], // 总资产数据
      sureSum: 0 // 提交后获取生成数据的重复执行次数
    }
  },
  mounted () {
    this.axios.get('/api2/getUser').then((res) => {
      this.userImg = res.data.content.img
    })
    this.$nextTick(() => {
      this.getWX()
    })
  },
  methods: {
    add () {
      this.loading = true
      this.step = this.step + 0.5
      setTimeout(() => {
        this.loading = false
        this.step = this.step + 0.5
      }, 1000)
    },
    sub () {
      this.step = this.step - 1
    },
    skip (value) {
      this[value].length = 0
      if (value === 'custom') {
        this.person.forEach((item, index, arr) => {
          this.custom.push(0)
        })
      }
      this.add()
    },
    one () {
      if (this.sex.length === 0) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    addFamily () {
      this.mask = true
      this.maskAddPerson = true
    },
    addDaughter () {
      this.person.push({index: this.personCount, value: 3})
      this.family.push({index: this.personCount, value: 3})
      this.personCount++
      // this.person.push({index: 3, value: 3})
      // this.family.push({index: 3, value: 3})
      this.mask = false
      this.maskAddPerson = false
    },
    addSon () {
      this.person.push({index: this.personCount, value: 2})
      this.family.push({index: this.personCount, value: 2})
      this.personCount++
      // this.person.push({index: 2, value: 2})
      // this.family.push({index: 2, value: 2})
      this.mask = false
      this.maskAddPerson = false
    },
    two () {
      if (this.person.length === 0) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.city = [[], []]
      this.person = this._.orderBy(this.person, 'index')
      this.person.forEach((item, index, arr) => {
        this.city[1][index] = '未开启定位'
        this.temPerson[index] = {value: item.value}
      })
      if (sessionStorage.latitude) {
        this.axios.get('/api2/getLoc', {
          params: {
            location: sessionStorage.latitude + ',' + sessionStorage.longitude
          }
        }).then((res) => {
          this.locationCity.city = res.data.result.ad_info.city
          this.locationCity.code = res.data.result.ad_info.adcode
          this.city[1].forEach((item, index, arr) => {
            this.city[0][index] = this.locationCity.code
            this.city[1][index] = this.locationCity.city
            if (index !== 0) {
              this.citySame[index] = true
            }
          })
        })
      }
      this.add()
    },
    changeBirth (value, index) {
      this.birth[index] = value[0]
    },
    three () {
      if (this.birth.length !== this.person.length || this._.indexOf(this.birth, undefined) !== -1) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    changeJob (value, index) {
      this.job[index] = value[0]
    },
    four () {
      if (this.job.length !== this.person.length || this._.indexOf(this.job, undefined) !== -1) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    five () {
      let p = new Promise((resolve, reject) => {
        this.income.forEach((item, index) => {
          if (!(/^([1-9]\d*|[0]{1,1})$/).test(item) || item < 0 || item > 9999) {
            this.toastText = '请输入正确的金额'
            this.show = true
            this.income[index] = ''
            resolve(false)
            return false
          }
        })
        resolve(true)
      }).then((value) => {
        if (!value) return
        if (this.income.length !== this.person.length || this._.indexOf(this.income, undefined) !== -1) {
          this.toastText = '请先回答完问题哦'
          this.show = true
          return
        }
        this.add()
      })
      return p
    },
    six () {
      let p = new Promise((resolve, reject) => {
        this.budget.forEach((item, index) => {
          if (!(/^([1-9]\d*|[0]{1,1})$/).test(item) || item < 200 || item > 99999) {
            this.toastText = '请输入正确的金额'
            this.show = true
            this.budget[index] = ''
            resolve(false)
            return false
          }
        })
        resolve(true)
      }).then((value) => {
        if (!value) return
        if (this.budget.length !== this.person.length || this._.indexOf(this.budget, undefined) !== -1) {
          this.toastText = '请先回答完问题哦'
          this.show = true
          return
        }
        this.add()
      })
      return p
    },
    seven () {
      if (this.security.length !== this.person.length || this._.indexOf(this.security, undefined) !== -1) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    // 选择城市
    selectCity (city) {
      if (city.city === '未开启定位') return
      this.mask = false
      this.maskCity = false
      this.city[0][this.cityIndex] = city.code
      this.city[1][this.cityIndex] = city.city
      if (parseInt(this.cityIndex) === 0) {
        this.citySame.forEach((item, index, arr) => {
          if (item) {
            this.city[0][index] = city.code
            this.city[1][index] = city.city
          }
        })
      }
    },
    showCitybox (index) {
      if (this.citySame[index]) return
      this.mask = true
      this.maskCity = true
      this.cityIndex = index
    },
    // 跳转锚点
    goAnchor (id) {
      let anchor = this.$el.querySelector(id)
      document.getElementsByClassName('citybox')[0].scrollTop = anchor.offsetTop
    },
    eight () {
      if (this.city[0].length !== this.person.length) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    nine () {
      if (this.car.length !== this.person.length || this._.indexOf(this.car, undefined) !== -1) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    ten () {
      if (this.travel.length !== this.person.length || this._.indexOf(this.travel, undefined) !== -1) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    eleven () {
      if (this.sports.length !== this.person.length || this._.indexOf(this.sports, undefined) !== -1) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    twelve () {
      if (this.custom.length !== this.person.length) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      let tem = true
      this.custom.forEach((item, index) => {
        if (item.length < 1) {
          tem = false
          return false
        }
      })
      if (!tem) {
        this.toastText = '请先回答完问题哦'
        this.show = true
        return
      }
      this.add()
    },
    thirteen () {
      let p = new Promise((resolve, reject) => {
        this.asset.forEach((item, index) => {
          if (!(/^([1-9]\d*|[0]{1,1})$/).test(item) || item < 0 || item > 9999) {
            this.toastText = '请输入正确的金额'
            this.show = true
            this.asset[index] = ''
            resolve(false)
            return false
          }
        })
        resolve(true)
      }).then((value) => {
        if (!value) return
        if (this.asset.length !== 3 || this._.indexOf(this.asset, undefined) !== -1) {
          this.toastText = '请先回答完问题哦'
          this.show = true
          return
        }
        let tem = 0 // 家庭成员收入总和
        this.income.forEach((item, index, arr) => {
          tem += parseInt(item)
        })
        if (this.asset[2] === 0 || this.asset[2] < tem) {
          this.toastText = '家庭年收入必须大于家庭成员收入总和哦'
          this.show = true
          return
        }
        // 组合数组上传数据
        // 更改角色id
        this.temPerson.forEach((item, index, arr) => {
          if (item.value === -2) {
            item.value = 1
            return
          }
          if (item.value === -1) {
            item.value = 2
            return
          }
          if (item.value === 0) {
            item.value = 1
            return
          }
          if (item.value === 1) {
            item.value = 2
            return
          }
          if (item.value === 2) {
            item.value = 8
            return
          }
          if (item.value === 3) {
            item.value = 7
            return
          }
          if (item.value === 4) {
            item.value = 3
            return
          }
          if (item.value === 5) {
            item.value = 4
            return
          }
          if (item.value === 6) {
            item.value = 5
            return
          }
          if (item.value === 7) {
            item.value = 6
          }
        })
        // 不良习惯更改数据
        let temCustom = []
        temCustom = JSON.parse(JSON.stringify(this.custom))
        temCustom.forEach((item, index, arr) => {
          if (item[0] === '0') {
            arr[index] = 0
          } else {
            arr[index] = 1
          }
        })
        // 职业类型暂时不能选择室外复杂
        let temjob = []
        temjob = JSON.parse(JSON.stringify(this.job))
        temjob.forEach((item, index, arr) => {
          if (item === 2) {
            arr[index] = 0
          } else {
            arr[index] = 1
          }
        })
        let answers = []
        answers.push(this.sex, this.temPerson, this.birth, temjob, this.income, this.budget,
          this.security, this.city[0], this.car, this.travel, this.sports, temCustom, this.asset)
        this.axios.post('/api2/Decision/getForm', {
          formData: answers
        }).then(res => {
          this.id = res.data.id
        })
        this.add()
      })
      return p
    },
    // 12问选择没有的时候把数组置空
    changeNone (index) {
      if (this.customNone[index]) {
        this.custom[index] = ['0']
      } else {
        this.custom[index] = []
      }
    },
    sureId () {
      this.showLoading = true
      this.axios.get('/api2/Decision/getResultRoles', {
        params: {
          id: this.id
        }
      }).then(res => {
        if (res.data.code === 0 && res.data.roles.length > 0) {
          this.showLoading = false
          this.$router.push({ name: 'DecisionCase', params: {id: this.id} })
        } else if (res.data.code !== 0 && this.sureSum < 6) {
          setTimeout(() => {
            this.sureSum++
            this.sureId()
          }, 3000)
        } else {
          this.showLoading = false
          this.toastText = '未知的错误'
          this.show = true
        }
      })
    },
    link () {
      this.sureId()
    },
    autoJump (domname) {
      setTimeout(() => {
        let anc = this.$el.querySelector(domname)
        document.getElementById('decisionstep').scrollTop = anc.offsetTop
      }, 100)
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
        this.startWX()
      })
    },
    startWX () {
      wx.config({
        debug: false,
        appId: sessionStorage.appId,
        timestamp: sessionStorage.timestamp,
        nonceStr: sessionStorage.nonceStr,
        signature: sessionStorage.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation']
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation']
        })
        wx.onMenuShareTimeline({
          title: '为您定制 | 为您和家人定制个性化的保障方案。', // 分享标题
          link: '', // 分享链接
          imgUrl: 'https://cdn.aibaodata.com/2017/12/14/logo.jpg'
        })
        // 朋友
        wx.onMenuShareAppMessage({
          title: '为您定制 | 为您和家人定制个性化的保障方案。', // 分享标题
          desc: '全网选保，精准推荐，根据个性化需求，从全市场选择最适合您、最具性价比的产品。', // 分享描述
          link: '', // 分享链接
          imgUrl: 'https://cdn.aibaodata.com/2017/12/14/logo.jpg'
        })
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            sessionStorage.latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            sessionStorage.longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
          }
        })
      })
      wx.error(function (res) {
        console.log(res)
      })
    }
  },
  watch: {
    step (value) {
      switch (value) {
        case 1:
          this.sex = ''
          break
        // 变更主角性别
        case 2:
          this.person = []
          if (this.sex === 'm') {
            this.family[0] = {index: 0, value: 0}
            this.family[1] = {index: 1, value: 1}
          } else {
            this.family[0] = {index: 0, value: -2}
            this.family[1] = {index: 1, value: -1}
          }
          this.autoJump('.two')
          break
        // 获取地理位置
        case 3:
          this.birth = []
          this.autoJump('.three')
          break
        case 4:
          this.job = []
          this.autoJump('.four')
          break
        case 5:
          this.income = []
          this.autoJump('.five')
          break
        case 6:
          this.budget = []
          this.autoJump('.six')
          break
        case 7:
          this.security = []
          this.autoJump('.seven')
          break
        case 8:
          this.autoJump('.eight')
          break
        case 9:
          this.car = []
          this.autoJump('.nine')
          break
        case 10:
          this.travel = []
          this.autoJump('.ten')
          break
        case 11:
          this.sports = []
          this.autoJump('.eleven')
          break
        case 12:
          this.custom.length = 0
          this.person.forEach((item, index, arr) => {
            this.custom.push([])
            this.customNone[index] = false
          })
          this.autoJump('.twelve')
          break
        case 13:
          this.autoJump('.thirteen')
          break
        case 14:
          this.autoJump('.end')
      }
    },
    citySame (value) {
      this.citySame.forEach((item, index, arr) => {
        if (item) {
          this.city[0][index] = this.city[0][0]
          this.city[1][index] = this.city[1][0]
        }
      })
    }
  },
  filters: {
    sexF (value) {
      if (value === 'm') {
        return '先生'
      } else {
        return '女士'
      }
    },
    personF (value) {
      value = parseInt(value)
      switch (value) {
        case -2:
          return '自己'
        case -1:
          return '配偶'
        case 0:
          return '自己'
        case 1:
          return '配偶'
        case 2:
          return '儿子'
        case 3:
          return '女儿'
        case 4:
          return '父亲'
        case 5:
          return '母亲'
        case 6:
          return '伴侣父亲'
        case 7:
          return '伴侣母亲'
      }
    },
    securityF (value) {
      if (value === '1') {
        return '有'
      } else {
        return '无'
      }
    },
    skipsF (value) {
      value = parseInt(value)
      switch (value) {
        case 0:
          return '从不'
        case 1:
          return '偶尔'
        case 2:
          return '经常'
      }
    },
    customF (value) {
      value = parseInt(value)
      switch (value) {
        case 0:
          return '没有'
        case 1:
          return '饮食不规律'
        case 2:
          return '熬夜'
        case 3:
          return '喝酒'
        case 4:
          return '吸烟'
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/global.css';
/* 总体公共样式 */
#decisionstep {
  font-size: var(--m-fs);
  color: var(--d-bgc);
  padding: calc(2 * var(--edge)) var(--edge);
  height: calc(100% - 80px);
  overflow-y: scroll;
}

.module {
  margin-bottom: 50px;
  &.module:after {
    content:"";
    clear:both;
    display:block;
  }
}

.left {
  display: flex;
  & .btn {
    height: 70px;
    line-height: 70px;
    background: linear-gradient(top,#6db7e5,#619ede);
    box-shadow: 0px 2px 16px 0px rgba(119, 177, 234, 0.46);
    border-radius: 100px;
    color: #fff;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}

.content {
  position: relative;
  width: 460px;
  margin-left: 20px;
  padding: 30px;
  background: var(--bgc);
  box-shadow: 0 10px 20px rgba(123,159,195,.2);
  border-radius: 10px;
  text-align: justify;
  &.content:before {
    content: "";
    position: absolute;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #fff;
    top: 0;
    left: -20px;
  }
  & .title {
    line-height: 48px;
    & span {
      font-size: var(--s-fs);
      color: var(--s-bgc);
    }
  }
  & .question {
    margin-top: 40px;
    & .name {
      font-size: var(--s-fs);
    }
  }
  & .family {
    width: 120px;
    height: 120px;
    background-size: 100%;
    border: 1PX solid rgba(102,153,204,.5);
    border-radius: 50%;
    margin-bottom: 10px;
  }
  & .family-2 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/配偶.png');
  }
  & .family-1 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/本人.png');
  }
  & .family0 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/本人.png');
  }
  & .family1 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/配偶.png');
  }
  & .family2 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/儿子.png');
  }
  & .family3 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/女儿.png');
  }
  & .family4 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/爷爷.png');
  }
  & .family5 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/奶奶.png');
  }
  & .family6 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/外公.png');
  }
  & .family7 {
    background-image: url('//cdn.aibaodata.com/2017/12/01/外婆.png');
  }
}

.right {
  float: right;
  margin-top: 50px;
  display: flex;
  & .photo {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
  }
  & .text {
    position: relative;
    max-width: 440px;
    margin-right: 20px;
    background: var(--sky-blue);
    padding: 30px;
    border-radius: 10px;
    color: #fff;
    box-shadow: 0 9px 19px #c1dcf5;
  }
  & .text:after {
    content: "";
    position: absolute;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid var(--sky-blue);
    top: 0;
    right: -20px;
  }
}

.photo {
  & img {
    width: 85px;
    height: 85px;
  }
}

.skip {
  text-align: center;
  color: var(--s-bgc);
}

.revoke {
  width: 70%;
  height: 70px;
  line-height: 70px;
  margin: 0 auto;
  border: 1PX solid var(--sky-blue);
  border-radius: 100px;
  color: var(--sky-blue);
  text-align: center;
}

.main {
  & .picker,& .txt,& .radiobox,& .location {
    text-align: center;
    display: flex;
    align-items: center;
    font-size: var(--s-fs);
    & >div:nth-child(1) {
      flex: 1;
    }
    & >div:nth-child(2) {
      flex: 3;
    }
  }
  & .picker:not(:last-child),
    & .txt:not(:last-child),
    & .radiobox:not(:last-child),
    & .location:not(:last-child) {
    border-bottom: 1PX solid #eee;
    margin-bottom: 40px;
    padding-bottom: 40px;
  }
  & input {
    background: #eee;
    border-radius: 50px;
    border: none;
    width: 60%;
    margin: 0 auto;
    margin-right: 20px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  & input:focus {
    outline: none;
  }
}

#datepicker, #allpicker {
  background: #fe9f9a;
  color: #fff;
  border-radius: 50px;
  width: 70%;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
}

/* 每一个问题单独的样式 */
.zero {
  & .btn {
    border: 1PX solid var(--sky-blue);
    background: #fff;
    color: var(--sky-blue);
    & .icon {
      width: 30px;
      height: 30px;
    }
  }
}

.one {
  & .main {
    display: flex;
    & .sexradio {
      flex: 1;
      text-align: center;
      position: relative;
      & input {
        display: none;
      }
      & label {
        display: block;
        background: #80d5f8;
        color: #fff;
        width: 150px;
        height: 150px;
        line-height: 150px;
        border-radius: 50%;
        margin: 0 auto;
      }
      & input[type=radio]:checked + .i-check {
        background: var(--blue) url("../../assets/img/check.png") center center no-repeat;
        background-size: 50% 40%;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        top: 110px;
        right: 50px;
      }
      & div {
        margin-top: 20px;
      }
    }
    & .sexradio:nth-child(2) label {
      background: #fe9f9a;
    }
  }
}

.two {
  & .question {
    margin-top: 0;
  }
  & .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: center;
    & .checkbox {
      position: relative;
      & label {
        display: block;
        width: 120px;
        height: 120px;
        border: 1PX solid rgba(102,153,204,.5);
        border-radius: 50%;
        margin-top: 30px;
        background-size: 100%;
      }
      & input {
        display: none;
      }
      & input[type=checkbox]:checked + .i-check {
        background: var(--blue) url('../../assets/img/check.png') center center no-repeat;
        background-size: 50% 40%;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        top: 110px;
        right: 0;
      }
      & .familyAdd {
        color: #6699CC;
        opacity: .5;
        line-height: 120px;
      }
    }
  }
}

.seven, .eight, .nine, .ten, .eleven, .twelve {
  & .main {
    text-align: center;
    & .radiobox>div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      flex: 0 0 330px;
    }
    & .radiowrap, & .checkbox {
      display: flex;
      margin-bottom: 20px;
      margin-left: 30px;
      & input[type=radio] + label,
      & input[type=checkbox] + label {
        width: 40px;
        height: 40px;
        border: 1PX solid #eee;
        border-radius: 50%;
        background-size: 100%;
        margin-right: 10px;
      }
      & input {
        display: none;
      }
      & input[type=radio]:checked + label,
      & input[type=checkbox]:checked + label{
        background: var(--blue) url('../../assets/img/check.png') center center no-repeat;
        background-size: 50% 40%;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        top: 110px;
        right: 0;
      }
    }
    & .noselect {
      background: #eee;
    }
  }
}

.eight .main .location > div:nth-child(2) {
  display: flex;
  margin-left: 20px;
  & div:nth-child(1) {
    background: #fe9f9a;
    color: #fff;
    border-radius: 50px;
    width: 170px;
    height: 60px;
    line-height: 60px;
  }
  & div:nth-child(2) {
    margin-top: 10px;
  }
  & .same {
    background: #ccc !important;
  }
}

.thirteen {
  & .main {
    & div {
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
    }
    & input {
      width: 30%;
    }
  }
}

.end .question img {
  width: 100%
}

/* 选择城市的界面 */
.cityLocation {
  display: flex;
  justify-content: space-between;
  z-index: 100;
  position: fixed;
  top: calc(40% - 70px);
  left: 0;
  width: calc(100% - 80px);
  height: 70px;
  line-height: 70px;
  background: #fff;
  font-size: var(--s-fs);
  padding: 0 40px;
  & span {
    color: var(--s-bgc);
    margin-left: -300px;
  }
  & .icon {
    color: var(--s-bgc);
    width: 40px;
    height: 40px;
  }
}
.cityLocation:before {
  content: "";
  position: absolute;
  left: 20px;
  top: 20px;
  width: 5px;
  height: 30px;
  background: var(--blue);
}
.citybox {
  z-index: 100;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #f5f5f5;
  height: 60%;
  width: 100%;
  overflow-y: scroll;
  color: var(--m-bgc);
  & .cityrow {
    font-size: var(--s-fs);
    & .title {
      height: 60px;
      line-height: 60px;
      font-weight: bold;
      text-indent: 40px;
    }
    & .citycontent {
      display: flex;
      flex-wrap: wrap;
      & div,
      & a {
        background: #fff;
        width: calc((100% - 8px) / 3);
        text-align: center;
        height: 60px;
        line-height: 60px;
        margin-bottom: 4px;
        text-decoration: none;
        color: var(--m-bgc);
      }
      & div:nth-child(3n + 2),
      & a:nth-child(3n + 2 ) {
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
}

.confirm {
  position: fixed;
  z-index: 100;
  width: 60%;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  top: 500px;
  left: 20%;
  font-size: var(--m2-fs);
  & .txt {
    margin: 20px 0;
  }
  & .main {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    & .wrap div:nth-child(1){
      width: 120px;
      height: 120px;
      background-size: 100%;
      border: 1PX solid rgba(102,153,204,.5);
      border-radius: 50%;
    }
    & .son {
      background-image: url('//cdn.aibaodata.com/2017/12/01/儿子.png');
    }
    & .daughter {
      background-image: url('//cdn.aibaodata.com/2017/12/01/女儿.png');
    }
  }
}

/* loading样式 */
.spinner {
  margin: -20px auto 0;
  width: 300px;
  text-align: center;
}

.spinner > div {
  width: 20px;
  height: 20px;
  margin-right: 20px;
  background-color: #619ede;
  border-radius: 100%;
  display: inline-block;
  animation: bouncedelay 1s infinite ease-in-out;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
