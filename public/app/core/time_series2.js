/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["app/core/utils/kbn","lodash"],function(a){function b(a,b){if(!a)return!1;if("/"===a[0]){var c=d["default"].stringToJsRegex(a);return null!=b.match(c)}return a===b}function c(a){return 0===a?.001:a/10}var d,e,f;return{setters:[function(a){d=a},function(a){e=a}],execute:function(){f=function(){function a(a){this.datapoints=a.datapoints,this.label=a.alias,this.id=a.alias,this.alias=a.alias,this.color=a.color,this.valueFormater=d["default"].valueFormats.none,this.stats={},this.legend=!0,this.unit=a.unit}return a.prototype.applySeriesOverrides=function(a){this.lines={},this.points={},this.bars={},this.yaxis=1,this.zindex=0,this.nullPointMode=null,delete this.stack;for(var d=0;d<a.length;d++){var e=a[d];b(e.alias,this.alias)&&(void 0!==e.lines&&(this.lines.show=e.lines),void 0!==e.points&&(this.points.show=e.points),void 0!==e.bars&&(this.bars.show=e.bars),void 0!==e.fill&&(this.lines.fill=c(e.fill)),void 0!==e.stack&&(this.stack=e.stack),void 0!==e.linewidth&&(this.lines.lineWidth=e.linewidth),void 0!==e.nullPointMode&&(this.nullPointMode=e.nullPointMode),void 0!==e.pointradius&&(this.points.radius=e.pointradius),void 0!==e.steppedLine&&(this.lines.steps=e.steppedLine),void 0!==e.zindex&&(this.zindex=e.zindex),void 0!==e.fillBelowTo&&(this.fillBelowTo=e.fillBelowTo),void 0!==e.color&&(this.color=e.color),void 0!==e.transform&&(this.transform=e.transform),void 0!==e.legend&&(this.legend=e.legend),void 0!==e.yaxis&&(this.yaxis=e.yaxis))}},a.prototype.getFlotPairs=function(a){var b=[];this.stats.total=0,this.stats.max=-Number.MAX_VALUE,this.stats.min=Number.MAX_VALUE,this.stats.avg=null,this.stats.current=null,this.allIsNull=!0,this.allIsZero=!0;for(var c,d,f="connected"===a,g="null as zero"===a,h=0,i=0;i<this.datapoints.length;i++){if(d=this.datapoints[i][0],c=this.datapoints[i][1],null===d){if(f)continue;g&&(d=0)}null!==d&&(e["default"].isNumber(d)&&(this.stats.total+=d,this.allIsNull=!1,h++),d>this.stats.max&&(this.stats.max=d),d<this.stats.min&&(this.stats.min=d)),0!==d&&(this.allIsZero=!1),b.push([c,d])}return this.datapoints.length>=2&&(this.stats.timeStep=this.datapoints[1][1]-this.datapoints[0][1]),this.stats.max===-Number.MAX_VALUE&&(this.stats.max=null),this.stats.min===Number.MAX_VALUE&&(this.stats.min=null),b.length&&(this.stats.avg=this.stats.total/h,this.stats.current=b[b.length-1][1],null===this.stats.current&&b.length>1&&(this.stats.current=b[b.length-2][1])),this.stats.count=b.length,b},a.prototype.updateLegendValues=function(a,b,c){this.valueFormater=a,this.decimals=b,this.scaledDecimals=c},a.prototype.formatValue=function(a){return this.valueFormater(a,this.decimals,this.scaledDecimals)},a.prototype.isMsResolutionNeeded=function(){for(var a=0;a<this.datapoints.length;a++)if(null!==this.datapoints[a][1]){var b=this.datapoints[a][1].toString();if(13===b.length&&b%1e3!==0)return!0}return!1},a.prototype.hideFromLegend=function(a){return!(!a.hideEmpty||!this.allIsNull)||(!this.legend||!(!a.hideZero||!this.allIsZero))},a}(),a("default",f)}}});