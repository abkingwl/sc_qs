var {getDateToday}=require('../../../utils/js/util');

Page({
  data:{

    type: ["羽毛球", "聚餐", "游玩"],
    typeIndex: 0,

  },
  onLoad:function(){
    //init set
    wx.setNavigationBarTitle({
      title: "新建活动" //页面标题
    });
    this.setData({
      dateStart:getDateToday()
    });

    //test print
    console.log(getDateToday());
  },

  //activityType change
  bindTypeChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      typeIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
      this.setData({
          time: e.detail.value
      })
  },

});