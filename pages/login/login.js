// pages/login/login.js
var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    // input
    account:'',
    password1:'',
    password2:'',
    accountRes:{},
    isLogin:1,
    tip:'',
  },
  checkAccount:function(e){
    if(this.data.account.length===0 & this.data.tip.length==0){
      this.setData({ tip:'请输入用户名'})
    }
    else if (this.data.tip.length===0){
      let self = this
      let isLogin = this.data.isLogin
      let account = this.data.account
      db.collection('account').where({account: account}).get({
        success: function(res) {
          if(isLogin) res.data.length===0 ? self.setData({tip :'用户名不存在，请重新输入或点此注册' }) : self.setData({accountRes : res.data[0]})
          else res.data.length===1 ? self.setData({tip :'用户名已占有，请重新输入'}) : 0
        }
      })
  } 
},
  checkLength:function(e){
    let min = e.currentTarget.dataset.value[0]
    let max = e.currentTarget.dataset.value[1]
    let length = e.detail.value.length
    let tip
    (length < min)|(length > max )? tip='请输入'+min+'到'+max+'之间的长度' : tip=''
    this.setData({ tip : '' })
  },
  isregister:function(){
    this.setData({
      isLogin : 0,
      tip:'',
    })
  },
  checkPassword:function(){
    if(this.data.tip.length==0)this.data.password1 === this.data.password2?this.setData({tip:''}):this.setData({tip:'两次密码不同'})

  },
  login:function(){
    if((this.data.account.length !==0)&(this.data.password1.length !==0)&(this.data.tip.length===0)){
      if(this.data.password1 == this.data.accountRes.password){
        app.globalData.accountRes = this.data.accountRes
            wx.switchTab({url:'../menu/menu',})
      }
      else this.setData({tip:'密码错误'})
    }
  },
  register:function(){
    if(this.data.tip.length===0){
      let data = {
        account:this.data.account,
        password:this.data.password1,
        isMerchant: 0,
        receiptList:[]
      }
      db.collection('account').add({
        data: data,
        success: function(res) {
          data._id = res._id
          app.globalData.accountRes = data
          wx.switchTab({url:'../menu/menu',})
        }
      })
    }
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
    console.log('页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('login页面卸载')
    // 商家订单
    if(this.data.accountRes.isMerchant)
    {
      db.collection('orderList').get({
        success: function(res) {
          app.globalData.orderList = res.data
        }
      })
    }
        // 顾客订单
    else
    {
      db.collection('orderList').where({account : this.data.account}).get({
      success: function(res) {
        res.data.map(item=>{
          let nums = 0
          item.list.map(item1=>{ nums += item1.num })
          item.nums = nums
        })
        app.globalData.orderList = res.data
      }
    })}
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