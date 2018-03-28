var util = require('../../utils/js/util.js');
Page(
  {
    data:{
      activityInfo:{

      },
      timeLeft:'计算中......',
      memberApply:[
        {
          avatar:null,
          name:"阿慧"
        }
      ],
      apply:null

    },
    onLoad:function(options){
      console.log(options);
      var that=this;
      this.setData({
        apply:options.apply
      });

      

      //获取活动详细信息
      //wx.request();
      
      //计算报名倒计时
      var date=new Date("2018-05-20");
      console.log(date)
      var countDown=function(){
        var timeLeft=util.getTimeCountDown(date);
        //console.log(timeLeft)
        that.setData({
          timeLeft:timeLeft
        })
        setTimeout(countDown,1000)
      }
      setTimeout(countDown,1000)
      /*setInterval(function(){
        var timeLeft=util.getTimeCountDown(date);
        that.setData({
          timeLeft:timeLeft
        })
      },1000)*/
      
    },

    //cancel apply
    cancelApply:function(){
      wx.showModal({
        title: '确认取消',
        content: '你是否确定取消本活动的报名？',
        confirmText: "取消报名",
        cancelText: "我再想想",
        success: function (res) {
            console.log(res);
            if (res.confirm) {
                console.log('用户点击取消报名')
                util.showBusy('正在取消......')
                //call cancel
                /*setTimeout(function(){
                  wx.navigateBack({delta:1})
                },2000);*/
                
            }else{
                console.log('用户点击取消')
            }
        }
      });
    }
  }
);