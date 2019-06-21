# 前言

本查询微信小程序界面基于ColorUI<p>
ColorUI Github地址：https://github.com/weilanwl/ColorUI
  
# 体验

微信扫一扫体验本小程序
<p align="center"><img src="https://wx.danns.top/QRCode_Github.jpg"></p>			

# 开始

  1.本Demo带有登录页面和个人中心，不需要可去除。如需使用，请修改/pages/mine/login/login.js 内的获取openid处 请求url 为自己的接口url。此请求页面开发请参照：https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html 。同时，请创建一个页面接受get请求，将请求中的openid写入数据库,并设置初始积分(如需使用个人中心的积分功能则必选)<p>
  2.本Demo预留了微信小程序流量主广告位，不需要可自行去除。如需申请广告位，请参照：https://wximg.qq.com/wxp/pdftool/get.html?post_id=851<p>
  3.本Demo内置百度移动统计，不需要可自行去除。如需使用，请修改 /utils/mtj-wx-sdk.config.js 内的appkey为自己的，appkey申请地址：https://mtj.baidu.com/
  4.首页和个人中心的背景图片请修改对应的wxss内的 UCenter-bg 中的 background-image: 后面的URL （建议使用base64）
  5.查询功能需要后端处理，请自行开发后端查询页面。
  
# 如何去除不需要的部分

## 登录页面和个人中心
    
      删除mine目录及目录下所有文件，并删除app.json内
      "pages/mine/mine",
      "pages/mine/login/login"
      同时需要删除首页的
      <view class="cu-item arrow">
      <navigator class="content" url="/pages/mine/mine" hover-class="none">
        <image src="{{avatarUrl}}" class="png" mode="aspectFit" class='circle'></image>
        <text class="text-grey">个人中心（获得积分）</text>
      </navigator>
    </view>
    以及所有js文件中下列代码
    var userinfo = wx.getStorageSync('userinfo')
    var avatar = wx.getStorageSync('avatarUrl')
    if (!userinfo) {
      wx.navigateTo({
        url: '/pages/mine/login/login'
      })
    }
    
## 百度移动统计

    删除/utils/mtj-wx-sdk.config.js和/utils/mtj-wx-sdk.js
    删除app.js中的 
    const mtjwxsdk = require("./utils/mtj-wx-sdk.js");
    
## 广告位
banner:

    删除index.wxml和key.wxml中的
    <ad unit-id=" "></ad>
    
插屏广告：
    
    删除key.js中的
    let interstitialAd = null
    
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: ' '
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
    




