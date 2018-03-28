//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/js/util.js');
var mockData=require("mockData.js");

Page({
    data: {},

    onShow:function(){
        let that=this
        console.log("index: onshow")
        //获取userId,actApply,isAdmin，如果为首次登录，则创建用户
        let _uid_act=new Promise((resolve,reject)=>{
            wx.request({
                url: config.service.host+'/weapp/getUserId',
                method: "POST",
                data: {
                    openId:this.data.openId
                },
                success: function(res) {
                    resolve(res)
                },
                fail: function(err) {
                    reject(err)
                }
            })
        })

        //获取actList
        var _actList=new Promise((resolve,reject)=>{
            wx.request({
                url: config.service.host+'/weapp/getActivityList',
                success:res=>{
                    resolve(res)
                },
                fail:err=>{
                    reject(err)
                }
            })
        })


        Promise.all([_uid_act,_actList]).then(res=>{
            console.log(res)
            let userId=res[0].data.user_id
            let isAdmin=res[0].data.isAdmin
            let act=res[0].data.activityApply
            let actList=res[1].data
            let apply=[]
            for(var i=0; i<actList.length; i++){
                apply.push(act.indexOf(actList[i]['activity_id'])!=-1?1:0)
            }
            that.setData({
                userId:userId,
                act:act,
                activityList:actList,
                apply:apply,
                isAdmin:isAdmin
            })
        }).catch(err=>{
            console.log("error:"+err)
        })
    },

    onLoad:function(){
        console.log("index: onload")

        //从localstorage获得当前微信用户的openId
        let that=this
        let _openId = wx.getStorageSync('openId')
        this.setData({
            openId:_openId || 0
        })

        
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
