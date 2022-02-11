// pages/orders/orders.js
var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    // 通用
    status : 1,
    isMerchant:'',
    receiptList:'',
    // 用户
    id:'',
    account:'',
    totall : 0,
    receiptStatus:0,
    receipt:{
      name:'',
      tel:'',
      address:'' ,
      receiptIndex:0,
    },
    // 商家
    setmenu:1,
    searchMenus : '',
  },
  adjust:function(e){
    let type = e.currentTarget.dataset.value[0]
    let index = e.currentTarget.dataset.value[1]
    let num = this.data.list[index].num
    let value = this.data.list[index].value
    let totall = this.data.totall
    switch(type){
      case 0 :{
        if(num>0){
          this.setData({
            ['list['+index+']num'] : --num,
            totall : totall-value
          })
        }
        break
      }
      case 1 :{
        let inputNum = e.detail.value
    if(inputNum>=0){
      this.setData({
        ['list['+index+']num'] : inputNum,
        totall : totall+(inputNum -  num)*value
      })
    }
        break
      }
      case 2 :{
        this.setData({
          ['list['+index+']num'] : ++num,
          totall : totall+value
        })
        break
      }
    }
  },
  changeStatus:function(e){
    let type = e.currentTarget.dataset.value
    let status = this.data.status
    console.log(type)
    switch(type){
      case '0' :{
        if (status === 1){
          this.setData({
            status : 2,
          })
        }
        if (status === 2){
          this.setData({
            status : 1,
          })
        }
        break
      }
      case '1' :{
        this.setData({
          status : 3
        })
        break
      }
      case '2' :{
        this.setData({
          status : 1
        })
        break
      }
      case '3' :{
        let newOrder =[]
        this.data.list.map(item=>{
          if(item.num>0) newOrder.push(item)
        })
        console.log(newOrder)
                  this.setData({
            status : 1,
          })
    
        wx.switchTab({
          url:'../orders/orders',
        })
        break
      }
      case '4' :{
        this.setData({
          status : 4
        })
        break
      }
    }
  },
  changeReceipt:function(e){
    let type = e.currentTarget.dataset.value[0]
    let index = e.currentTarget.dataset.value[1]
    let receiptStatus = this.data.receiptStatus
    let receipt = this.data.receiptList[index]
    let receiptList = this.data.receiptList
    switch(type){
      // 新建地址
      case '0' :{
        this.setData({
          receiptStatus : 1,
          receipt : {},
          receiptIndex: "add",
        })
        break
      }
      // 选择
      case '2' :{
        this.setData({
          receipt : receipt,
          status : 3
        })
        break
      }
      // 修改
      case '3' :{
        this.setData({
          receiptStatus : 1,
          receipt : receipt,
          receiptIndex: index,
        })
        break
      }
      // 删除
      case '4' :{
        receiptList.splice(index,1)
        this.setData({
          receiptList : receiptList,
        })
        break
      }
    }
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
    if(this.data.receiptIndex == "add" ){

      this.data.receiptList.push(receipt)
      receiptList = this.data.receiptList
    }
    else{
      this.data.receiptList.splice(this.data.receiptIndex,1,receipt)
      receiptList = this.data.receiptList
    }
    this.setData({
      receipt : receipt,
      receiptList : receiptList,
      receiptStatus : 0 ,

    })
  },
  merchantOperate : function (e){
    let type = e.currentTarget.dataset.value[0]
    switch (type){
      // 搜索
      case '0' :{
        let value = e.detail.value
        this.setData({
          searchMenus : value
        })
      }
      // 新增
      case '1' :{
        
      }
      // 删除
      case '2' :{
      }
      // 修改
      case '3' :{
        let index = e.currentTarget.dataset.value[1]
      }
    }
  },
  setDbData:function(){
    const self= this
    db.collection('account').doc(this.data.id).update({
      // data 传入需要局部更新的数据
      data: {
        receiptList: self.data.receiptList
      },
      success: function(res) {
        console.log("成功替换地址")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      list: app.globalData.list,
      account:app.globalData.account
    });
    const self = this
    db.collection('account').where({account : app.globalData.account}).get({
      success:function(res){
        self.setData({
          receiptList: res.data[0].receiptList,
          id:res.data[0]._id,
        })
        if(res.data[0].isMerchant===true){
          self.setData({status:0})
        }
      }
    })
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
    console.log("页面隐藏")
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面卸载")

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