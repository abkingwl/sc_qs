//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/js/util.js');
var mockData=require("mockData.js");

var wxRequestPromise=util.wxPromisify(wx.request)


Page({
    data: {
        userInfo:{},
        activityList:[],
        userApply:[],
        apply:[],
        logged:false,
        openId:null
        
    },

    onLoad:function(){
        //check user in
        let that=this
        let _openId = wx.getStorageSync('openId')
        this.setData({
            openId:_openId || 0
        })
        //console.log(this.data.openId)
        
        //获取用户id，如果为首次登录，则创建用户
        wxRequestPromise({
            url: config.service.host+'/weapp/getUserId',
            method: "POST",
            data: {
               openId:this.data.openId
            },
            header: {
                'content-type': 'application/json'
            }
        }).then(res=>{
            //console.log(res.data)
            let userId=res.data.user_id
            //console.log(userId)
            wxRequestPromise({url: config.service.host+'/weapp/getUserActivityApply',
            method: "POST",
            data: {
               userId:userId
            },
            header: {
                'content-type': 'application/json'
            }}).then(res=>{
                console.log(JSON.stringify(res.data))
                if(!res) return
                let act=util.stringToArray(res.data.activityApply)
                that.setData({
                    userApply:act
                },function(){
                    let apply=[];
                    that.data.activityList.forEach(element => {
                        apply.push((that.userApply.indexOf(element.activityId)!=-1)?1:0);
                    });
                    that.setData({
                        apply:apply
                    })
                })
            }).catch(err=>{

            })
            that.setData({
                logged:true
            })
        }).catch(err=>{
            console.log("error:"+err)
        })

        // wx.request({
        //     url: config.service.host+'/weapp/getUserId',
        //     method: "POST",
        //     data: {
        //        openId:this.data.openId
        //     },
        //     header: {
        //         'content-type': 'application/json'
        //     },
        //     success: function(res) {
        //       console.log(res.data)
        //       that.setData({
        //           logged:true
        //       })
        //     },
        //     fail:function(err){
        //         console.log("error:"+err)
        //     }
        // })

        this.setData({
            userInfo:mockData.userInfo,
            activityList:mockData.activityList,
        });
        // var apply=[];
        // this.data.activityList.forEach(element => {
        //     apply.push((this.data.userInfo.apply.indexOf(element.activityId)!=-1)?1:0);
        // });
        // this.setData({
        //     apply:apply
        // })
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
