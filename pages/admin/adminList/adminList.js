var mockData=require('./adminListMockData');

Page({
  data:{
    activityList:mockData.activityList
  },
  onLoad:function(options){
    var opt=options;
    wx.setNavigationBarTitle({
      title: "活动管理" //页面标题
    });
    this.setData({
      adminId:opt.adminId
    });
    console.log(this.data.adminId);
  },

  //new click
  newClick:function(){
    wx.navigateTo({
      url:"../adminNew/adminNew"
    });
  },

  //edit click
  editClick:function(e){
    var activityId=e.currentTarget.dataset.activityId;
    console.log(activityId);

  }  
});