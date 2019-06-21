const app = getApp()
//初始化激励式视频
let videoAd = null
let rewardedVideoAd = null
var avatar = wx.getStorageSync('avatarUrl')
var common = require("../../utils/md5.js"); //引用md5.js进行加密
let yan = "32位密钥"; //MD5 salt值
Page({
  data: {
    avatarUrl: avatar,
    refresh: 0
  },
  onLoad: function () {
    // 创建激励式视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: '激励式视频广告位id'
      })
      videoAd.onLoad(() => { })
      videoAd.onError((err) => { })
      videoAd.onClose((res) => {
        if (res && res.isEnded) {
          var userinfo = wx.getStorageSync('userinfo')
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          console.log("当前时间戳为：" + timestamp); 
          var sza, sz;
          sza = new Array(userinfo,timestamp,yan);
          sz = sza.join("");
          console.log(sz);
          var md5 = common.hex_md5(sz)
          console.log(md5);
          wx.request({
            url: '请求url',
            data: {
              openid: userinfo, //用户openid
              md5: md5, //请求密钥
              sj: timestamp //时间戳
            },
            header: {
              'content-type': 'application/json' 
            },
            success: function (res) {
            console.log(res.data)
            }
          })
          wx.showModal({
            title: '成功',
            content: '成功获得X积分',
            showCancel: false,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '中途退出没有积分哦',
            showCancel: false,
          })
        }
       })
    }
  },
  formSubmit: function (e) {
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
            wx.showModal({
              title: '对不起',
              content: '暂时没有适合您的视频，请稍后再试。',
              showCancel: false,
            })
          })
      })
    } 
  },
  refresh() {
    var that = this;
    var userinfo = wx.getStorageSync('userinfo')
    var avatar = wx.getStorageSync('avatarUrl')
    var szb, szc;
    szb = new Array(userinfo, yan);
    szc = szb.join("");
    //console.log(sz);
    var md = common.hex_md5(szc)
    //console.log(md5)
    that.setData({
      avatarUrl: avatar
    })
    wx.showLoading({
      title: '查询积分中',
      icon: 'loading'
    })
    wx.request({
      url: '请求url',
      data: {
        openid: userinfo, //用户openid
        md5: md //请求密钥
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        that.setData({
          re: res.data,
        })
        wx.hideLoading();
      }
    })
  },
  onShow: function () 
  {
    var userinfom = wx.getStorageSync('userinfo')
    var avatar = wx.getStorageSync('avatarUrl')
    //判断用户是否登录
    if (!userinfom) {
      wx.navigateTo({
        url: '/pages/mine/login/login'
      })
    }
  }
})