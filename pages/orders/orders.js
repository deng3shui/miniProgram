// pages/orders/orders.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status : 1,
    receiptStatus:0,
    totall : 0,
    searchMenus : '',
    isDetail : 0,

    order:{
      receipt:{
        name:'8',
        tel:'88',
        address:'888' ,
      },
      list:[
        {
          src: '/img/a-jitui_huaban1fuben.png',
          name: '奶茶',
          value:25,
          num:0,
      },{
          src: '/img/a-jitui_huaban1fuben16.png',
          name: '冰淇淋',
          value:10,
          num:0,
        },{
          src: '/img/a-jitui_huaban1fuben20.png',
          name: '蛋糕',
          value:15,
          num:0,
        },{
          src: '/img/a-jitui_huaban1fuben21.png',
          name: '巧克力',
          value:10,
          num:0,
        },
      ],
      time: "2021-10-03，12：00",
      totall:345,
      nums:4,
    },
    orderList:[
      {
        receipt:{
            name:'迪迦',
            tel:'13093847823',
            address:'诉愿大道88号南门' ,
        },
        list:[{
            src: '/img/a-jitui_huaban1fuben16.png',
            name: '冰淇淋',
            value:10,
            num:1,
          },{
            src: '/img/a-jitui_huaban1fuben20.png',
            name: '蛋糕',
            value:15,
            num:1,
          },{
            src: '/img/a-jitui_huaban1fuben21.png',
            name: '巧克力',
            value:10,
            num:1,
          },
        ],
        time: "2021/10/03 12：00",
        totall:35,
        nums:3,
      },
    ]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isMerchant: app.globalData.isMerchant,
      list: app.globalData.list,
    });
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