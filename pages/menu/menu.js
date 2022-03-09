var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    // 通用
    list: [],
    status: 1,
    receiptList: [],
    orderList: {},
    // 用户
    id: '',
    account: '',
    totall: 0,
    receiptStatus: 0,
    receipt: {
      name: '',
      tel: '',
      address: '',
      receiptIndex: 0,
    },
    // 商家
    menuId: '',
    searchMenus: '',
    setStatus: 0,
    menuSrc: '/img/add.png',
    menuName: '',
    menuValue: '',
    menu: {},
  },
  adjust: function (e) {
    let type = e.currentTarget.dataset.value[0]
    let index = e.currentTarget.dataset.value[1]
    let num = this.data.list[index].num
    let value = this.data.list[index].value
    let totall = this.data.totall
    switch (type) {
      case 0: {
        if (num > 0) {
          this.setData({
            ['list[' + index + ']num']: --num,
            totall: totall - value
          })
        }
        break
      }
      case 1: {
        let inputNum = e.detail.value
        if (inputNum >= 0) {
          this.setData({
            ['list[' + index + ']num']: inputNum,
            totall: totall + (inputNum - num) * value
          })
        }
        break
      }
      case 2: {
        this.setData({
          ['list[' + index + ']num']: ++num,
          totall: totall + value
        })
        break
      }
    }
  },
  changeStatus: function (e) {
    let type = e.currentTarget.dataset.value
    let status = this.data.status
    console.log(type)
    switch (type) {
      case '0': {
        if (status === 1) {
          this.setData({
            status: 2,
          })
        }
        if (status === 2) {
          this.setData({
            status: 1,
          })
        }
        break
      }
      case '1': {
        this.setData({ status: 3 })
        break
      }
      case '2': {
        this.setData({ status: 1 })
        break
      }
      case '3': {
        let self = this
        wx.showModal({
          title: '付款',
          content: '请确认支付',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              self.newOrder()
              self.setData({ status: 1 })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        break
      }
      case '4': {
        this.setData({
          status: 4
        })
        break
      }
    }
  },
  newOrder: function () {
    if (this.data.totall > 0) {
      let list = []
      let time = new Date()
      time = time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getHours() + ':' + time.getMinutes()
      this.data.list.map(item => { if (item.num > 0) { list.push(item) } })
      let newOrder = {
        account: app.globalData.accountRes.account,
        receipt: this.data.receipt,
        totall: this.data.totall,
        time: time,
        list: list,
        status: 0
      }
      db.collection('orderList').add({
        data: newOrder,
        success: function (res) {
          newOrder._id = res._id
          app.globalData.orderList.push(newOrder)
          wx.switchTab({ url: '../orders/orders' })
        }
      })
    }
  },
  changeReceipt: function (e) {
    let type = e.currentTarget.dataset.value[0]
    let index = e.currentTarget.dataset.value[1]
    let receipt = this.data.receiptList[index]
    let receiptList = this.data.receiptList
    switch (type) {
      // 新建地址
      case '0': {
        this.setData({
          receiptStatus: 1,
          receipt: {},
          receiptIndex: "add",
        })
        break
      }
      // 选择
      case '2': {
        this.setData({
          receipt: receipt,
          status: 3
        })
        break
      }
      // 修改
      case '3': {
        this.setData({
          receiptStatus: 1,
          receipt: receipt,
          receiptIndex: index,
        })
        break
      }
      // 删除
      case '4': {
        receiptList.splice(index, 1)
        this.setData({
          receiptList: receiptList,
        })
        break
      }
    }

  },
  receiptFormSubmit: function (e) {
    let receipt = e.detail.value;
    let { name, tel, address } = e.detail.value;
    let receiptList
    if (!name | !tel | !address) {
      this.setData({
        isSubmit: true
      })
      return;
    }
    console.log(this.data.receiptIndex)
    if (this.data.receiptIndex == "add") {
      this.data.receiptList.push(receipt)
      receiptList = this.data.receiptList
    }
    else {
      this.data.receiptList.splice(this.data.receiptIndex, 1, receipt)
      receiptList = this.data.receiptList
    }
    this.setData({
      receipt: receipt,
      receiptList: receiptList,
      receiptStatus: 0,

    })
  },
  merchantOperate: function (e) {
    let value = e.detail.value
    this.setData({
      searchMenus: value
    })
  },
  chooseimg: function () {
    const self = this
    let img = this.data.menu.img
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        let menuSrc = res.tempFiles[0].tempFilePath
        console.log("成功打开文件选择，长度为" + menuSrc)
        if (res.tempFiles[0].size > 0) {
          wx.cloud.uploadFile({
            cloudPath: Date.now() + '.png',
            filePath: menuSrc,
            success: res => {
              console.log(res.fileID)
              self.setData({ menuSrc: res.fileID })
            },
            fail: err => {
              console.log('上传图片失败')
            }
          })
        }
      }
    })
  },
  setmenu: function (e) {
    let setStatus = e.currentTarget.dataset.value
    switch (setStatus) {
      case '0': {
        this.setData({ setStatus: 1, })
        break
      }
      case '1': {
        this.setData({ setStatus: 0, })
        break
      }
    }
  },
  isEditMenu: function (e) {
    let menu = this.data.list[e.currentTarget.dataset.value]
    console.log(menu)
    this.setData({
      menuSrc: menu.src,
      menuName: menu.name,
      menuValue: menu.value,
      menuId: menu._id,
      setStatus: 2,
    })
  },
  changeMenu: function (e) {
    let type = e.currentTarget.dataset.value[0]
    let index = e.currentTarget.dataset.value[1]
    index = index ? index : 0
    let list = this.data.list
    let self = this
    if (type != 2) {
      let menu = {}
      menu.value = this.data.menuValue,
        menu.name = this.data.menuName
      menu.src = this.data.menuSrc
      if (type === 0) {
        db.collection('menu').add({
          data: menu,
          success: function (res) {
            list.push(menu)
            self.setData({ list: list })
            console.log('成功添加')
          }
        })
      }
      if (type === 1) {
        db.collection('menu').doc(self.data.menuId).update({
          data: menu,
          success: function () {
            list.splice(index, 1, menu)
            self.setData({ list: list })
            console.log('成功修改')
          }
        })
      }
      this.setData({
        menuSrc: '/img/add.png',
        menuName: '',
        menuValue: '',
        setStatus: 1,
      })
    }
    else {
      let id = list[index]._id
      db.collection('menu').doc(id).remove({
        success: function () {
          list.splice(index, 1)
          self.setData({ list: list })
          console.log('成功删除')
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    let accountRes = app.globalData.accountRes
    accountRes.isMerchant == 1 ? this.setData({ status: 0 }) : this.setData({ status: 1 })
    // 获取菜单
    db.collection('menu').get({
      success: function (res) {
        if (accountRes.isMerchant) {
          self.setData({ list: res.data })
        }
        else {
          res.data.map(item => {
            item.value = parseInt(item.value)
            item.num = 0
          })
          self.setData({
            list: res.data,
            receiptList: accountRes.receiptList,
            receipt: accountRes.receiptList[0],
            id: accountRes._id,
          })
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
    console.log('show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏")
    let receiptList = this.data.receiptList
    if (JSON.stringify(this.data.receiptList) !== JSON.stringify(app.globalData.accountRes.receiptList)) {
      db.collection('account').doc(this.data.id).update({
        data: {
          receiptList: receiptList
        },
        success: function (res) {
          console.log("成功更新地址")
        }
      })
    }
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