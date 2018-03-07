const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//array to string
var arrayToString=function(arr){
    var tempString='';
    for(var i=0; i<arr.length; i++){
        tempString=tempString+arr[i]+',';
    };
    return tempString.substr(0,tempString.length-2);
}

//whether in array
var arrayContains=function(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }

//get index for array
var getArrayIndex=function(arr,obj){
    var temp=-1;
    for(var i=0; i<arr.length; i++){
        if(arr[i]==obj){
            temp=i;
        }
    }
    return temp;
}

//获取今天日期
var getDateToday=function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    };
    if (day < 10) {
        day = '0' + day;
    };
    //  如果需要时分秒，就放开
    // var h = now.getHours();
    // var m = now.getMinutes();
    // var s = now.getSeconds();
    var formatDate =  year + '-' + month + '-' + day;
    return formatDate;
}

//获取当前时间
var getTimeNow=function(){
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    // var s = now.getSeconds();
    var formatTime =  h + ':' + m;
    return formatTime;
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, getDateToday, getTimeNow, arrayContains, getArrayIndex, arrayToString }
