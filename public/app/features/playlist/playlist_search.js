/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["../../core/core_module"],function(a){function b(){return{restrict:"E",templateUrl:"public/app/features/playlist/partials/playlist_search.html",controller:d,bindToController:!0,controllerAs:"ctrl",scope:{searchStarted:"&"}}}var c,d;return a("playlistSearchDirective",b),{setters:[function(a){c=a}],execute:function(){d=function(){function a(a,b,c,d,e){var f=this;this.$scope=a,this.$location=b,this.$timeout=c,this.backendSrv=d,this.contextSrv=e,this.query={query:"",tag:[],starred:!1},c(function(){f.query.query="",f.searchDashboards()},100)}return a.$inject=["$scope","$location","$timeout","backendSrv","contextSrv"],a.prototype.searchDashboards=function(){this.tagsMode=!1;var a={};a.promise=this.backendSrv.search(this.query).then(function(a){return{dashboardResult:a,tagResult:[]}}),this.searchStarted(a)},a.prototype.showStarred=function(){this.query.starred=!this.query.starred,this.searchDashboards()},a.prototype.queryHasNoFilters=function(){return""===this.query.query&&this.query.starred===!1&&0===this.query.tag.length},a.prototype.filterByTag=function(a,b){this.query.tag.push(a),this.searchDashboards(),b&&(b.stopPropagation(),b.preventDefault())},a.prototype.getTags=function(){var a={};a.promise=this.backendSrv.get("/api/dashboards/tags").then(function(a){return{dashboardResult:[],tagResult:a}}),this.searchStarted(a)},a}(),a("PlaylistSearchCtrl",d),c["default"].directive("playlistSearch",b)}}});