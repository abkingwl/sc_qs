//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/js/util.js');
var mockData=require("mockData.js");


Page({
    data: {
        userInfo:{},
        activityList:[],
        apply:[],
        logged:false,
        openId:null
        
    },

    onLoad:function(){
        //check user in
        let _openId = wx.getStorageSync('openId')
        this.setData({
            openId:_openId || 0
        })
        console.log(this.data.openId)
        wx.request({
            url: config.service.host+'/weapp/getUserId',
            method: "POST",
            data: {
               openId:this.data.openId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              console.log(res.data)
            }
        })

        this.setData({
            userInfo:mockData.userInfo,
            activityList:mockData.activityList,
        });
        var apply=[];
        this.data.activityList.forEach(element => {
            apply.push((this.data.userInfo.apply.indexOf(element.activityId)!=-1)?1:0);
        });
        this.setData({
            apply:apply
        })
        //console.log("test git");
    },
    //define on pull down refresh close
    /*onPullDownRefresh:function(){
        wx.showNavigationBarLoading() //在标题栏中显示加载
        
        //模拟加载
        setTimeout(function(){
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        },1000);
    },*/

    testClick:function(e){
        var actId=e.currentTarget.dataset.activityId;
        var apply=e.currentTarget.dataset.activityApply;
        wx.navigateTo({
            url:'../activityApply/activityApply?actId='+actId+'&apply='+apply
        });
        //console.log(e.currentTarget.dataset.activityId);
    },
    //admin点击管理活动按钮
    adminClick:function(e){
        wx.navigateTo({
            url: '../admin/adminList/adminList?adminId='+this.data.userInfo.userId
        })
    }
    
});
