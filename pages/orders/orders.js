var app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    status : 1,
    receiptStatus:0,
    totall : 0,
    searchMenus : '',
    isDetail : 0,
    order:{},
    orderList:[],
    isMerchant:'',
    customStyle:'height:450rpx;',
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
  deleteOrder:function(e){
    let self = this
    let index = e.currentTarget.dataset.value
    let isShow = (this.data.isMerchant?'merchantIsShow':'userIsShow')
    console.log(this.data.orderList[index]._id)
    db.collection('orderList').doc(this.data.orderList[index]._id).update({
      data: {
        [isShow]: 0
      },
      success: function(res) {
        let userIsShow = 'orderList['+index+'].'+isShow
        self.setData({[userIsShow]:0})
      }
    })
  },
  check:function(e){
    let index = e.currentTarget.dataset.value
    let orderList = 'orderList['+index+'].isChecked'
    this.setData({
      [orderList] : 1,
      customStyle:'height:450rpx;background-color: rgb(253, 229, 233, 0.412);'
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
    this.setData({
      isMerchant: app.globalData.isMerchant,
      orderList: app.globalData.orderList.reverse()
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