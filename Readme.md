# 前言

本查询微信小程序界面基于ColorUI<p>
ColorUI Github地址：https://github.com/weilanwl/ColorUI<p>
本Demo使用GPL 3.0授权协议，允许二次修改，可用于商业用途，但必须注明开发者信息。
  
# 体验

微信扫一扫体验本小程序
<p align="center"><img src="https://wx.danns.top/QRCode_Github.jpg"></p>			

# 开始

  1.本Demo带有登录页面和个人中心，不需要可去除。如需使用，请修改/pages/mine/login/login.js 内的获取openid处 请求url 为自己的接口url。此请求页面开发请参照：https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html 。同时，请创建一个页面接受get请求，将请求中的openid写入数据库,并设置初始积分(如需使用个人中心的积分功能则必选)<p>
  2.本Demo预留了微信小程序流量主广告位，不需要可自行去除。如需申请广告位，请参照：https://wximg.qq.com/wxp/pdftool/get.html?post_id=851<p>
  3.本Demo内置百度移动统计，不需要可自行去除。如需使用，请修改 /utils/mtj-wx-sdk.config.js 内的appkey为自己的，appkey申请地址：https://mtj.baidu.com/<p>
  4.首页和个人中心的背景图片请修改对应的wxss内的 UCenter-bg 中的 background-image: 后面的URL （建议使用base64）<p>
  5.查询功能需要后端处理，请根据自己的生产环境自行开发后端查询页面，并修改key.js中的请求url<p>
  6.本Demo对所有请求均进行了签名验证，签名使用MD5加密，请尽量不要删除此功能，避免产生大量的非法请求。同时，别忘了修改js中的MD5密钥。<p>
  7.使用个人中心功能请注意修改mine.js中的请求URL。<p>
  8.个人中心的看视频功能为 微信流量主-激励式视频 开通此功能需要满足一定条件，如不满足条件建议去除此功能。
  
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
    以及
    if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
## 删除激励式视频
    
    删除mine.wxml中的
    <view class="cu-item">
      <view class="content">
        <text class="cuIcon-btn text-green"></text>
        <text class="text-grey">看视频，得积分</text>
      </view>
      <view class="action">
      <form bindsubmit="formSubmit">
        <button class="cu-btn round bg-red shadow" formType="submit">
          <text class="cuIcon-upload"></text> 看视频</button>
          </form>
      </view>
    </view>
    
    删除mine.js中的
    let videoAd = null
    let rewardedVideoAd = null
     if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: ' '
      })
      videoAd.onLoad(() => { })
      videoAd.onError((err) => { })
      videoAd.onClose((res) => {
        if (res && res.isEnded) {
          var userinfo = wx.getStorageSync('userinfo')
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          //console.log("当前时间戳为：" + timestamp); 
          var sza, sz;
          sza = new Array(userinfo,timestamp,yan);
          sz = sza.join("");
          //console.log(sz);
          var md5 = common.hex_md5(sz)
          //console.log(md5);
          wx.request({
            url: ' ',
            data: {
              openid: userinfo,
              md5: md5,
              sj: timestamp
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              //console.log(res.data)
            }
          })
          wx.showModal({
            title: '成功',
            content: '成功获得5积分',
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
    以及
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



