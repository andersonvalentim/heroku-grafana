/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","app/core/core_module","tether-drop"],function(a){function b(){return{restrict:"E",template:'<i class="fa fa-info-circle"></i>',transclude:!0,link:function(a,b,d,f,g){var h=d.offset||"0 -10px",i=d.position||"right middle",j="drop-help drop-hide-out-of-bounds",k="hover";b.addClass("gf-form-help-icon"),d.wide&&(j+=" drop-wide"),d.mode&&b.addClass("gf-form-help-icon--"+d.mode),g(function(d,f){var g=document.createElement("div");c["default"].each(d,function(a){g.appendChild(a)});var l=new e["default"]({target:b[0],content:g,position:i,classes:j,openOn:k,hoverOpenDelay:400,tetherOptions:{offset:h}});a.$on("$destroy",function(){l.destroy()})})}}}var c,d,e;return a("infoPopover",b),{setters:[function(a){c=a},function(a){d=a},function(a){e=a}],execute:function(){d["default"].directive("infoPopover",b)}}});