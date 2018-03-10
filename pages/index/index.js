//index.js
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
        deleteNotSelected:true
    },
    onLoad:function(){
        this.setData({
            userInfo:mockData.userInfo,
            activityList:mockData.activityList,
        });
        wx.setStorage({
            key:"userId",
            data:this.data.userInfo.userId
        });
        /*var query=wx.createSelectorQuery().in(this);
        query.select("#item1").boundingClientRect(function(res){
            console.log(res.height);
        }).exec();*/
        console.log("test git");
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
