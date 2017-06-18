//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    city: '北京',
    startData: '从哪儿出发',
    endData: '要去哪儿',
    address: '同城街',
    condition: true,
    start: false,
    end: false,
    isShow: false,
    isTrue: false,
    isInquiry: false,
    city: "深圳市",
    inputData: "", //search页面输入框的数据
    array: [],
    arrays: []
  },
  /**
   *  函数名：findEvent
   *  功能：当点击主页查询按钮时，
   *  如果起点和终点没有数据的话,需要提示请输入地点
   *  如果有起点和终点的话，需要隐藏主页，显示新的页面(提供路线的页面)
   */
  findEvent: function(){
    let _this = this;
    console.log(this.data.array.length);
    if( this.data.array.length > 0 && this.data.arrays.length > 0){
      _this.setData({
        condition: false,
        isInquiry: true,
      })
    }else{
      wx.showLoading({
        title: '请选择地点',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }
  },
  /**
   *  函数名：startEvent
   *  功能：主页面模块隐藏
   *       起点页面显示
   */
  startEvent: function(){
    //console.log("aa");
    //console.log(this);
    this.setData({
      condition: false,
      start: true,
      
    })
  },
  /**
   *  函数名：endEvent
   *  功能： 主页面模块隐藏
   *        终点页面显示
   */
  endEvent: function(){
    //console.log("bb");
    this.setData({
      condition: !this.data.condition,
      end: !this.data.end
    })
  },
  /**
   *  函数名：startDeleteEvent
   *  功能：点击起点输入框中的back按钮返回到主页面
   *       
   */
  startBackEvent: function(){
    this.setData({
      condition: true,
      start: false,
      isShow: false
    })
  },
  /**
   *  函数名：endBackEvent
   *  功能：点击终点输入框中的back按钮终返回主页面
   * 
   */
  endBackEvent: function(){
    //console.log("endDeleteEvent");
    this.setData({
      condition: true,
      end: false
    })
  },
  /**
   *  函数名：startInputEvent
   *  功能： 在请输入起点框中输入内容时，触发此函数
   */
  startInputEvent: function(e){
    console.log("startInputEvent");
    var _this = this;
    let data = e.detail.value;
    //console.log("data",data);
    this.setData({
      isShow: true,
    })
    wx.request({
      url: "https://w.mapbar.com/search2015/search/keywords",
      data: {
        keywords: data,
        city: 110000
      },
      method: 'GET',
      success: function(res){
        console.log(res.data.pois);
        //console.log(res.data.pois[0].city);
        _this.setData({
          array: res.data.pois
        })
      },
      fail: function(){
        console.log("请求失败");
      }
    })
  },
  /**
   *  函数名：endInputEvent
   *  功能：在请输入终点框中输入内容时触发此函数
   */
  endInputEvent: function(e){
    console.log("endInputEvent");
    var _this = this;
    let data = e.detail.value;
    console.log(data);
    this.setData({
      isTrue: true,
    })
    wx.request({
      url: 'https://w.mapbar.com/search2015/search/keywords',
      data: {
        keywords: data,
        city: 110000
      },
      method: 'GET',
      success: function(res){
        //console.log(res);
        _this.setData({
          arrays: res.data.pois
        })
      },
      fail: function(){
        console.log("请求失败！");
      }
    })
  },
  /*
   *  函数名：startItemEvent
   *  功能： 点击渲染到的每一项，然后替换起点里面的值
   *  遇到的问题：
   *  1.怎么样获取每一项的值，然后改变起点的位置
   *  用 data-index = {{index}}
   *  2.如何才能获取我点击那一项对应的值
   *  获取i
   *  var i = e.target.dataset.index;
   *  不懂的话可以打出e看是什么东西
   *  
  */
  startItemEvent: function(e){
    console.log(e);
    var i = e.target.dataset.index;
    var itemList = this.data.array;
    console.log("itemList",itemList[i].name);
    var startItemData = itemList[i].name;
    this.setData({
      isShow: false,
      start: false,
      condition: true,
      startData: startItemData
    })
  },
  /**
   *  函数：endItemEvent
   *  功能：当点击渲染出来的每一项时，让去哪儿改变数据
   */
  endItemEvent: function(e){
    console.log(e);
    var i = e.target.dataset.index;
    var itemList = this.data.arrays;
    console.log("itemList", itemList[i].name);
    var endItemData = itemList[i].name;
    this.setData({
      condition: true,
      end: false,
      isTrue: false,
      endData: endItemData
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  testEvent: function(){
    wx.navigateTo({
      url: "/pages/test/test"
    })
  },
  onLoad: function () {
    console.log('onLoad')
    //console.log(this);
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
