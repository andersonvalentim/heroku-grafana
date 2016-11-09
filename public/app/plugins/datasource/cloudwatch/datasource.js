/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","moment","app/core/utils/datemath","./annotation_query"],function(a,b,c,d,e){"use strict";function f(c,f,g,h){function i(a,c,d){var e=/\{\{(.+?)\}\}/g,f=c.alias||"{{metric}}_{{stat}}",g={region:h.replace(c.region,d),namespace:h.replace(c.namespace,d),metric:h.replace(c.metricName,d)},i={};b.each(b.keys(c.dimensions),function(a){var b=h.replace(a,d),e=h.replace(c.dimensions[a],d);i[b]=e}),b.extend(g,i);var j=1e3*c.period;return b.map(c.statistics,function(c){var d=[],h=null;b.chain(a.Datapoints).sortBy(function(a){return a.Timestamp}).each(function(a){var b=new Date(a.Timestamp).getTime();h&&b-h>j&&d.push([null,h+j]),h=b,d.push([a[c],b])}),g.stat=c;var i=f.replace(e,function(a,b){return g[b]?g[b]:b});return{target:i,datapoints:d}})}this.type="cloudwatch",this.name=c.name,this.supportMetrics=!0,this.proxyUrl=c.url,this.defaultRegion=c.jsonData.defaultRegion;var j=this;this.query=function(c){var d=j.convertToCloudWatchTime(c.range.from,!1),e=j.convertToCloudWatchTime(c.range.to,!0),g=[];if(c=a.copy(c),b.each(c.targets,b.bind(function(a){if(!a.hide&&a.namespace&&a.metricName&&!b.isEmpty(a.statistics)){var f={};f.region=h.replace(a.region,c.scopedVars),f.namespace=h.replace(a.namespace,c.scopedVars),f.metricName=h.replace(a.metricName,c.scopedVars),f.dimensions=j.convertDimensionFormat(a.dimensions,c.scopedVars),f.statistics=a.statistics;var i=e-d;f.period=parseInt(a.period,10)||("AWS/EC2"===f.namespace?300:60),i/f.period>=1440&&(f.period=60*Math.ceil(i/1440/60)),a.period=f.period,g.push(f)}},this)),b.isEmpty(g)){var k=f.defer();return k.resolve({data:[]}),k.promise}var l=b.map(g,function(a){return this.performTimeSeriesQuery(a,d,e)},this);return f.all(l).then(function(a){var d=[];return b.each(a,function(a,b){var e=i(a,c.targets[b],c.scopedVars);d=d.concat(e)}),{data:d}})},this.performTimeSeriesQuery=function(a,b,c){return this.awsRequest({region:a.region,action:"GetMetricStatistics",parameters:{namespace:a.namespace,metricName:a.metricName,dimensions:a.dimensions,statistics:a.statistics,startTime:b,endTime:c,period:a.period}})},this.getRegions=function(){return this.awsRequest({action:"__GetRegions"})},this.getNamespaces=function(){return this.awsRequest({action:"__GetNamespaces"})},this.getMetrics=function(a,b){return this.awsRequest({action:"__GetMetrics",region:b,parameters:{namespace:h.replace(a)}})},this.getDimensionKeys=function(a,b){return this.awsRequest({action:"__GetDimensions",region:b,parameters:{namespace:h.replace(a)}})},this.getDimensionValues=function(a,c,d,e,f){var g={region:h.replace(a),action:"ListMetrics",parameters:{namespace:h.replace(c),metricName:h.replace(d),dimensions:this.convertDimensionFormat(f,{})}};return this.awsRequest(g).then(function(a){return b.chain(a.Metrics).pluck("Dimensions").flatten().filter(function(a){return null!==a&&a.Name===e}).pluck("Value").uniq().sortBy().map(function(a){return{value:a,text:a}}).value()})},this.performEC2DescribeInstances=function(a,b,c){return this.awsRequest({region:a,action:"DescribeInstances",parameters:{filters:b,instanceIds:c}})},this.metricFindQuery=function(a){var c,d,e,g=function(a){return b.map(a,function(a){return{text:a}})},i=a.match(/^regions\(\)/);if(i)return this.getRegions();var j=a.match(/^namespaces\(\)/);if(j)return this.getNamespaces();var k=a.match(/^metrics\(([^\)]+?)(,\s?([^,]+?))?\)/);if(k)return this.getMetrics(k[1],k[3]);var l=a.match(/^dimension_keys\(([^\)]+?)(,\s?([^,]+?))?\)/);if(l)return this.getDimensionKeys(l[1],l[3]);var m=a.match(/^dimension_values\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/);if(m){c=h.replace(m[1]),d=h.replace(m[2]),e=h.replace(m[3]);var n=h.replace(m[4]);return this.getDimensionValues(c,d,e,n,{})}var o=a.match(/^ebs_volume_ids\(([^,]+?),\s?([^,]+?)\)/);if(o){c=h.replace(o[1]);var p=h.replace(o[2]),q=[p];return this.performEC2DescribeInstances(c,[],q).then(function(a){var c=b.map(a.Reservations[0].Instances[0].BlockDeviceMappings,function(a){return a.Ebs.VolumeId});return g(c)})}var r=a.match(/^ec2_instance_attribute\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);if(r){c=h.replace(r[1]);var s=JSON.parse(h.replace(r[3])),t=b.map(s,function(a,b){return{Name:b,Values:a}}),u=h.replace(r[2]);return this.performEC2DescribeInstances(c,t,null).then(function(a){var c=b.chain(a.Reservations).map(function(a){return b.pluck(a.Instances,u)}).flatten().uniq().sortBy().value();return g(c)})}return f.when([])},this.performDescribeAlarms=function(a,b,c,d,e){return this.awsRequest({region:a,action:"DescribeAlarms",parameters:{actionPrefix:b,alarmNamePrefix:c,alarmNames:d,stateValue:e}})},this.performDescribeAlarmsForMetric=function(a,b,c,d,e,f){return this.awsRequest({region:a,action:"DescribeAlarmsForMetric",parameters:{namespace:b,metricName:c,dimensions:d,statistic:e,period:f}})},this.performDescribeAlarmHistory=function(a,b,c,d){return this.awsRequest({region:a,action:"DescribeAlarmHistory",parameters:{alarmName:b,startDate:c,endDate:d}})},this.annotationQuery=function(a){var b=new e(this,a.annotation,f,h);return b.process(a.range.from,a.range.to)},this.testDatasource=function(){var a=this.defaultRegion,b="AWS/Billing",c="EstimatedCharges",d={};return this.getDimensionValues(a,b,c,"ServiceName",d).then(function(){return{status:"success",message:"Data source is working",title:"Success"}})},this.awsRequest=function(a){var b={method:"POST",url:this.proxyUrl,data:a};return g.datasourceRequest(b).then(function(a){return a.data})},this.getDefaultRegion=function(){return this.defaultRegion},this.convertToCloudWatchTime=function(a,c){return b.isString(a)&&(a=d.parse(a,c)),Math.round(a.valueOf()/1e3)},this.convertDimensionFormat=function(a,c){return b.map(a,function(a,b){return{Name:h.replace(b,c),Value:h.replace(a,c)}})}}return f.$inject=["instanceSettings","$q","backendSrv","templateSrv"],{CloudWatchDatasource:f}});