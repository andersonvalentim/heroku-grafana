/*! grafana - v3.1.1-1470047149 - 2016-08-01
 * Copyright (c) 2016 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["app/core/core_module","app/core/app_events"],function(a){var b,c,d;return{setters:[function(a){b=a},function(a){c=a}],execute:function(){d=function(){function a(a,b){this.$rootScope=a,this.$modal=b}return a.$inject=["$rootScope","$modal"],a.prototype.init=function(){c["default"].on("show-modal",this.showModal.bind(this),this.$rootScope)},a.prototype.showModal=function(a){a.model&&(a.scope=this.$rootScope.$new(),a.scope.model=a.model);var b=this.$modal({modalClass:a.modalClass,template:a.src,templateHtml:a.templateHtml,persist:!1,show:!1,scope:a.scope,keyboard:!1,backdrop:a.backdrop});Promise.resolve(b).then(function(a){a.modal("show")})},a}(),a("UtilSrv",d),b["default"].service("utilSrv",d)}}});