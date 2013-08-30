KISSY.use("gallery/rtip/1.0/index,event,dom",function(S,Tip,E,D){
  //尖角朝下
  var tip = new Tip({
    align:"#J_Target1",
    dirs:["top"],//如果top能放下，就不再寻找其它位置了
    offset:[0,0],
    content:"hello world",
    theme:"white",//yellow
    // limit:window,
    maxwidth:200
  });

  tip.autoAlign();

  var pos2 = function(){
    tip.set("align","#J_Target2");
    tip.set("content","所谓分仓计划，就是说");
    tip.autoAlign();
    setTimeout(pos3,4000);
  }

  function pos3(){
    tip.set("align","#J_Target3");
    tip.set("content","所谓分仓计划，就是说能帮助商家blah");
    tip.autoAlign();
    setTimeout(pos4,4000);
  }

  function pos4(){
    tip.set("align","#J_Target4");
    tip.set("content","所谓分仓计划，就是说能帮助商家blah，更长更长更长更长更长更长");
    tip.autoAlign();
    setTimeout(pos5,4000);
  }


  function pos5(){
    tip.set("align","#J_Target5");
    tip.set("content","所谓分仓计划，就是说能帮助商家blah，更长更长更长更长更长更长更长更长更长更长更长更长更长更长更长更长更长更长");
    tip.autoAlign();
  }


  function pos6(){
    tip.moveto(300,300);
  }

  setTimeout(pos2,2000);

  E.on(window,"resize",function(){
    tip.autoAlign();
    // tip.moveto(400,400);
  });

})
