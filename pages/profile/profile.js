
Page({
  data:{
    userInfo:{
      nickName:"轻风",
      sex:1,
      isAdmin:true,
      isAdvanced:true,
      activeValue:10
    },
    avatar:null
  },
  onLoad:function(){
    var that=this
    wx.getStorage({
      key: 'avatar',
      success: function(res) {
          console.log(res.data)
          that.setData({
            avatar:res.data
          })
      } 
    })

  }
});