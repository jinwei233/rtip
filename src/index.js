/**
 * @author:元晃
 * */

KISSY.add("mui/tip",function(S,Anim,XTemplate){
  var D = S.DOM
    , E = S.Event
    , win = window
    , $win = S.one(win)
    , $body = S.one(win.document.body)

  var defaultCfg = {
    tipArrowCls:'mui-chart-arrow-',        // tip箭头方向
    tipContentCls:'mui-chart-tip-content', // tip内容
    boundryDetect:true,                    // 默认开启边界检测
    dir:'b',                               // "trbl" top right bottom left 现在只支持top bottom
    maxWidth:false,                        // 最大宽度，超过这个宽度折行
    share:false,                           // 共用tip
    autoAdjust:false,                      // 窗口变化自动调整位置
    autoRender:false                       // 自动渲染，必须设置了x,y
  };

    var TIPTPL = '<div class="mui-poptip mui-poptip-{{theme}}">\
                    <div class="mui-poptip-shadow">\
                        <div class="mui-poptip-container">\
                            <div class="mui-poptip-arrow {{#if dir}}mui-poptip-arrow-{{dir}}{{/if}}">\
                                <em></em>\
                                <span></span>\
                            </div>\
                            <div class="mui-poptip-content" data-role="content">\
                                {{content}}\
                            </div>\
                        </div>\
                    </div>\
                </div>';
  // default align
  var align = {
    offset:[0,0]
  };
  var $shareTip
    , xtemplate
  function createTip(data){
    // var HTML = S.substitute(TIPTPL,data);
    if(!xtemplate){
      xtemplate = new XTemplate(TIPTPL)
    }
    var HTML = xtemplate.render(data);
    return S.Node(HTML);
  }

  //获取tip content的尺寸
  var $detector
  function sizeof(html){
    $detector || ($detector = S.Node("<div/>").css({"visibility":"hidden","position":"fixed","left":'-9999em',"top":0}).appendTo($body));
    D.append(html,$detector);
    var ret = {
      width:D.outerWidth($detector),
      height:D.outerHeight($detector)
    }
    $detector.html("");
    return ret;
  }

  function Tip(cfg){
    var $node;
    if(!(cfg.align.node && ($node = S.one(cfg.align.node)))){
      throw Error("未定义align 目标元素");
    }
    cfg.align = S.merge(align,cfg.align);
    cfg = S.merge(defaultCfg,cfg);
    this.set(cfg);
    this.set("$node",$node);
  };

  S.extend(Tip,S.Base,{
    gettip:function(data){
      if(this.get("share")){
        if(!$shareTip){
          $shareTip = createTip(data);
        }
        return $shareTip;
      }else{
        var $tip = this.get("$tip")
        if(!$tip){
          $tip = createTip(data);
          this.set("$tip",$tip);
        }
        return $tip;
      }
    },
    getarrow:function($con){
      $con || ($con = this.gettip(this.getdata()));
      return $con.one(".mui-poptip-arrow");
    },
    getdata:function(){
      var align = this.get("align");
      return {
        content:this.get("content") || "&nbsp;",
        theme:this.get("theme") || "white",
        dir:align.dir
      }
    },
    align:function(){
      var contentsize
        , maxwidth = this.get('maxwidth')
        , data
        , $tip
        , $arrow
        , align
        , w

      data = this.getdata()
      if(!data.dir){

      }

      $tip = this.gettip(data)
      $arrow = this.getarrow($tip)
      align = this.get("align")

      contentsize = sizeof($tip);
      if(contentsize.width > maxwidth){
        w = maxwidth;
      }else{
        w = contentsize.width;
      }
      $body.append($tip);

      var h = $tip.outerHeight();
      $tip.css({'width':w+'px',"position":"absolute"});
      this.set("contentWidth",w);
      this.set("contentHeight",h)
      //计算tip的位置
      var pos = this._compute();
      if(pos){
        $tip.css(pos.style);
        $arrow.css(pos.astyle);
      }
    },
    _compute:function($tip){
      var align = this.get("align")
        , offset = align.offset
        , $node = this.get("$node")
        , $arrow = this.getarrow($tip)
        , $arrow_em = $arrow.one("em")
        , arrow_w
        , arrow_h
        , tip_width = this.get("contentWidth")
        , tip_height = this.get("contentHeight")
        , w = $node.outerWidth()
        , h = $node.outerHeight()
        , x , y
        , win_w = $win.width()
        , win_h = $win.height()
        , pos
      var $offset = D.offset($node)
      function top(){
        var dis_x = $offset.left + (w - tip_width)/2 + offset[0]
          , dis_y = h + offset[1] + $offset.top
        arrow_w = parseFloat(D.css($arrow_em,"border-bottom-width"))
        arrow_h = arrow_w
        return {
          style:{"left":dis_x+"px","top":dis_y+"px"},
          astyle:{
            "bottom":"0",
            "left":((tip_width - arrow_w*2)/2)+"px"
          }
        }
        return false;
      }
      function right(){
        var dis_x = $offset.left  - tip_width + offset[0]
          , dis_y = (h-tip_height)/2 + offset[1] + $offset.top
        arrow_w = parseFloat(D.css($arrow_em,"border-left-width"))
        arrow_h = arrow_w
        return {
          style:{"left":dis_x+"px","top":dis_y+"px"},
          astyle:{
            "right":"0",
            "top":((tip_height - arrow_h*2)/2)+"px"
          }
        }
        return false;
      }

      function bottom(){
        var dis_x = $offset.left + (w - tip_width)/2 + offset[0]
          , dis_y = $offset.top  - tip_height + offset[1]
        arrow_w = parseFloat(D.css($arrow_em,"border-top-width"))
        arrow_h = arrow_w

        return {
          style:{"left":dis_x+"px","top":dis_y+"px"},
          astyle:{
            "bottom":"0",
            "left":((tip_width - arrow_w*2)/2)+"px"
          }
        }

        return false;
      }
      function left(){
        var dis_x = w + tip_width + offset[0] + $offset.left
          , dis_y = (h-tip_height)/2 + offset[1] + $offset.top
        arrow_w = parseFloat(D.css($arrow_em,"border-right-width"))
        arrow_h = arrow_w

        if(dis_x <= win_w){
          return {
            style:{"left":dis_x - tip_width+"px","top":dis_y+"px"},
            astyle:{"right":-arrow_w+"px","top":((tip_height - arrow_h*2)/2)+"px"}
          }
        }
        return false;
      }
      var dir = {
        "t":top,
        "r":right,
        "b":bottom,
        "l":left
      }
      function auto(){
        var aligns = [bottom,left,top,right]
          , dirs = ["b","l","t","r"]
          , ret
          , dir
        for(var i=0,l=aligns.length;i<l;i++){
          ret = aligns[i];
          if(ret){
            dir = dirs[i];
            $arrow.addClass("mui-poptip-arrow-"+dir);
            break;
          }else{
            ret = null;
          }
        }
        //如果一个都不合适，则尖角向上
        if(!ret){
          ret = top;
        }
        return ret;
      }
      var fn = dir[align.dir] || auto();
      pos = fn();
      return pos;
    },
    show:function(){

    },
    hide:function(){

    }
  });
  return Tip;
},{requires:['tip/anim',"xtemplate"]});
