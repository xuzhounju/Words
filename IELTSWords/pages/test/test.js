// pages/episode/episode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    dict: [],
    start: true,
    word: 0,
    answer: false,
    error: 0,
    tags:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      start: true,
      primary:false,
      warn:false,
      dict: app.globalData.dict,
      tags:Array.from(app.globalData.wrong),
      error: 0,
      word:0
    })
    console.log(this.data.start)





  },



  onShow: function () {
    this.onLoad()
    console.log('store')
    wx.setStorage({
      key: 'history',
      data: app.globalData.history
    })

    wx.setStorage({
      key: 'wrong',
      data: Array.from(app.globalData.wrong)
    })

  },

  primary: function (e) {
    this.setData({
      start: false,
      primary: true
    })
  },

  warn: function (e) {
    var tags= this.shuffle(this.data.tags)
    this.setData({
      start: false,
      warn: true,
      tags:tags
    })
  },

  next: function (e) {
    var that = this
    if (this.data.word < this.data.tags.length - 1) {
      this.setData({
        word: that.data.word + 1
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '测试本章单词？',
        success(res) {
          if (res.confirm) {
            that.setData({
              warn: true,
              primary: false,
              answer:false,
              word:0
            })
          } else if (res.cancel) {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        }
      })
    }
  },

  remove: function(e){
    
    var tags =this.data.tags
    var word=this.data.word
    
    app.globalData.wrong.splice(word,1)
    this.setData({
      tags: app.globalData.wrong,
      
    })
    console.log(this.data.word)
    console.log(app.globalData.wrong)
    this.next()
    this.setData({
      word: this.data.word - 1
    })
  
    
    
  },

  answer: function (e) {
    this.setData({
      answer: true
    })
  },

  correct: function (e) {
    var that = this
    if (this.data.word < this.data.tags.length - 1) {
      this.setData({
        word: that.data.word + 1,
        answer: false
      })

    }
    else {
      if (this.data.error == 0) {
        app.globalData.history[this.data.episode] = 1
        wx.showModal({
          title: '提示',
          content: '恭喜掌握所有错词',
          showCancel: false,
          success(res) {
            that.setData({
              start: true,
              primary: false,
              warn: false,
              word:0
            })
          }
        })
      }
      else {
        wx.showModal({
          title: '提示',
          content: '错了' + that.data.error + '个单词',
          showCancel: false,
          success(res) {
            that.setData({
              start: true,
              primary: false,
              warn: false,
              word:0
            })
          }
        })

      }
    }

  },

  wrong: function (e) {
    var that = this
    var word=this.data.word
    console.log(app.globalData.wrong)
    if (this.data.word < this.data.tags.length - 1) {
      this.setData({
        word: that.data.word + 1,
        answer: false,
        error: that.data.error + 1
      })
    } else {
      that.data.error = that.data.error + 1
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

  shuffle:function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while(0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  voice: function (e) {
    console.log('shit')
    var v = wx.createInnerAudioContext()
    var word=this.data.word
    var tag=this.data.tags[word]
    
    v.src = 'http://dict.youdao.com/speech?audio=' + this.data.dict[tag[0]][tag[1]][0]
    console.log(v.src)
    v.play()


  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


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