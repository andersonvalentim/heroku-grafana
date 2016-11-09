/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery"],function(a,b,c){"use strict";var d=a.module("grafana.controllers");d.controller("AnnotationsEditorCtrl",["$scope","datasourceSrv",function(d,e){var f={name:"",datasource:null,iconColor:"rgba(255, 96, 96, 1)",enable:!0};d.init=function(){d.mode="list",d.datasources=e.getAnnotationSources(),d.annotations=d.dashboard.annotations.list,d.reset(),d.$watch("mode",function(a){"new"===a&&d.reset()})},d.datasourceChanged=function(){return e.get(d.currentAnnotation.datasource).then(function(a){d.currentDatasource=a,d.currentAnnotation.datasource=d.currentAnnotation.datasource})},d.edit=function(a){d.currentAnnotation=a,d.currentIsNew=!1,d.datasourceChanged(),d.mode="edit",c(".tooltip.in").remove()},d.reset=function(){d.currentAnnotation=a.copy(f),d.currentAnnotation.datasource=d.datasources[0].name,d.currentIsNew=!0,d.datasourceChanged()},d.update=function(){d.reset(),d.mode="list",d.broadcastRefresh()},d.add=function(){d.annotations.push(d.currentAnnotation),d.reset(),d.mode="list",d.updateSubmenuVisibility(),d.broadcastRefresh()},d.removeAnnotation=function(a){var c=b.indexOf(d.annotations,a);d.annotations.splice(c,1),d.updateSubmenuVisibility(),d.broadcastRefresh()}}])});