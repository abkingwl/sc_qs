//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        //console.log("app launched!");
        /*wx.navigateTo({
            url:"pages/activityApply/activityApply?actId=1"
        });*/
    }
})