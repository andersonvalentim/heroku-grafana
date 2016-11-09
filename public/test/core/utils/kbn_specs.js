/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["app/core/utils/kbn","app/core/utils/datemath"],function(a,b){"use strict";function c(b,c,d,e,f){describe("value format: "+b,function(){it("should translate "+c+" as "+f,function(){var g=e-Math.floor(Math.log(d)/Math.LN10),h=a.valueFormats[b](c,e,g);expect(h).to.be(f)})})}describe("unit format menu",function(){var b=a.getUnitFormats();b.map(function(b){describe("submenu "+b.text,function(){it("should have a title",function(){expect(b.text).to.be.a("string")}),it("should have a submenu",function(){expect(b.submenu).to.be.an("array")}),b.submenu.map(function(b){describe("entry "+b.text,function(){it("should have a title",function(){expect(b.text).to.be.a("string")}),it("should have a format",function(){expect(b.value).to.be.a("string")}),it("should have a valid format",function(){expect(a.valueFormats[b.value]).to.be.a("function")})})})})})}),c("ms",.0024,5e-4,4,"0.0024 ms"),c("ms",100,1,0,"100 ms"),c("ms",1250,10,0,"1.25 s"),c("ms",1250,300,0,"1.3 s"),c("ms",65150,1e4,0,"1.1 min"),c("ms",6515e3,15e5,0,"1.8 hour"),c("ms",6515e5,15e7,0,"8 day"),c("none",2.75e-10,0,10,"3e-10"),c("none",0,0,2,"0"),c("dB",10,1e3,2,"10.00 dB"),c("percent",0,0,0,"0%"),c("percent",53,0,1,"53.0%"),c("percentunit",0,0,0,"0%"),c("percentunit",.278,0,1,"27.8%"),c("percentunit",1,0,0,"100%"),c("currencyUSD",7.42,1e4,2,"$7.42"),c("currencyUSD",1532.82,1e3,1,"$1.53K"),c("currencyUSD",18520408.7,1e7,0,"$19M"),c("bytes",-1.57e308,-1.57e308,2,"NA"),c("ns",25,1,0,"25 ns"),c("ns",2558,50,0,"2.56 µs"),c("ops",123,1,0,"123 ops"),c("rps",456e3,1e3,-1,"456K rps"),c("rps",123456789,1e6,2,"123.457M rps"),c("wps",789e6,1e6,-1,"789M wps"),c("iops",11e9,1e9,-1,"11B iops"),c("s",24,1,0,"24 s"),c("s",246,1,0,"4.1 min"),c("s",24567,100,0,"6.82 hour"),c("s",24567890,1e4,0,"40.62 week"),c("s",2456789e4,1e6,0,"778.53 year"),c("m",24,1,0,"24 min"),c("m",246,10,0,"4.1 hour"),c("m",6545,10,0,"4.55 day"),c("m",24567,100,0,"2.44 week"),c("m",24567892,1e4,0,"46.7 year"),c("h",21,1,0,"21 hour"),c("h",145,1,0,"6.04 day"),c("h",1234,100,0,"7.3 week"),c("h",9458,1e3,0,"1.08 year"),c("d",3,1,0,"3 day"),c("d",245,100,0,"35 week"),c("d",2456,10,0,"6.73 year"),describe("kbn.toFixed and negative decimals",function(){it("should treat as zero decimals",function(){var b=a.toFixed(186.123,-2);expect(b).to.be("186")})}),describe("kbn ms format when scaled decimals is null do not use it",function(){it("should use specified decimals",function(){var b=a.valueFormats.ms(10000086.123,1,null);expect(b).to.be("2.8 hour")})}),describe("kbn kbytes format when scaled decimals is null do not use it",function(){it("should use specified decimals",function(){var b=a.valueFormats.kbytes(1e7,3,null);expect(b).to.be("9.537 GiB")})}),describe("kbn roundValue",function(){it("should should handle null value",function(){var b=a.roundValue(null,2);expect(b).to.be(null)})}),describe("calculateInterval",function(){it("1h 100 resultion",function(){var c={from:b.parse("now-1h"),to:b.parse("now")},d=a.calculateInterval(c,100,null);expect(d).to.be("30s")}),it("10m 1600 resolution",function(){var c={from:b.parse("now-10m"),to:b.parse("now")},d=a.calculateInterval(c,1600,null);expect(d).to.be("500ms")}),it("fixed user interval",function(){var c={from:b.parse("now-10m"),to:b.parse("now")},d=a.calculateInterval(c,1600,"10s");expect(d).to.be("10s")}),it("short time range and user low limit",function(){var c={from:b.parse("now-10m"),to:b.parse("now")},d=a.calculateInterval(c,1600,">10s");expect(d).to.be("10s")}),it("large time range and user low limit",function(){var c={from:b.parse("now-14d"),to:b.parse("now")},d=a.calculateInterval(c,1e3,">10s");expect(d).to.be("20m")}),it("10s 900 resolution and user low limit in ms",function(){var c={from:b.parse("now-10s"),to:b.parse("now")},d=a.calculateInterval(c,900,">15ms");expect(d).to.be("15ms")})})});