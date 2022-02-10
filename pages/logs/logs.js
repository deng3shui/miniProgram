// pages/menu/menu.js
var app = getApp()
Page({
  data: {
    isMerchant:'',
    list:[],
    newOrder:{},
    searchMenus:'',
    totall:0,
    receiptIndex:0,
    carOpen:0,
    isCheckout:0,
    isDisabled:0,
    isSelectReceipt:0,
    isChangeReceipt:0,
    isAddReceipt:0,
    receipt:{
      name:'迪迦',
      tel:'13093847823',
      address:'ww3qedssssssssssssssssssssssssssssseeeeeeeeeeeeeeeeeeeeeeeeeeeee' ,
    },
    receiptList:[
      {
        name:'迪迦',
        tel:'13093847823',
        address:'ww3qed' ,
      },{
        name:'赛文',
        tel:'13093847823',
        address:'ww3qed' ,
      },{
        name:'艾斯',
        tel:'13093847823',
        address:'ww3qed' ,
      },{
        name:'泰罗',
        tel:'13093847823',
        address:'ww3qed' ,
      },
      
    ]
  },
  add:function(e){
    let index = e.currentTarget.dataset.value
    let num = this.data.list[index].num
    let value = this.data.list[index].value
    let totall = this.data.totall
    this.setData({
      ['list['+index+']num'] : ++num,
      totall : totall+value
    })
  },
  subtract:function(e){
    let index = e.currentTarget.dataset.value
    let num = this.data.list[index].num
    let value = this.data.list[index].value
    let totall = this.data.totall
    if(num>0){
      this.setData({
        ['list['+index+']num'] : --num,
        totall : totall-value
      })
    }
  },
  input:function(e){
    let index = e.currentTarget.dataset.value
    let num = e.detail.value
    let num1 = this.data.list[index].num
    let value = this.data.list[index].value
    let totall = this.data.totall
    if(num>=0){
      this.setData({
        ['list['+index+']num'] : num,
        totall : totall+(num-num1)*value

      })
    }
  },
  search:function(e){
    let value = e.detail.value
    this.setData({
      searchMenus : value
    })
    console.log(this.data.searchMenus)
  },
  clickCar:function(){
    let carOpen = !this.data.carOpen
    this.setData({
      carOpen : carOpen,
    })
  },
  checkout:function(){
    if(this.data.totall>0){
      let carOpen = !this.data.carOpen
      this.setData({
        carOpen : carOpen,
        isCheckout:1
      })
    }
  },
  returncheckout:function(){
    this.setData({
      carOpen : 0,
      isCheckout:0,
    })
  },
  check:function(){
    let newOrder =[]
    this.data.list.map(item=>{
      if(item.num>0) newOrder.push(item)
    })
    console.log(newOrder)
    this.returncheckout()
    wx.switchTab({
      url:'../orders/orders',
    })
  },
  Receipt:function(){
    this.setData({
      isSelectReceipt : 1
    })
  },
  addReceipt:function(){
    this.setData({
      receipt : {},
      isChangeReceipt : 1,
      isAddReceipt : 1,
    })
  },

  seletReceipt:function(e){
    let index = e.currentTarget.dataset.value
    let receipt = this.data.receiptList[index]
    this.setData({
      isSelectReceipt : 0,
      receipt : receipt
    })
    console.log(index)
  },
  changeReceipt:function(e){
    let value = e.currentTarget.dataset.value[0]
    let index = e.currentTarget.dataset.value[1]
    let receipt = this.data.receiptList[index]
    this.data.receiptList[index] = value
    let receiptList = this.data.receiptList[index]
    this.setData({
      receipt : receipt,
      isChangeReceipt : 1,
      receiptIndex : index ,
    })
    console.log(receipt)
  },
  delectReceipt:function(e){
    let index = e.currentTarget.dataset.value
    this.data.receiptList.splice(index,1)
    let receiptList = this.data.receiptList
    this.setData({
      receiptList : receiptList
    })
    console.log(index)
  },
  formSubmit: function (e) {
    let receipt = e.detail.value;
    let { name, tel,address } = e.detail.value;
    let receiptList
    if (!name | !tel |!address) {
      this.setData({
        isSubmit: true
      })
      return;
    }
    console.log(this.data.receiptIndex)
    if(!this.data.isAddReceipt){
      this.data.receiptList.splice(this.data.receiptIndex,1,receipt)
      receiptList = this.data.receiptList
    }
    else{
      this.data.receiptList.push(receipt)
      receiptList = this.data.receiptList
    }
    this.setData({
      receipt : receipt,
      isSelectReceipt : 0,
      isChangeReceipt : 0,
      receiptList : receiptList,
      isAddReceipt : 0,

    })
  },
  /**
   * 生命周期函数--监听页面加
   */
  onLoad: function (options) {
    this.setData({
      isMerchant: app.globalData.isMerchant,
      list : [...app.globalData.list.map(i => ({ 
        src: i.src,
        name: i.name,
        value:i.value,
        num:i.num,
       }))],
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