var {getTimeNow,getDateToday,arrayContains,getArrayIndex,arrayToString}=require('../../../utils/js/util');
var utilAll=require('../../../utils/js/util');

const enStr=['type','date','startTime','endTime','place','count','cost'];
const chStr=['活动类型','活动日期','开始时间','结束时间','活动地点','人数限制','费用'];
Page({
  data:{


    types: ["羽毛球", "聚餐", "游玩"],
    typeIndex: 0,
    type: "羽毛球",

    startTime:"19:00",
    endTime:"22:00",

    places: ["雅戈尔", "启航", "其他"],
    placeIndex: 0,
    place: "雅戈尔",

    count:16,

    cost:0,

    memo:'',
    memoLength:0,

    errors:''

  },
  onLoad:function(){
    //init set
    wx.setNavigationBarTitle({
      title: "新建活动" //页面标题
    });
    this.setData({
      date:getDateToday()
    });

    //test print
    //console.log(enStr);
    //console.log(getDateToday());
    //console.log(getTimeNow());
  },
  //child component trigger
  listenAtComponent:function(e){
    this.setData({
      count:e.detail.countNumber
    });
  },

  //type change
  bindTypeChange: function(e) {
    var _types=this.data.types;
    this.setData({
      typeIndex: e.detail.value,
      type:_types[e.detail.value]
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
    var _places=this.data.places;
    this.setData({
      placeIndex: e.detail.value,
      place:_places[e.detail.value]
    })
  },
  //count change
  bindCountChange:function(e){
    this.setData({
      count: e.detail.value
    });
  },
  //cost change
  bindCostChange:function(e){
    this.setData({
      cost: e.detail.value
    });
  },
  //memo change
  calcMemo:function(e){
    var len=e.detail.value.length;
    this.setData({
      memoLength:len
    });
  },
  bindMemoChange:function(e){
    this.setData({
      memo: e.detail.value
    });
  },

  //confirm
  confirmToAdd:function(){
    console.dir(this.data);
    utilAll.showBusy('正在发布......')
    setTimeout(function(){
      wx.navigateBack({
        delta:1
      })
    },2000);
  },


  //validate
  validate:function(){
    console.log("v in");
    var errorItem=[];
    for (var key in this.data){
      if(arrayContains(enStr,key) && this.data[key]==null){
        errorItem.push(chStr[getArrayIndex(enStr,key)]);
      }
    };
    console.log(errorItem);
    return errorItem;
  },

  //show top tips
  showTopTips: function(){
    var that = this;
    var errorItem=this.validate();
    var errorString=arrayToString(errorItem);
    if (errorItem.length==0){
      return;
    }else{
      console.log("error in");
      this.setData({
        errors:errorString
      });
    }
    this.setData({
        showTopTips: true
    });
    setTimeout(function(){
        that.setData({
            showTopTips: false
        });
    }, 3000);
  },


});