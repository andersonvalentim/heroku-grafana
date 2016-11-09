/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","moment","./datemath"],function(a){function b(a,b){var c=f["default"].groupBy(j,function(a){return a.active=a.display===b,a.section});return c}function c(a){return a.format(k)}function d(a){a.indexOf("now")===-1&&(a="now-"+a);var b=l[a+" to now"];if(b)return b;b={from:a,to:"now"};var c=/^now-(\d+)(\w)/.exec(a);if(c){var d=c[2],e=parseInt(c[1]),f=i[d];f&&(b.display="Last "+e+" "+f.display,b.section=f.section,e>1&&(b.display+="s"))}else b.display=b.from+" to "+b.to,b.invalid=!0;return b}function e(a){var b=l[a.from.toString()+" to "+a.to.toString()];if(b)return b.display;if(g["default"].isMoment(a.from)&&g["default"].isMoment(a.to))return c(a.from)+" to "+c(a.to);if(g["default"].isMoment(a.from)){var e=h.parse(a.to,!0);return c(a.from)+" to "+e.fromNow()}if(g["default"].isMoment(a.to)){var f=h.parse(a.from,!1);return f.fromNow()+" to "+c(a.to)}if("now"===a.to.toString()){var i=d(a.from);return i.display}return a.from.toString()+" to "+a.to.toString()}var f,g,h,i,j,k,l;return a("getRelativeTimesList",b),a("describeTextRange",d),a("describeTimeRange",e),{setters:[function(a){f=a},function(a){g=a},function(a){h=a}],execute:function(){i={s:{display:"second"},m:{display:"minute"},h:{display:"hour"},d:{display:"day"},w:{display:"week"},M:{display:"month"},y:{display:"year"}},j=[{from:"now/d",to:"now/d",display:"Today",section:2},{from:"now/d",to:"now",display:"Today so far",section:2},{from:"now/w",to:"now/w",display:"This week",section:2},{from:"now/w",to:"now",display:"This week so far",section:2},{from:"now/M",to:"now/M",display:"This month",section:2},{from:"now/y",to:"now/y",display:"This year",section:2},{from:"now-1d/d",to:"now-1d/d",display:"Yesterday",section:1},{from:"now-2d/d",to:"now-2d/d",display:"Day before yesterday",section:1},{from:"now-7d/d",to:"now-7d/d",display:"This day last week",section:1},{from:"now-1w/w",to:"now-1w/w",display:"Previous week",section:1},{from:"now-1M/M",to:"now-1M/M",display:"Previous month",section:1},{from:"now-1y/y",to:"now-1y/y",display:"Previous year",section:1},{from:"now-5m",to:"now",display:"Last 5 minutes",section:3},{from:"now-15m",to:"now",display:"Last 15 minutes",section:3},{from:"now-30m",to:"now",display:"Last 30 minutes",section:3},{from:"now-1h",to:"now",display:"Last 1 hour",section:3},{from:"now-3h",to:"now",display:"Last 3 hours",section:3},{from:"now-6h",to:"now",display:"Last 6 hours",section:3},{from:"now-12h",to:"now",display:"Last 12 hours",section:3},{from:"now-24h",to:"now",display:"Last 24 hours",section:3},{from:"now-7d",to:"now",display:"Last 7 days",section:0},{from:"now-30d",to:"now",display:"Last 30 days",section:0},{from:"now-60d",to:"now",display:"Last 60 days",section:0},{from:"now-90d",to:"now",display:"Last 90 days",section:0},{from:"now-6M",to:"now",display:"Last 6 months",section:0},{from:"now-1y",to:"now",display:"Last 1 year",section:0},{from:"now-2y",to:"now",display:"Last 2 years",section:0},{from:"now-5y",to:"now",display:"Last 5 years",section:0}],k="MMM D, YYYY HH:mm:ss",l={},f["default"].each(j,function(a){l[a.from+" to "+a.to]=a})}}});