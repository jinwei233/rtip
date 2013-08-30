KISSY.use("gallery/rtip/1.0/index,event,dom",function(S,RTip,E,D){

  RTip.listen(".J_RTip",{
    attrname:"data-title",
    alignConfig:{
      dirs:["top","bottom"]//优先看上下是否能放下tip
    }
  });

});