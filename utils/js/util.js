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

//get time count down
var getTimeCountDown=function(date){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    days = days<10?"0"+days:days; 
    hours = hours<10?"0"+hours:hours;
    minutes = minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds;
    var leftCount = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒";
    return leftCount; 
} 
function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
    if(i<10) 
    { 
        i = "0" + i; 
    } 
    return i; 
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
var showBusy = (text,duration) => wx.showToast({
    title: text,
    icon: 'loading',
    duration: duration || 2000
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

module.exports = { formatTime, showBusy, showSuccess, showModel, getDateToday, getTimeNow, arrayContains, getArrayIndex, arrayToString, getTimeCountDown }
