/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","app/core/utils/kbn"],function(a,b,c){"use strict";var d=a.module("grafana.services");d.service("templateValuesSrv",["$q","$rootScope","datasourceSrv","$location","templateSrv","timeSrv",function(d,e,f,g,h,i){function j(){return{text:"None",value:"",isNone:!0}}var k=this;this.variableLock={},e.onAppEvent("refresh",function(){var a=b.findWhere(k.variables,{type:"interval"});a&&k.updateAutoInterval(a);var c=k.variables.filter(function(a){return 2===a.refresh}).map(function(a){return k.updateOptions(a)});return d.all(c)},e),this.init=function(a){this.variables=a.templating.list,h.init(this.variables);var c=g.search(),e=[];this.variableLock={},b.forEach(this.variables,function(a){k.variableLock[a.name]=d.defer()});for(var f=0;f<this.variables.length;f++){var i=this.variables[f];e.push(this.processVariable(i,c))}return d.all(e)},this.processVariable=function(a,c){var e=[],f=k.variableLock[a.name];return"query"===a.type&&b.forEach(this.variables,function(b){(h.containsVariable(a.query,b.name)||h.containsVariable(a.datasource,b.name))&&e.push(k.variableLock[b.name].promise)}),d.all(e).then(function(){var d=c["var-"+a.name];return void 0!==d?k.setVariableFromUrl(a,d).then(f.resolve):1===a.refresh||2===a.refresh?k.updateOptions(a).then(function(){b.isEmpty(a.current)&&a.options.length&&k.setVariableValue(a,a.options[0]),f.resolve()}):void("interval"===a.type?(k.updateAutoInterval(a),f.resolve()):f.resolve())})["finally"](function(){delete k.variableLock[a.name]})},this.setVariableFromUrl=function(a,c){var e=d.when(!0);return a.refresh&&(e=this.updateOptions(a)),e.then(function(){var d=b.find(a.options,function(a){return a.text===c||a.value===c});return d=d||{text:c,value:c},k.updateAutoInterval(a),k.setVariableValue(a,d,!0)})},this.updateAutoInterval=function(a){if(a.auto){a.options.length&&"auto"!==a.options[0].text&&a.options.unshift({text:"auto",value:"$__auto_interval"});var b=c.calculateInterval(i.timeRange(),a.auto_count,a.auto_min?">"+a.auto_min:null);h.setGrafanaVariable("$__auto_interval",b)}},this.setVariableValue=function(c,d){return c.current=a.copy(d),b.isArray(c.current.text)&&(c.current.text=c.current.text.join(" + ")),k.selectOptionsForCurrentValue(c),h.updateTemplateData(),this.updateOptionsInChildVariables(c)},this.variableUpdated=function(a){return h.updateTemplateData(),this.updateOptionsInChildVariables(a)},this.updateOptionsInChildVariables=function(a){if(k.variableLock[a.name])return d.when();var c=b.map(k.variables,function(b){if(b!==a)return h.containsVariable(b.query,a.name)||h.containsVariable(b.datasource,a.name)?k.updateOptions(b):void 0});return d.all(c)},this._updateNonQueryVariable=function(a){return"datasource"===a.type?void k.updateDataSourceVariable(a):"constant"===a.type?void(a.options=[{text:a.query,value:a.query}]):(a.options=b.map(a.query.split(/[,]+/),function(a){return{text:a.trim(),value:a.trim()}}),"interval"===a.type?void k.updateAutoInterval(a):void("custom"===a.type&&a.includeAll&&k.addAllOption(a)))},this.updateDataSourceVariable=function(a){var b,d=[],e=f.getMetricSources({skipVariables:!0});a.regex&&(b=c.stringToJsRegex(h.replace(a.regex)));for(var g=0;g<e.length;g++){var i=e[g];i.meta.id===a.query&&(b&&!b.exec(i.name)||d.push({text:i.name,value:i.name}))}0===d.length&&d.push({text:"No data sources found",value:""}),a.options=d},this.updateOptions=function(a){return"query"!==a.type?(k._updateNonQueryVariable(a),k.validateVariableSelectionState(a)):f.get(a.datasource).then(b.partial(this.updateOptionsFromMetricFindQuery,a)).then(b.partial(this.updateTags,a)).then(b.partial(this.validateVariableSelectionState,a))},this.selectOptionsForCurrentValue=function(a){var c,d,e,f,g=[];for(c=0;c<a.options.length;c++)if(f=a.options[c],f.selected=!1,b.isArray(a.current.value))for(d=0;d<a.current.value.length;d++)e=a.current.value[d],f.value===e&&(f.selected=!0,g.push(f));else f.value===a.current.value&&(f.selected=!0,g.push(f));return g},this.validateVariableSelectionState=function(a){if(!a.current){if(!a.options.length)return;return k.setVariableValue(a,a.options[0],!1)}if(b.isArray(a.current.value)){var c=k.selectOptionsForCurrentValue(a);return c=0===c.length?a.options[0]:{value:b.map(c,function(a){return a.value}),text:b.map(c,function(a){return a.text}).join(" + ")},k.setVariableValue(a,c,!1)}var e=b.findWhere(a.options,{text:a.current.text});return e?k.setVariableValue(a,e,!1):a.options.length?k.setVariableValue(a,a.options[0]):d.when(null)},this.updateTags=function(a,b){return a.useTags?b.metricFindQuery(a.tagsQuery).then(function(c){a.tags=[];for(var d=0;d<c.length;d++)a.tags.push(c[d].text);return b}):(delete a.tags,b)},this.updateOptionsFromMetricFindQuery=function(a,b){return b.metricFindQuery(a.query).then(function(c){return a.options=k.metricNamesToVariableValues(a,c),a.includeAll&&k.addAllOption(a),a.options.length||a.options.push(j()),b})},this.getValuesForTag=function(a,c){return f.get(a.datasource).then(function(d){var e=a.tagValuesQuery.replace("$tag",c);return d.metricFindQuery(e).then(function(a){return b.map(a,function(a){return a.text})})})},this.metricNamesToVariableValues=function(a,d){var e,f,g,i;for(f={},a.regex&&(e=c.stringToJsRegex(h.replace(a.regex))),g=0;g<d.length;g++){var j=d[g],k=j.value||j.text,l=j.text||j.value;if(b.isNumber(k)&&(k=k.toString()),b.isNumber(l)&&(l=l.toString()),e){if(i=e.exec(k),!i)continue;i.length>1&&(k=i[1],l=k)}f[k]={text:l,value:k}}return b.sortBy(f,"text")},this.addAllOption=function(a){a.options.unshift({text:"All",value:"$__all"})}}])});