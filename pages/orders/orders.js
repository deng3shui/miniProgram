var app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    receiptStatus:0,
    totall : 0,
    searchMenus : '',
    isDetail : 0,
    order:{},
    orderList:[],
    isMerchant:'',    
  },
  showDetail:function(e){
    let order = e.currentTarget.dataset.value
    this.setData({
      order : order,
      isDetail : 1,
    })
  },
  displayDetail:function(e){
    this.setData({
      isDetail : 0,
    })
  },
  
  changeStatus:function(e){
    let self = this
    let index = e.currentTarget.dataset.value[0]
    let type = e.currentTarget.dataset.value[1]
    let status = this.data.orderList[index].status
    let i = 'orderList['+index+'].status'
    type !==3 ? db.collection('orderList').doc(this.data.orderList[index]._id).update({
      data: {
        status: type
      },
      success: function(res) {
        self.setData({[i]:type})
      }
    }):
    db.collection('orderList').doc(this.data.orderList[index]._id).remove({
      success: function(res) {
        self.setData({[i]:4})
      }
    })
    
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
    let orderList = app.globalData.orderList.reverse()
    console.log(app.globalData.accountRes)
    this.setData({
      isMerchant: app.globalData.accountRes.isMerchant,
      orderList: orderList,
    });
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