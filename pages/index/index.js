var userinfo = wx.getStorageSync('userinfo')
var avatar = wx.getStorageSync('avatarUrl')
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl : avatar
    },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onLoad: function (options) {
    wx.getUserInfo({
      success: function (res) {
        //console.log(res.userInfo)
        var avatarUrl = res.userInfo.avatarUrl
        wx.setStorageSync('avatarUrl', avatarUrl)
        
      }
    })
  },
  onShow: function () {
    var avatar = wx.getStorageSync('avatarUrl')
    this.setData({
      avatarUrl: avatar
    })
  },
})