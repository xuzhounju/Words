//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    history: app.globalData.history,
    mastered:0,
    wrong:app.globalData.wrong.length,
    last: app.globalData.last + 1,
    
  },
  
  onLoad: function (options){
    var mastered=0
    for (var i = 0; i < this.data.history.length; i++) {
      if (this.data.history[i]==1){
        mastered+=1
      }
    }
    this.setData({
      history: app.globalData.history,
      mastered:mastered,
      wrong: app.globalData.wrong.length,
      last: app.globalData.last+1
    })
  },
  
  onShow:function(options){
    this.onLoad()
  }

})
