// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    isMerchant:'1',
    id:'',
    account:'玛卡巴卡',
    list:[
      {
        src: '/img/a-jitui_huaban1fuben14.png',
        name: '汉堡',
        value:20,
        num:0,
      },
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
      },{
        src: '/img/a-jitui_huaban1fuben3.png',
        name: '甜甜圈',
        value:10,
        num:0,
      },{
        src: '/img/a-jitui_huaban1fuben4.png',
        name: '热狗',
        value:5,
        num:0,
      },{
        src: '/img/a-jitui_huaban1fuben5.png',
        name: '披萨',
        value:30,
        num:0,
      },
    ],
  }
})
