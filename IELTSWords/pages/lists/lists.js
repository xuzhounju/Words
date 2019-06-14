// pages/lists/lists.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47','48'],
    history:app.globalData.history

  },
  detailTap:function(e){
    console.log(e.currentTarget.dataset.id)
    app.globalData.episode = e.currentTarget.dataset.id
    app.globalData.last = app.globalData.episode 
    console.log(app.globalData.episode)
    wx.setStorage({
      key: 'last',
      data: app.globalData.episode 
    })
    wx.navigateTo({
      url: '../episode/episode',
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
    console.log(app.globalData.history)
    this.setData({
      history: app.globalData.history
    })
    wx.setStorage({
      key: 'history',
      data: app.globalData.history
    })

    wx.setStorage({
      key: 'wrong',
      data: app.globalData.wrong
    })

   
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