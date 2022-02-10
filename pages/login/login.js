// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    password2:'',
    password2:'',
    isRegistered:0,
    tip:'',
  },
  checkAccount:function(e){
    let account = e.detail.value
    let length = 0
    if(this.isRegistered ===1){
      if(account.length<4)
      {
        this.setData({
          tip : '输入用户名过短'
        })
      }
      else (account.length>10)
      {
        this.setData({
          tip : '输入用户名过长'
        })
      }
    }
    else
    {    
      const db = wx.cloud.database()
      db.collection('account').where({
        account : account
      }).get({
        complete: function(res) {
          length = res.data.length
        },
      })
      console.log(length)

      this.setData({
        tip : ''
      })
    }
  },
  checkLength:function(e){
    // let min = 
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})