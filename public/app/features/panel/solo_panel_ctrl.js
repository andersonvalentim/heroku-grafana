/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","jquery"],function(a,b){"use strict";var c=a.module("grafana.routes");c.controller("SoloPanelCtrl",["$scope","$routeParams","$location","dashboardLoaderSrv","contextSrv",function(a,c,d,e,f){var g;a.init=function(){f.sidemenu=!1;var b=d.search();g=parseInt(b.panelId),a.onAppEvent("dashboard-initialized",a.initPanelScope),e.loadDashboard(c.type,c.slug).then(function(b){b.meta.soloMode=!0,a.initDashboard(b,a)})},a.initPanelScope=function(){return a.row={height:b(window).height()+"px"},a.test="Hej",a.$index=0,a.panel=a.dashboard.getPanelById(g),a.panel?void(a.panel.span=12):void a.appEvent("alert-error",["Panel not found",""])},a.init()}])});