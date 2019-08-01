<template>
  <div class="goodslist">
    <div class="header">
      <img src="./cloud.jpg" alt class="header-bg" />
      <div class="header-text">Cloud Library</div>
    </div>
    <div class="select-box">
      <Input
        v-model="value1"
        size="large"
        placeholder="large size"
        type="text"
        class="select-item"
        @on-change="onChangeValue(1,$event)"
      >
        <span slot="prepend" class="slot-span">Name:</span>
      </Input>
      <Input
        v-model="value2"
        placeholder="default size"
        type="text"
        class="select-item"
        @on-change="onChangeValue(1,$event)"
      >
        <span slot="prepend" class="slot-span">Model:</span>
      </Input>
      <Button type="primary" class="search-btn" @click="onDoSearch">Search</Button>
    </div>
    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
        <div class="item-cover">
          <img :src="item.pic_url" alt />
        </div>
        <div class="item-name">Name: {{item.name}}</div>
        <div class="item-name">Model: {{item.model}}</div>
        <div class="download-box">
          <!-- <div class="block">
            <img src="./selected.png" alt />
          </div>-->
          <span>Download</span>
        </div>
      </div>
      <div class="pagenation" v-if="total>8">
        <Page
          :total="total"
          show-elevator
          :current="current"
          @on-change="onPageChange"
          :page-size="per_size"
        />
      </div>
    </div>
    <Spin fix v-show="showLoading">
      <Icon type="ios-loading" size="32" class="demo-spin-icon-load"></Icon>
      <div class="loading">Loading</div>
    </Spin>
  </div>
</template>
<script>
import Vue from "vue";
import { Input, RadioGroup, Radio, Page, Spin, Icon, Button } from "iview";
Vue.component("Input", Input);
Vue.component("RadioGroup", RadioGroup);
Vue.component("Radio", Radio);
Vue.component("Page", Page);
Vue.component("Spin", Spin);
Vue.component("Icon", Icon);
Vue.component("Button", Button);
export default {
  data() {
    return {
      defaultValues: ["US", "All", "All"],
      goodsList: [],
      value1: "",
      value2: "",
      current: 1,
      flag: false,
      total: 0,
      per_size: 8,
      showLoading: true
    };
  },
  mounted: function() {
    let _this = this;
    console.log(process.env.API_HOST);
    _this.getData(_this.value1, _this.value2, _this.current);
  },
  methods: {
    onChangeValue: function(index, value) {
      console.log(index, value);
    },
    onDoSearch() {
      let _this = this;
      _this.getData(_this.value1, _this.value2, 1);
    },
    onPageChange: function(page) {
      let _this = this;
      _this.current = page;
      _this.getData(_this.value1, _this.value2, page);
    },
    getData(name, model, page) {
      let _this = this;
      if (_this.flag) return;
      _this.flag = true;
      _this.showLoading = true;
      this.$http
        .post(process.env.API_HOST + "index", {
          name: name,
          model: model,
          page: page,
          pagesize: _this.per_size
        })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 1) {
            _this.goodsList = response.data.data;
            _this.total = response.data.pages.total;
            _this.current = page;
          }
          _this.flag = false;
          _this.showLoading = false;
        });
    }
  }
};
</script>

<style scoped lang="less">
.goodslist {
  width: 800px;
  margin: 0 auto;
  .header {
    width: 100%;
    height: 100px;
    position: relative;
    overflow: hidden;
    .header-bg {
      width: 100%;
    }
    .header-text {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 32px;
      color: #4a60bc;
      font-weight: bold;
      transform: translate(-50%, -50%);
    }
  }
  .select-box {
    .search-input {
      margin: 30px 0;
    }
    .select-item {
      margin: 30px 0;
    }

    .search-btn {
      margin: 0 auto;
      display: block;
    }
    .options-item {
      margin: 20px 0;
      padding: 10px 20px;
      border: 1px solid #515a6e;
      border-radius: 4px;
      display: flex;
      // 修改iview的默认的radios样式
      .ivu-radio-group {
        max-width: 600px;
        label {
          margin: 5px 10px;
        }
      }
      .title {
        width: 100px;
        text-align: right;
        display: inline-block;
        vertical-align: middle;
        font-weight: bold;
        color: black;
        margin-right: 40px;
      }
    }
  }
  .goods-box {
    margin-top: 40px;
    width: 100%;
    // box-sizing: border-box;
    padding: 0 1%;
    .goods-item {
      display: inline-block;
      margin: 10px 1%;
      width: 23%;
      background: white;
      .item-cover {
        width: 100%;
        max-height: 126px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .item-name {
        width: 100%;
        box-sizing: border-box;
        padding: 2px 4px;
        color: black;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .download-box {
        width: 100%;
        height: 30px;
        background: linear-gradient(#efefef, #b6b6b6);
        display: flex;
        align-items: center;
        justify-content: center;
        .block {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: white;
          border: 1px solid #515a6e;
          margin-right: 6px;
          line-height: 16px;
          text-align: center;
          img {
            width: 14px;
            height: 14px;
          }
        }
        span {
          color: black;
        }
      }
    }
    .pagenation {
      margin: 30px;
      text-align: center;
    }
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  .loading {
    margin-top: 10px;
    font-size: 16px;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>

