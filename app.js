//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('utils/js/util.js')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        qcloud.login({
            success(result) {
                if (result) {
                    wx.setStorage({
                        key:"userId",
                        data:result.data.data.userId
                    })
                    wx.setStorage({
                        key:"openId",
                        data:result.data.data.openId
                    })
                    wx.setStorage({
                        key:"isAdmin",
                        data:result.data.data.isAdmin
                    })
                    console.log("login")
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            wx.setStorage({
                                key:"userId",
                                data:result.data.data.userId
                            })
                            wx.setStorage({
                                key:"openId",
                                data:result.data.data.openId
                            })
                            wx.setStorage({
                                key:"isAdmin",
                                data:result.data.data.isAdmin
                            })
                            console.log("request")
                        },
                        fail(error) {
                            util.showModel('服务器暂时不可访问，请联系管理员或者稍后再试', error)
                            console.log('request fail', error)
                        }
                    })
                }
            }
        
        })
        //console.log("app launched!");
        /*wx.navigateTo({
            url:"pages/activityApply/activityApply?actId=1"
        });*/
    }
})