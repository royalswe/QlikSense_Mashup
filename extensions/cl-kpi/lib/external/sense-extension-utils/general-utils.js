define(["qlik","jquery","underscore","qvangular"],function(a,b,c,d){"use strict";function e(a,d){if(d&&!c.isEmpty(d)&&!b("#"+d).length){var e=b(document.createElement("link"));e.attr("rel","stylesheet"),e.attr("type","text/css"),e.attr("href",a),d&&!c.isEmpty(d)&&e.attr("id",d),b("head").append(e)}}function f(a,c){c&&"string"==typeof c?b("#"+c).length||b("<style>").attr("id",c).html(a).appendTo("head"):b("<style>").html(a).appendTo("head")}function g(){var a=window.location.pathname.substr(0,window.location.pathname.toLowerCase().lastIndexOf("/sense")+1),b=window.location.href;return b=b.split("/"),b[0]+"//"+b[2]+("/"===a[a.length-1]?a.substr(0,a.length-1):a)}function h(a){var b=k.defer(),c=g()+"/extensions/"+a+"/"+a+".qext";return l.get(c).then(function(a){b.resolve(a.data)})["catch"](function(a){b.reject(a)}),b.promise}function i(a){return window.location.pathname.substr(0,window.location.pathname.toLowerCase().lastIndexOf("/sense")+1)+"extensions/"+a}function j(){var b=k.defer(),d=a.getGlobal({});return d.getProductVersion(function(a){for(var d=a.qReturn,e=xIndexOf(d,".",2),f=d.substr(e+1),g=f.split(),h=0,i=0;i<g.length;i++)if(!c.isNumber(g[i])){h=i+1;break}b.resolve(d.substr(0,e+1+h))}),b.promise}var k=d.getService("$q"),l=d.getService("$http");return"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(a){if(null==a)return!1;var b=a.length;if(this.length<b)return!1;for(--b;b>=0&&this[b]===a[b];--b);return 0>b}),{addStyleToHeader:f,addStyleLinkToHeader:e,getExtensionInfo:h,getExtensionPath:i,getProductVersion:j,getBasePath:g}});