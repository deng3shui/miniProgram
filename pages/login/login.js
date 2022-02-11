// pages/login/login.js
var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    isMerchant:'',
    account:'',
    password1:'',
    password2:'',
    isLogin:1,
    tip:'',
  },
  checkAccount:function(e){
    if(this.data.account.length===0){
      this.setData({
        tip:'请输入用户名',
      })
    }
    else if (this.data.tip.length===0){
      let self = this
      let isLogin = this.data.isLogin
      let account = this.data.account
      const db = wx.cloud.database()
      db.collection('account').where({
        account: account
      }).get({
        success: function(res) {
          if(isLogin){
            res.data.length===0 ? self.setData({
              tip :'用户名不存在，请重新输入或点此注册',
            }) : console.log(用户名存在)
          }
          else{
            res.data.length===1 ? self.setData({
              tip :'用户名已占有，请重新输入',
            }) : console.log(用户名占用)
          }
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
    this.setData({
      tip : tip
    })
  },
  login:function(){
    let i = (this.data.account.length !==0)&(this.data.password1.length !==0)&(this.data.tip.length===0)
    if(i){
      console.log('验证密码')
      let self = this
      let account = this.data.account
      db.collection('account').where({
        account: account
      }).get({
        success: function(res) {
          console.log('数据库密码'+res.data[0].password)
          console.log('输入密码'+self.data.password1)
          if(res.data[0].password==self.data.password1){
            wx.switchTab({
              url:'../menu/menu',
            })
          }
          else{
            self.setData({tip:'密码错误'})
          }

        }
  })
    }
  },
  isregister:function(){
    this.setData({
      isLogin : 0,
      tip:'',
    })
    console.log(this.data.isLogin)
  },
  checkPassword:function(){
    console.log('检查密码是否相同')
    this.data.password1 === this.data.password2?this.setData({tip:''}):this.setData({tip:'两次密码不同'})
  },
  register:function(){
    if(this.data.tip.length===0){
      db.collection('account').add({
        data: {
          account: 'wxdx',
          password: '123456',
          isMerchant: 0,
          receiptList: [
            {
              name: '迪迦',
              tel: '13093847823',
              address: 'ww3qed'
            },
            {
              name: '赛文',
              tel: '13093847823',
              address: 'ww3qed'
            },
            {
              name: '艾斯',
              tel: '13093847823',
              address: 'ww3qed'
            },
            {
              name: '泰罗',
              tel: '13093847823',
              address: 'ww3qed'
            }
          ]
        },
        success: function(res) {
          console.log(res)
          wx.switchTab({
            url:'../menu/menu',
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isMerchant: app.globalData.isMerchant,
    });
    console.log(this.data.isMerchant)
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
    console.log('页面卸载')
    app.globalData.account = this.data.account
    console.log(app.globalData.account)
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