//index.js
const util = require('../../model/util.js')
const Generator = require('../../model/Generator.js')
const generator = new Generator()

//获取应用实例
const app = getApp()

var timeHandler = undefined
var startTime = 0

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // board: genEmptyBoard(),
    board: null,
    current: {
      gridIndex: {
        r: 0,
        c: 0
      },
      cellIndex: {
        r: 0,
        c: 0
      }
    },
    isSolved: false,
    check: false,
    level: 0,
    levels: [
      { name: '非常容易', value: 0, checked: 'true'},
      { name: '容易', value: 1 },
      { name: '中等', value: 2 },
      { name: '困难', value: 3 },
      { name: '非常困难', value: 4 },
    ],
    currentLevel: '非常容易',
    time:'00:00:00',
    startTime: 0,
    isLoading: false
  },
  onCheckChanged: function(e) {
    // console.log('index onCheckChanged() : ', e.detail.value.length)
    this.setData({
      check: e.detail.value.length>0
    })
  },
  onNewGame: function() {
    // console.log('index onNewGame() level: ', this.data.level)
    this.endTime()
    this.setData({
      isLoading: true,
    })
    let game = generator.gen(this.data.level)
    this.setData({
      board: util.toGrid(game),
      isSolved: false,
      time: '00:00:00',
      currentLevel: ['非常容易', '容易', '中等', '困难','非常困难'][this.data.level],
      isLoading: false
    })
    this.startTime()
  },
  startTime: function(){
    if (!timeHandler) {
      startTime = (new Date()).getTime()
      timeHandler = setInterval(()=>{
        this.setData({
            time: util.formatTime((new Date()).getTime() - startTime)
        })
      },300)
    }
  },
  endTime: function() {
    if(timeHandler){
      clearInterval(timeHandler)
      timeHandler = undefined
    }
  },
  onLevelChanged: function(e) {
    // console.log('index onLevelChanged()', e.detail.value)
    this.setData({
      level: e.detail.value
    })
  },
  onSelectCurrent: function (current) {
    // console.log('index onSelectCurrent()', current.detail)
    this.setData({
      current: current.detail
    })
  },
  onSetCellDigit: function (digit) {
    let c = this.data.current
    let cell = this.data.board[c.gridIndex.r][c.gridIndex.c][c.cellIndex.r][c.cellIndex.c]
    if (cell.origin){
      return
    }
    if(digit.detail === 'X'){
      cell.digit = 0  
    }else{
      cell.digit = parseInt(digit.detail)
    }
    let isSolved = this.isSolved()
    if(isSolved){
      this.endTime()
    }
    this.setData({
      board: this.data.board,
      isSolved: isSolved
    })
  },
  isSolved: function(){
    let gridRow, gridCol, r, cell
    for(gridRow in this.data.board){
      for(gridCol in gridRow){
        for(r in gridCol){
          for(cell in r){
            if(cell.digit !== cell.answer){
              return false
            }
          }
        }
      }
    }
    return true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onLoad: function(){
    // console.log('index onLoad()')
    this.onNewGame(0)
  },
  onReady: function() {
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      path: '/pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          mask: true
        })
      },
      fail: function (res) {
       
      }
    }
  }
})
