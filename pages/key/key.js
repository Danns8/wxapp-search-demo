const app = getApp()
var common = require("../../utils/md5.js"); //引用md5.js进行加密
let interstitialAd = null  // 初始化插屏广告
let yan = "32位密钥"; //MD5 salt值
let tp = "chaxun";
Page({
  onLoad: function (options) {
    // 创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: '插屏广告id'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
  },
  onShow: function () {
    var userinfo = wx.getStorageSync('userinfo')
    //判断用户是否登录
    if (!userinfo) {
      wx.navigateTo({
        url: '/pages/mine/login/login'
      })
    }
  },
  
  data: {},

  //执行点击事件
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value.keyword;
    var userinfo = wx.getStorageSync('userinfo')
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    //生成请求md5密钥
    var sza, sz;
    sza = new Array(userinfo, tp, formData, yan);//加密字符串拼接
    sz = sza.join("");
    console.log(sz);
    var md5 = common.hex_md5(sz)
    console.log(md5);
    //设置休眠时间（可选）
    setTimeout(function () {
      wx.request({
        url: '请求URL',
        data: {
          keyword: formData, //查询关键词
          openid: userinfo, //用户openid
          md5: md5, //请求密钥
          type: tp, //查询类别（可选）
        },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          re: res.data,
        })
        wx.hideLoading();
        //插屏广告弹出
          if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
        
      }
    })
    }, 3000)
  
  },
})