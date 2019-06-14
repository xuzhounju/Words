// pages/episode/episode.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    episode:null,
    dict:[],
    start:true,
    word:0,
    answer:false,
    error:0
  },

  isItemInArray:function (array, item) {
    for(var i = 0; i<array.length; i++) {
  // This if statement depends on the format of your array
      if (array[i][0] == item[0] && array[i][1] == item[1]) {
        return true;   // Found it
      }
    }
    return false;   // Not found
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tag = app.globalData.episode
    
    this.setData({
      episode: app.globalData.episode,
      dict: app.globalData.dict[tag],
      error: 0
    })
    console.log(this.data.dict)
    
    

 
  
  },

  onShow: function () {
    
  
    wx.setStorage({
      key: 'history',
      data: app.globalData.history
    })
    
    wx.setStorage({
      key: 'wrong',
      data: app.globalData.wrong
    })

    
   
  },
 
  primary: function(e){
    this.setData({
      start:false,
      primary:true
    })
  },

  warn: function(e){
    this.setData({
      start:false,
      warn:true
    })
  },

  next: function(e){
    var that=this
    if(this.data.word<this.data.dict.length-1){
      this.setData({
        word:that.data.word+1
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '测试本章单词？',
        success(res) {
          if (res.confirm) {
            that.setData({
              warn:true,
              primary:false,
              word:0
            })
          } else if (res.cancel) {
            wx.navigateBack({
              
            })
          }
        }
      })
    }
  },

  answer: function(e){
    this.setData({
      answer:true
    })
  },

  correct: function(e){
    var that = this
    if (this.data.word < this.data.dict.length-1) {
      this.setData({
        word: that.data.word + 1,
        answer:false
      })

    }
    else{
      if (this.data.error==0){
        app.globalData.history[this.data.episode]=1
        wx.showModal({
          title: '提示',
          content: '恭喜掌握本章单词',
          showCancel: false,
          success(res) {
            wx.navigateBack({
              
            })
          }
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '错了'+that.data.error+'个单词',
          showCancel:false,
          success(res) {
            that.setData({
              start:true,
              primary:false,
              warn:false,
              word:0
            })
          }
        })

      }
    }
  
  },

  wrong: function(e){
    var that = this
    if (this.isItemInArray(app.globalData.wrong, [this.data.episode, this.data.word])){
      console.log('already in')
    }else{
      app.globalData.wrong.push([this.data.episode, this.data.word])
    }
    console.log(app.globalData.wrong)
    if (this.data.word < this.data.dict.length-1) {
      this.setData({
        word: that.data.word + 1,
        answer:false,
        error: that.data.error+1
      })
    }else{
      that.data.error = that.data.error+1
      wx.showModal({
        title: '提示',
        content: '错了' + that.data.error + '个单词',
        showCancel: false,
        success(res) {
          that.setData({
            start: true,
            primary: false,
            warn: false
          })
        }
      })
    }
  },

  voice:function(e){
    console.log('shit')
    var v= wx.createInnerAudioContext()
    v.src ='http://dict.youdao.com/speech?audio=' + this.data.dict[this.data.word][0]
    console.log(v.src)
    v.play()


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