//app.js
//var qcloud = require('./vendor/wafer2-client-sdk/index')
//var config = require('./config')

App({
    onLaunch: function () {
        //console.log("app launched!");
        wx.navigateTo({
            url:"pages/activityApply/activityApply?actId=1"
        });
    }
})