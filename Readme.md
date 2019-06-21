# 前言
本查询微信小程序界面基于ColorUI<p>
ColorUI Github地址：https://github.com/weilanwl/ColorUI
  
# 体验
微信扫一扫体验本小程序
<p align="center"><img src="https://wx.danns.top/QRCode_Github.jpg"></p>			

# 小程序开发
  ## 开始
  1.本Demo带有登录页面，不需要可去除。如需使用，请修改/pages/mine/login/login.js 内的获取openid处 请求url 为自己的接口url。此请求页面开发请参照：https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html 。同时，请创建一个页面接受get请求，将请求中的openid写入数据库,并设置初始积分(如需使用个人中心的积分功能则必选)<p>
  2.本Demo预留了微信小程序流量主广告位，不需要可自行去除。如需申请广告位，请参照：https://wximg.qq.com/wxp/pdftool/get.html?post_id=851<p>
  3.本Demo内置百度移动统计，不需要可自行去除。如需使用，请修改 /utils/mtj-wx-sdk.config.js 内的appkey为自己的，appkey申请地址：https://mtj.baidu.com/
  ## 如何去除不需要的部分
    ### 登录页面
    删除
  





