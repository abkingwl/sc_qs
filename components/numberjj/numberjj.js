Component({
  properties: {
    // 属性值可以在组件使用时指定
    initInput:{
        type: Number,
        value: 16
    }
  },
  data: {  
      // input默认是1  
      num: 16, 
      // 使用data数据对象设置样式名  
      minusStatus: 'normal'
  },
  attached:function(){
    //console.log(this.data.initInput);
    this.setData({
        num:this.data.initInput
    });
  },
  methods:{ 
    /* 点击减号 */  
    bindMinus: function() {  
        var num = this.data.num;  
        // 如果大于1时，才可以减  
        if (num > 1) {  
            num --;  
        }  
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num <= 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            num: num,  
            minusStatus: minusStatus  
        });
        var myEventDetail = {countNumber:this.data.num}; // detail对象，提供给事件监听函数
        this.triggerEvent('reportToParent', myEventDetail);
    },  
    /* 点击加号 */  
    bindPlus: function() {  
        var num = this.data.num;  
        // 不作过多考虑自增1  
        if (num<99) num ++;  
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num < 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            num: num,  
            minusStatus: minusStatus  
        });
        var myEventDetail = {countNumber:this.data.num}; // detail对象，提供给事件监听函数
        this.triggerEvent('reportToParent', myEventDetail); 
    },  
    /* 输入框事件 */  
    bindManual: function(e) {  
        var num = e.detail.value;
        // 将数值与状态写回  
        this.setData({  
            num: num  
        });
        var myEventDetail = {countNumber:this.data.num}; // detail对象，提供给事件监听函数
        this.triggerEvent('reportToParent', myEventDetail); 
          
    }
  }
})