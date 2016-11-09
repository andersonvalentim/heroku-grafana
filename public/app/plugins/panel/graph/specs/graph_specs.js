/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["../../../../../test/lib/common","../module","angular","jquery","test/specs/helpers","app/core/time_series2","moment","app/core/core"],function(a){var b,c,d,e,f,g,h;return{setters:[function(a){b=a},function(a){},function(a){c=a},function(a){d=a},function(a){e=a},function(a){f=a},function(a){g=a},function(a){h=a}],execute:function(){b.describe("grafanaGraph",function(){function a(a,i,j){void 0===j&&(j=500),b.describe(a,function(){var a={};a.setup=function(i){b.beforeEach(b.angularMocks.module(function(a){a.value("timeSrv",new e["default"].TimeSrvStub)})),b.beforeEach(b.angularMocks.inject(function(e,k){var l={events:new h.Emitter,height:200,panel:{legend:{},grid:{},yaxes:[{min:null,max:null,format:"short",logBase:1},{min:null,max:null,format:"short",logBase:1}],xaxis:{},seriesOverrides:[],tooltip:{shared:!0}},renderingCompleted:b.sinon.spy(),hiddenSeries:{},dashboard:{getTimezone:b.sinon.stub().returns("browser")},range:{from:g["default"]([2015,1,1,10]),to:g["default"]([2015,1,1,22])}},m=e.$new();m.ctrl=l,e.onAppEvent=b.sinon.spy(),a.data=[],a.data.push(new f["default"]({datapoints:[[1,1],[2,2]],alias:"series1"})),a.data.push(new f["default"]({datapoints:[[1,1],[2,2]],alias:"series2"})),i(l,a.data);var n=c["default"].element("<div style='width:"+j+"px' grafana-graph><div>");k(n)(m),m.$digest(),d["default"].plot=a.plotSpy=b.sinon.spy(),l.events.emit("render",a.data),a.plotData=a.plotSpy.getCall(0).args[1],a.plotOptions=a.plotSpy.getCall(0).args[2]}))},i(a)})}b.beforeEach(b.angularMocks.module("grafana.directives")),a("simple lines options",function(a){a.setup(function(a){a.panel.lines=!0,a.panel.fill=5,a.panel.linewidth=3,a.panel.steppedLine=!0}),b.it("should configure plot with correct options",function(){b.expect(a.plotOptions.series.lines.show).to.be(!0),b.expect(a.plotOptions.series.lines.fill).to.be(.5),b.expect(a.plotOptions.series.lines.lineWidth).to.be(3),b.expect(a.plotOptions.series.lines.steps).to.be(!0)})}),a("grid thresholds 100, 200",function(a){a.setup(function(a){a.panel.grid={threshold1:100,threshold1Color:"#111",threshold2:200,threshold2Color:"#222"}}),b.it("should add grid markings",function(){var c=a.plotOptions.grid.markings;b.expect(c[0].yaxis.from).to.be(100),b.expect(c[0].yaxis.to).to.be(200),b.expect(c[0].color).to.be("#111"),b.expect(c[1].yaxis.from).to.be(200),b.expect(c[1].yaxis.to).to.be(1/0)})}),a("inverted grid thresholds 200, 100",function(a){a.setup(function(a){a.panel.grid={threshold1:200,threshold1Color:"#111",threshold2:100,threshold2Color:"#222"}}),b.it("should add grid markings",function(){var c=a.plotOptions.grid.markings;b.expect(c[0].yaxis.from).to.be(200),b.expect(c[0].yaxis.to).to.be(100),b.expect(c[0].color).to.be("#111"),b.expect(c[1].yaxis.from).to.be(100),b.expect(c[1].yaxis.to).to.be(-(1/0))})}),a("grid thresholds from zero",function(a){a.setup(function(a){a.panel.grid={threshold1:0,threshold1Color:"#111"}}),b.it("should add grid markings",function(){var c=a.plotOptions.grid.markings;b.expect(c[0].yaxis.from).to.be(0)})}),a("when logBase is log 10",function(a){a.setup(function(a){a.panel.yaxes[0].logBase=10}),b.it("should apply axis transform and ticks",function(){var c=a.plotOptions.yaxes[0];b.expect(c.transform(100)).to.be(Math.log(100.1)),b.expect(c.ticks[0]).to.be(0),b.expect(c.ticks[1]).to.be(1)})}),a("should use timeStep for barWidth",function(a){a.setup(function(a,b){a.panel.bars=!0,b[0]=new f["default"]({datapoints:[[1,10],[2,20]],alias:"series1"})}),b.it("should set barWidth",function(){b.expect(a.plotOptions.series.bars.barWidth).to.be(10/1.5)})}),a("series option overrides, fill & points",function(a){a.setup(function(a,b){a.panel.lines=!0,a.panel.fill=5,b[0].zindex=10,b[1].alias="test",b[1].lines={fill:.001},b[1].points={show:!0}}),b.it("should match second series and fill zero, and enable points",function(){b.expect(a.plotOptions.series.lines.fill).to.be(.5),b.expect(a.plotData[1].lines.fill).to.be(.001),b.expect(a.plotData[1].points.show).to.be(!0)})}),a("should order series order according to zindex",function(a){a.setup(function(a,b){b[1].zindex=1,b[0].zindex=10}),b.it("should move zindex 2 last",function(){b.expect(a.plotData[0].alias).to.be("series2"),b.expect(a.plotData[1].alias).to.be("series1")})}),a("when series is hidden",function(a){a.setup(function(a){a.hiddenSeries={series2:!0}}),b.it("should remove datapoints and disable stack",function(){b.expect(a.plotData[0].alias).to.be("series1"),b.expect(a.plotData[1].data.length).to.be(0),b.expect(a.plotData[1].stack).to.be(!1)})}),a("when stack and percent",function(a){a.setup(function(a){a.panel.percentage=!0,a.panel.stack=!0}),b.it("should show percentage",function(){var c=a.plotOptions.yaxes[0];b.expect(c.tickFormatter(100,c)).to.be("100%")})}),a("when panel too narrow to show x-axis dates in same granularity as wide panels",function(a){b.describe("and the range is less than 24 hours",function(){a.setup(function(a){a.range.from=g["default"]([2015,1,1,10]),a.range.to=g["default"]([2015,1,1,22])}),b.it("should format dates as hours minutes",function(){var c=a.plotOptions.xaxis;b.expect(c.timeformat).to.be("%H:%M")})}),b.describe("and the range is less than one year",function(){a.setup(function(a){a.range.from=g["default"]([2015,1,1]),a.range.to=g["default"]([2015,11,20])}),b.it("should format dates as month days",function(){var c=a.plotOptions.xaxis;b.expect(c.timeformat).to.be("%m/%d")})})},10)})}}});