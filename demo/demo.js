KISSY.use("mui/tip",function(S,Tip){
  //尖角朝下
  var tip = new Tip({
    align:{
      node:"#J_Tip_Bottom",
      dir:"b", //r b l,
      offset:[0,-5]
    },
    content:"hello world",
    theme:"white",//yellow
    maxwidth:200
  });

  tip.align();

  //尖角朝左
  var tip2 = new Tip({
    align:{
      node:"#J_Tip_Left",
      dir:"l", //r b l,
      offset:[10,0]
    },
    content:"hello world",
    theme:"white",//yellow
    maxwidth:200
  });

  tip2.align();

  //尖角朝上
  var tip3 = new Tip({
    align:{
      node:"#J_Tip_Top",
      dir:"t", //r b l,
      offset:[0,5]
    },
    content:"hello world",
    theme:"white",//yellow
    maxwidth:200
  });

  tip3.align();


  var tip4 = new Tip({
    align:{
      node:"#J_Tip_Right",
      dir:"r", //r b l,
      offset:[-5,0]
    },
    content:"hello world",
    theme:"white",//yellow
    maxwidth:200
  });
  tip4.align();

  //自动探测能放下tip的位置
  var tip5 = new Tip({
    align:{
      node:"#J_Tip_Auto"
    },
    content:"hello world",
    theme:"white",//yellow
    maxwidth:200
  });
  tip5.align();

})
