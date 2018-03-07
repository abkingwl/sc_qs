var {getTimeNow,getDateToday}=require('../../../utils/js/util');

Page({
  data:{

    type: ["羽毛球", "聚餐", "游玩"],
    typeIndex: 0,

    place: ["雅戈尔", "启航", "其他"],
    placeIndex: 0

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
    console.log(getTimeNow());
  },

  //type change
  bindTypeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //date change
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
  },
  //time change
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  //place change
  bindPlaceChange: function(e) {
    this.setData({
      placeIndex: e.detail.value
    })
  },
  //count change
  bindCountchange:function(e){
    this.setData({
      count: e.detail.value
    });
    console.log(this.data.count);
  }

});