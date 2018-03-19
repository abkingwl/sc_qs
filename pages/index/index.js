//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/js/util.js');
var mockData=require("mockData.js");


Page({
    data: {
        userInfo:{},
        activityList:[],
        operations:{},
        operationAdmin:[],
        operationInaccess:'',
        operationOn:0,
        editNotSelected:true,
        deleteNotSelected:true,

        logged:false,
        
    },

    onLoad:function(){
        this.setData({
            userInfo:mockData.userInfo,
            activityList:mockData.activityList,
        });
        // 调用登录接口
        var that=this;
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    console.log(result)
                    that.setData({
                        logged: true
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            console.log(result.data.data)
                            that.setData({
                                logged: true
                            })
                        },

                        fail(error) {
                            util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
        wx.setStorage({
            key:"userId",
            data:this.data.userInfo.userId
        });
        /*var query=wx.createSelectorQuery().in(this);
        query.select("#item1").boundingClientRect(function(res){
            console.log(res.height);
        }).exec();*/
        //console.log("test git");
    },
    //define on pull down refresh close
    onPullDownRefresh:function(){
        wx.showNavigationBarLoading() //在标题栏中显示加载
        
        //模拟加载
        setTimeout(function(){
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        },1000);
    },
    testClick:function(e){
        var actId=e.currentTarget.dataset.activityId;
        wx.navigateTo({
            url:'../activityApply/activityApply?actId='+actId
        });
        console.log(e.currentTarget.dataset.activityId);
    },
    //admin点击管理活动按钮
    adminClick:function(e){
        wx.navigateTo({
            url: '../admin/adminList/adminList?adminId='+this.data.userInfo.userId
        })
    }

    //check可操作的项目
    /*checkOperation:function(){
        var opAdmin=[];
        var myId=this.data.userInfo.userId;
        var actList=this.data.activityList;
        for (var i=0; i<actList.length; i++){
            opAdmin.push(actList[i].activityAdmin!=myId?true:false);
        }
        console.log(opAdmin);
        return opAdmin;
    },*/

    //default下按编辑
    /*editStart:function(){
        var opAdmin=this.checkOperation();
        this.setData({
            operationAdmin:opAdmin,
            operationOn:1
        });
        //console.log(this.data.operations);
    },*/
    //default下按删除
    /*deleteStart:function(){
        this.setData({
            operationOn:2
        });
    },*/

    //edit下和delete下未选择时按取消
    /*cancelStart:function(){
        this.setData({
            operationOn:0
        });
    }*/

    
});

/*Page({
    data: {
        userInfo:{
            userId:1,
            userName:"阿慧",
        },
        activity:[
            {
            
            },
            {

            }
        ]
    }

    
});*/
