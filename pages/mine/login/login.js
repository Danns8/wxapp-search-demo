const app = getApp()
var common = require("../../../utils/md5.js");
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  bindGetUserInfo(res) {
    let info = res;
    console.log(info);
    if (info.detail.userInfo) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.showLoading({
              title: '登录中',
              icon: 'loading'
            })
            //获取用户openid
            wx.request({
              url: '请求url' + res.code,
              data: res.code,
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data)
                let userid = res.data.openid;
                let yan = "32位密钥"; 
                var sza, sz;
                sza = new Array(userid,yan);
                sz = sza.join("");
                //console.log(sz);
                var md5 = common.hex_md5(sz) 
                //console.log(md5);
                wx.setStorageSync('userinfo', userid)
                //向数据库写入用户openid
                wx.request({
                  url: '请求url',
                  data: {
                      openid: userid, //用户openid
                      md5: md5 //请求密钥
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                  console.log(res.data)
                  }
                })
                wx.hideLoading();
                wx.navigateTo({
                  url: '/pages/index/index'
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '授权失败，请重启小程序再尝试',
              showCancel: false,
            })
          }
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '需要授权才能使用小程序',
        showCancel: false,
      })
    }
  }
})