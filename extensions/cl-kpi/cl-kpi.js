define(["jquery","underscore","qlik","client.utils/state","./lib/external/d3/d3.v4.min.js","./lib/external/lodash/lodash.js","./properties.js","./initialproperties.js","./lib/external/sense-extension-utils/general-utils.js","general.utils/responsive-state","objects.utils/num-date-time-formatter","general.utils/number-formatting","text!./lib/partials/template.html","text!./lib/partials/tooltip-template.html","text!./lib/css/style.css","text!./lib/css/climber-icons.css","text!./lib/theme.json","core.utils/environment"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){"use strict";return i.addStyleToHeader(o),p=r.inClient()?p.replace(/@@fontpath@@/g,"/extensions/"):p.replace(/@@fontpath@@/g,"/"),i.addStyleToHeader(p),{definition:g,initialProperties:h,snapshot:{canTakeSnapshot:!0},support:{"export":!0},resize:function(a,b){this.paint(a,b)},template:m,thinHeader:!0,controller:["$scope",function(f){f.infinityReplacementChar="-";var g=c.currApp(f.$parent);f.localeInfo=g.model.layout?g.model.layout.qLocaleInfo:{qDecimalSep:",",qThousandSep:" "},f.DEFAULT_AUTO_FORMAT="0A",f.initNumberFormatter=function(){f.numberFormatter=new k(f.localeInfo,f.DEFAULT_AUTO_FORMAT,f.localeInfo.qThousandSep,f.localeInfo.qDecimalSep,"U"),f.DEFAULT_AUTO_FORMAT=f.numberFormatter.createPatternFromRange(0,1,!0)},f.isSmallDevice=j.isSmallDevice,f.showOverlay=!1,f.scales={},f.theme=JSON.parse(q),f.color={background:f.theme.backgroundColor,defaultBlendFactor:.3},f.showIcon=function(){var a=!f.options.showIconWithTitle&&!f.options.hideIcon;return a},f.showIconWithTitle=function(){var a=f.options.showIconWithTitle&&!f.options.hideIcon;return a},f.getSentimentFromValues=function(a){var b,c=a.value01-a.value02;b="3-colors"===a.colorMode&&a.comparisionIsRelative?a.banding/100*a.value02:"3-colors"!==a.colorMode||a.comparisionIsRelative?0:a.banding;var d=c>=0?1:-1;return"less_is_better"===a.comparisonType&&(d=-d),0!==b&&("more_is_better"===a.comparisonType&&-c>0&&b>-c?d=0:"less_is_better"===a.comparisonType&&c>0&&b>c&&(d=0)),d},f.getColor=function(a,b,c){var d=1;if("argb("===a.substring(0,5).toLowerCase()){var g=a.substr(5,a.length-6).split(",");4===g.length&&(d=g[0]/255,a="rgba("+g[1]+","+g[2]+","+g[3]+","+d+")")}if(b&&void 0===c)return e.color(e.interpolateRgb(f.color.background,e.rgb(a))(f.color.defaultBlendFactor*d)).toString();if(b&&void 0!==c)return e.color(e.interpolateRgb(f.color.background,e.rgb(a))(c*d)).toString();if(c>=0&&!b){var h=e.rgb(a);return h.opacity=c*d,h.toString()}return e.color(a).toString()},f.options={},f.gotoSheet=function(){!b.isEmpty(f.options.sheetId)&&d.isInAnalysisMode()&&(f.doActionBeforeNavigation(),c.navigation.gotoSheet(f.options.sheetId))},f.setVariable=function(a,d){if(!b.isEmpty(a)&&!b.isEmpty(d)){var e=c.currApp();e.variable.setContent(a,d)}},f.selectValueInField=function(a,d){if(!b.isEmpty(a)&&!b.isEmpty(d)){var e=c.currApp();e.field(a).selectMatch(d,!1)}},f.splitToStringNum=function(a,b){for(var c=a.split(b),d=0;d<c.length;d++)isNaN(c[d])||(c[d]=Number(c[d]));return c},f.getValuesArrayFromStringWithSeparator=function(a,c){var d=b.map(a.split(c),function(a){var b=a.trim();return Number.isNaN(parseFloat(b))?b:Number(b)});return d},f.selectValuesInField=function(a,d,e){if(!b.isEmpty(a)&&!b.isEmpty(d)){var g=c.currApp(),h=f.getValuesArrayFromStringWithSeparator(d,e);g.field(a).selectValues(h,!1)["catch"](function(a){})}},f.clearSelectionsInField=function(a){if(!b.isEmpty(a)){var d=c.currApp();d.field(a).clear()["catch"](function(a){})}},f.doActionBeforeNavigation=function(){switch(f.options.navigation.actionBeforeNavigation){case"clearSelectionsInField":f.clearSelectionsInField(f.options.navigation.field);break;case"selectValueInField":f.selectValueInField(f.options.navigation.field,f.options.navigation.value);break;case"selectValuesInField":f.selectValuesInField(f.options.navigation.field,f.options.navigation.values,f.options.navigation.valuesSeparator);break;case"setVariable":f.setVariable(f.options.navigation.variable,f.options.navigation.variableValue)}},f.formatValue=function(a,b){return a?(f.numberFormatter.pattern=b,f.numberFormatter.format(+a).replace("Infinity",f.infinityReplacementChar)):""},f.mouseover=function(){(f.options.navigation.mode||f.options.showDetails)&&(f.showOverlay=!0)},f.mouseout=function(){(f.options.navigation.mode||f.options.showDetails)&&(f.showOverlay=!1)},f.updateTooltip=function(b,c,d,e){var g,h=b.x-f.options.margins.left;g=h<=d.range()[0]?0:h>=d.range()[1]?d.domain().length-1:Math.round(h/(d.range()[1]-d.range()[0])*(d.domain().length-1));var i=f.options.transformedData[0].values[g],j=2===f.options.transformedData.length,k=j?f.options.transformedData[1].values[g]:{},l="",m="rgb(255,255,255)";if(f.options.inTargetMode&&!f.options.targetColorModeIsExpression){f.options.comparisionIsRelative?(l=f.formatValue(k.y.value<0?1-i.y.value/k.y.value:i.y.value/k.y.value-1,f.options.formats.comparison),""===l&&(l="0%")):l=f.formatValue(i.y.value-k.y.value,f.options.formats.comparison);var o={value01:i.y.value,value02:k.y.value,comparisonType:f.options.comparison.type,comparisionIsRelative:f.options.comparisionIsRelative,banding:f.options.comparison.banding,colorMode:f.options.comparison.colorMode},p=f.getSentimentFromValues(o);1===p?m=f.options.comparison.colors.good:0===p?m=f.options.comparison.colors.goodEnough:-1===p&&(m=f.options.comparison.colors.bad)}var q=8;f.tooltip.style("max-width",a(window).width()-q+"px").html(n);var r=a("div.cl-tooltip"),s=[];f.options.trend.showZerosAsGaps&&"NaN"===i.y.value&&j?(l="",s.push(k)):(s.push(i),j&&s.push(k)),r.find(".cl-tooltip__dimension-label").html(s[0].x.text),r.find(".cl-tooltip__kpi-color").css("background-color",s[0].colorMarker),r.find(".cl-tooltip__kpi-cell").html(s[0].y.text),f.options.inTargetMode&&""!==l?(r.find(".cl-tooltip__comparision-cell").html(l),r.find(".cl-tooltip__comparision-cell").css("color",m)):r.find(".cl-tooltip__comparision-cell").remove(),s.length>1?(r.find(".cl-tooltip__target-color").css("background-color",s[1].colorMarker),r.find(".cl-tooltip__target-cell").html(s[1].y.text)):r.find(".cl-tooltip__target-row").remove();var t=r.outerWidth(),u=r.outerHeight(),v={element:{x:c.x-b.x,y:c.y-b.y}};v.point={x:v.element.x+f.options.margins.left+d(s[0].x.text),y:v.element.y+f.options.margins.top+f.options.trendChartOffsetY+e(s[0].y.value)},"bar"===f.options.transformedData[0].type&&(v.point.x+=d.bandwidth()/2);var w=8,x=-2;if(a(".cl-tooltip").length){var y=window.getComputedStyle(document.querySelector(".cl-tooltip"),":after");w=Number(y.getPropertyValue("border-bottom-width").replace("px",""))+Number(y.getPropertyValue("border-top-width").replace("px","")),x=-w/4}var z=u+w+2,A=t/2,B=x+f.options.margins.left/2;v.point.x<t/2?(A=v.point.x,A+=-B):a(window).width()-v.point.x<t/2&&(A=t-(a(window).width()-v.point.x),A+=B),0===a("#cl-tooltip").length&&a("<style type='text/css' id='cl-tooltip' />").appendTo("head"),a("#cl-tooltip").text(".cl-tooltip:after{left:"+A+"px;}"),f.tooltip.style("left",v.point.x-A+"px").style("top",v.point.y-z+"px").style("display","inline-block")},f.$watch("$parent.layout.props.animate",function(a){f.options.animate=a}),f.$on("$destroy",function(){a("div.cl-tooltip").remove()})}],paint:function(d,g){void 0!==g.props.canTakeSnapshot&&(this.$scope.$parent.ext.snapshot.canTakeSnapshot=g.props.canTakeSnapshot);var h=g.qInfo.qId;void 0===g.props.canMaximize||g.props.canMaximize?a('div[tid="'+h+'"] .qv-object-cl-kpi .lui-icon--expand').css("display","inherit"):a('div[tid="'+h+'"] .qv-object-cl-kpi .lui-icon--expand').css("display","none");var i=this,j=function(){return 1===g.qHyperCube.qDimensionInfo.length},m=function(){return g.props.target.mode&&g.qHyperCube.qMeasureInfo.length>=2},n=function(){return g.props.layout.color.mode},o=function(a){var b="#"+a.toString(16).substr(2);return b.length>4?b:!1},p=function(a){var b="#"+a.toString(16).substr(2);return b.length>4?parseInt(a.toString(16).substr(0,2),16)/255:1},q=function(a){var b=e.rgb(o(a));return b.opacity=p(a),b.toString()},r=function(a,b,c){var d=.7,e=.6;"large"===c&&(d=.65,e=.55);var f=a>b?b*d:a*e;return f+"px"},s=function(a){if(a.qHyperCube.qGrandTotalRow.length<2)return void 0;if("byExpression"===a.props.color.target.mode)return a.props.iconDirectionExpression;var b={value01:a.qHyperCube.qGrandTotalRow[0].qNum,value02:a.qHyperCube.qGrandTotalRow[1].qNum,comparisonType:a.props.target.comparisonType,comparisionMode:a.props.target.comparison,comparisionIsRelative:"relative"===a.props.target.comparison?!0:!1,banding:a.props.target.banding,colorMode:a.props.color.target.mode};return i.$scope.getSentimentFromValues(b)},t=function(a){if("byExpression"===a.props.color.target.mode)return a.props.color.colorExpressions.target;var b=s(a);return 1===b?a.props.color.customColors.good.color:0===b?a.props.color.customColors.goodEnough.color:-1===b?a.props.color.customColors.bad.color:void 0},u=function(a){var b,c="cl-icon-"+(a.props.target.iconUp?a.props.target.iconUp:a.props.target.icon),d="cl-icon-"+(a.props.target.iconRight?a.props.target.iconRight:a.props.target.icon.replace("-up","-right")),e="cl-icon-"+(a.props.target.iconDown?a.props.target.iconDown:a.props.target.icon.replace("-up","-down")),f=s(a);b=-1===f?e:1===f?c:d;var g={icon:b};return g},v=function(a){return m()?u(a):{icon:"cl-icon-"+a.props.icon}},w=function(a){var b={background:a.props.color.customColors.background.color,icon:a.props.color.customColors.icon.color,targetTrend:a.props.color.customColors.targetTrend.color,text:a.props.color.customColors.text.color,trend:a.props.color.customColors.trend.color};return"byExpression"===a.props.color.other.mode&&(b.background=a.props.color.colorExpressions.background,b.text=a.props.color.colorExpressions.text,b.iconAndTrend=a.props.color.colorExpressions.iconAndTrend),"byExpression"===a.props.color.icon.mode&&(b.icon=i.$scope.getColor(a.props.color.colorExpressions.icon)),"byExpression"===a.props.color.trend.mode&&(b.trend=i.$scope.getColor(a.props.color.colorExpressions.trend)),b},x=function(a){var b=w(a),c={navigation:i.$scope.getColor(a.props.color.overlay.navigationColor.color),overlay:i.$scope.getColor(a.props.color.overlay.bgcolor.color,!1,a.props.color.overlay.opacity),text:i.$scope.getColor(b.text),background:"",icon:"",targetTrend:"",targetTrendMarker:"",targetTrendLegend:"",trend:"",trendMarker:"",trendLegend:""};return m()?(b.target=t(a),n()?c.background=i.$scope.getColor(b.target):b.icon=b.target):n()&&(c.background=i.$scope.getColor(b.background)),i.$scope.color.background=n()?c.background:i.$scope.theme.backgroundColor,c.icon=i.$scope.getColor(b.icon),j()&&(a.props.color.trend.iconIndependence||(b.trend=b.icon),a.props.color.trend.autoblend?(c.trend=i.$scope.getColor(b.trend,!1,i.$scope.color.defaultBlendFactor),c.trendMarker=i.$scope.getColor(b.trend,!0,i.$scope.color.defaultBlendFactor)):(c.trend=i.$scope.getColor(b.trend,!1,a.props.color.trend.blendFactor),c.trendMarker=i.$scope.getColor(b.trend,!0,a.props.color.trend.blendFactor)),a.props.color.targetTrend.autoblend?(c.targetTrend=i.$scope.getColor(b.targetTrend,!1,i.$scope.color.defaultBlendFactor),c.targetTrendMarker=i.$scope.getColor(b.targetTrend,!0,i.$scope.color.defaultBlendFactor)):(c.targetTrend=i.$scope.getColor(b.targetTrend,!1,a.props.color.targetTrend.blendFactor),c.targetTrendMarker=i.$scope.getColor(b.targetTrend,!0,a.props.color.targetTrend.blendFactor)),c.trendLegend=b.trend,c.targetTrendLegend=b.targetTrend),c},y=function(a,b,c){var d={small:12,medium:10,large:9},e={small:6,medium:4,large:3};c=d[c]?c:"medium";var f=a/d[c],g=b/e[c],h=f>g?g:f;return h+"px"},z=function(a){var b={one:3,two:7,three:2,four:2};return"comparisonFocus"===a.textLayoutMode?b.two=5:"comparison"===a.textLayoutMode&&(b.two=5,b.three=4),b};if("relative"!==g.props.target.comparison&&g.qHyperCube.qMeasureInfo.length>0){var A=l.getNormalizedFormat(g.qHyperCube.qMeasureInfo[0].qNumFormat,g.qHyperCube.qMeasureInfo[0].qNumFormat.qFmt),B=g.qHyperCube.qMeasureInfo[0].qNumFormat.qType,C="",D="";["D","T","TS","IV"].indexOf(B)<0&&(C=g.qHyperCube.qMeasureInfo[0].qNumFormat.qThou,D=g.qHyperCube.qMeasureInfo[0].qNumFormat.qDec),i.$scope.numberFormatter=new k(i.$scope.localeInfo,A,C,D,B)}else i.$scope.initNumberFormatter();var E={id:g.qInfo.qId,animate:g.props.animate,comparisionIsRelative:"relative"===g.props.target.comparison,showTooltip:j()&&"tooltip"===g.props.hoverMode,showDetails:"details"===g.props.hoverMode,showIconWithTitle:g.props.showIconWithTitle?!0:!1,hideKpiLabel:g.props.hideKpiLabel,wrapKpiLabel:g.props.wrapKpiLabel?"wrap":"no-wrap",hideTargetValue:g.props.hideTarget,hideTargetLabel:g.props.hideTargetLabel,hideIcon:g.props.hideIcon||"icon"===g.props.backgroundImageMode,showBackgroundImage:"url"===g.props.backgroundImageMode||"contentlibrary"===g.props.backgroundImageMode,showBackgroundIcon:"icon"===g.props.backgroundImageMode&&!g.props.hideIcon,backgroundImageUrl:"contentlibrary"===g.props.backgroundImageMode?encodeURI(".."+g.props.backgroundContentLibraryImage):g.props.backgroundImageURL,backgroundImageSizeMode:g.props.backgroundImageSizeMode,inTargetMode:m(),targetColorModeIsExpression:"byExpression"===g.props.color.target.mode,comparison:{type:g.props.target.comparisonType,banding:g.props.target.banding,colorMode:g.props.color.target.mode,colors:{good:g.props.color.customColors.good.color,goodEnough:g.props.color.customColors.goodEnough.color,bad:g.props.color.customColors.bad.color}},hoverMode:g.props.hoverMode,hidethirdmeasure:g.props.hidethirdmeasure,sheetId:g.props.sheetId,navigation:{mode:"navigation"===g.props.hoverMode,showButton:g.props.navigation.showButton,text:g.props.navigation.text,actionBeforeNavigation:g.props.actionBeforeNavigation,field:g.props.field.replace(/\=/g,""),value:g.props.value,values:g.props.values,valuesSeparator:g.props.valuesSeparatorComma?",":g.props.valuesSeparatorCustom,variable:g.props.variable,variableValue:g.props.variableValue},labels:{},measures:{},formats:{},domains:{},trend:{},icons:v(g),color:x(g),textSize:g.props.layout.textSize,textWeight:g.props.layout.boldText?"bold":"normal",align:g.props.kpiAlign,layoutMode:g.props.layout.mode,textLayoutMode:g.props.target.layout.mode,size:{height:d.height(),width:d.width()},marginType:g.props.layout.marginType?g.props.layout.marginType:"default"};E.backgroundIconSize=r(d.width(),d.height(),E.marginType);var F={"default":{top:8,bottom:8,left:8,right:8},none:{top:0,bottom:0,left:0,right:0},large:{top:16,bottom:16,left:16,right:16}},G={"default":{left:0,right:0},none:{left:8,right:8},large:{left:0,right:0}};if(E.trendChartOffsetY=0,E.margins=b.clone(F[E.marginType]),E.padding=b.clone(G[E.marginType]),E.size.innerHeight=E.size.height-E.margins.top-E.margins.bottom,E.size.innerWidth=E.size.width-E.margins.left-E.margins.right,E.size.textWrapperHeight=E.size.innerHeight,E.size.textWrapperWidth=E.size.innerWidth-E.padding.left-E.padding.right,"top"===g.props.layout.mode&&(E.size.innerHeight=.5*E.size.innerHeight+E.margins.top,E.size.textWrapperHeight=.5*E.size.textWrapperHeight+E.margins.bottom,E.trendChartOffsetY=E.size.textWrapperHeight-E.margins.bottom-E.margins.top),E.blockSizes=z(E),j()&&(E.trend={chartType:g.qHyperCube.qDimensionInfo[0].trend.chartType,targetChartType:g.qHyperCube.qDimensionInfo[0].trend.showTargetTrend?g.qHyperCube.qDimensionInfo[0].trend.targetChartType:"",showDatapoints:g.qHyperCube.qDimensionInfo[0].trend.showDatapoints,showTargetDatapoints:g.qHyperCube.qDimensionInfo[0].trend.showTargetDatapoints,showZerosAsGaps:g.qHyperCube.qDimensionInfo[0].trend.showZerosAsGaps}),m()){var H;"relative"===g.props.target.comparison?(E.formats.comparison="0%",1===g.props.target.precision&&(E.formats.comparison="0"+i.$scope.localeInfo.qDecimalSep+"0%"),2===g.props.target.precision&&(E.formats.comparison="0"+i.$scope.localeInfo.qDecimalSep+"00%"),H=g.qHyperCube.qGrandTotalRow[0].qNum/g.qHyperCube.qGrandTotalRow[1].qNum-1,E.measures.comparison=i.$scope.formatValue(H,E.formats.comparison)):(E.formats.comparison=g.qHyperCube.qMeasureInfo[0].qIsAutoFormat?i.$scope.DEFAULT_AUTO_FORMAT:g.qHyperCube.qMeasureInfo[0].qNumFormat.qFmt,H=g.qHyperCube.qGrandTotalRow[0].qNum-g.qHyperCube.qGrandTotalRow[1].qNum,E.measures.comparison=i.$scope.formatValue(H,E.formats.comparison))}if(g.qHyperCube.qMeasureInfo.length>0?(E.labels.kpi=""===g.props.kpiLabel?g.qHyperCube.qMeasureInfo[0].qFallbackTitle:g.props.kpiLabel,E.measures.kpi=g.qHyperCube.qMeasureInfo[0].qIsAutoFormat?i.$scope.formatValue(g.qHyperCube.qGrandTotalRow[0].qNum,i.$scope.DEFAULT_AUTO_FORMAT):g.qHyperCube.qGrandTotalRow[0].qText,E.formats.kpi=g.qHyperCube.qMeasureInfo[0].qIsAutoFormat?i.$scope.DEFAULT_AUTO_FORMAT:g.qHyperCube.qMeasureInfo[0].qNumFormat.qFmt):E.noMeasures=!0,g.qHyperCube.qMeasureInfo.length>1&&(E.labels.target=""===g.props.targetLabel?g.qHyperCube.qMeasureInfo[1].qFallbackTitle:g.props.targetLabel,E.labels.comparison=m()?g.props.target.comparisonLabel:"",E.labels.target=""!==E.labels.comparison?g.props.target.comparisonLabel:E.labels.target,E.measures.target=g.qHyperCube.qGrandTotalRow[1]?g.qHyperCube.qMeasureInfo[1].qIsAutoFormat?i.$scope.formatValue(g.qHyperCube.qGrandTotalRow[1].qNum,i.$scope.DEFAULT_AUTO_FORMAT):g.qHyperCube.qGrandTotalRow[1].qText:"",E.formats.target=g.qHyperCube.qMeasureInfo[1]&&g.qHyperCube.qMeasureInfo[1].qIsAutoFormat?i.$scope.DEFAULT_AUTO_FORMAT:g.qHyperCube.qMeasureInfo[1]?g.qHyperCube.qMeasureInfo[1].qNumFormat.qFmt:i.$scope.DEFAULT_AUTO_FORMAT),E.fontsize=y(E.size.textWrapperWidth,E.size.textWrapperHeight,E.textSize),E.fontsizeOverlay=y(E.size.textWrapperWidth,E.size.height-E.margins.top-E.margins.bottom,E.textSize),this.$scope.options=E,d.find(".trendchart").empty(),j()){E.transformedData=f.compact(b.map(g.qHyperCube.qMeasureInfo,function(a,c){if(3!==g.qHyperCube.qMeasureInfo.length||1!==c){var d=0===c,e=d?E.color.trend:E.color.targetTrend,f=d?E.color.trendMarker:E.color.targetTrendMarker,h=a.qIsAutoFormat?i.$scope.DEFAULT_AUTO_FORMAT:void 0,j=d?E.trend.chartType:E.trend.targetChartType,k=!1,l=b.map(g.qHyperCube.qDataPages[0].qMatrix,function(b){var d={x:{text:b[0].qText},y:{text:h?i.$scope.formatValue(b[c+1].qNum,h):b[c+1].qText,value:b[c+1].qNum},id:c,color:e,colorMarker:f};if(a.colorizeDatapoint&&b[c+1].qAttrExps&&"NaN"!==b[c+1].qAttrExps.qValues[0].qNum&&("bar"===j||"marker"===j))d.color=q(b[c+1].qAttrExps.qValues[0].qNum),d.colorMarker=d.color;else if(b[1].qNum&&b.length>2&&b[2].qNum&&(2===c&&!g.qHyperCube.qMeasureInfo[1].colorizeSetByExpression&&g.qHyperCube.qMeasureInfo[1].colorizeDatapoint||a.colorizeDatapoint&&!g.qHyperCube.qMeasureInfo[c].colorizeSetByExpression)){var k={value01:b[1].qNum,value02:b[2].qNum,comparisonType:i.$scope.options.comparison.type,comparisionIsRelative:i.$scope.options.comparisionIsRelative,banding:i.$scope.options.comparison.banding,colorMode:i.$scope.options.comparison.colorMode},l=i.$scope.getSentimentFromValues(k);1===l?(d.color=i.$scope.getColor(i.$scope.options.comparison.colors.good,!0),d.colorMarker=i.$scope.options.comparison.colors.good):0===l?(d.color=i.$scope.getColor(i.$scope.options.comparison.colors.goodEnough,!0),d.colorMarker=i.$scope.options.comparison.colors.goodEnough):-1===l&&(d.color=i.$scope.getColor(i.$scope.options.comparison.colors.bad,!0),d.colorMarker=i.$scope.options.comparison.colors.bad)}return E.trend.showZerosAsGaps&&0===c&&0===d.y.value&&(d.y.value="NaN"),d});1===l.length&&(d?"area"===j?j="bar":"line"===j&&(j="marker"):""!==j&&(j="marker")),"marker"===j?k=!0:"line"===j&&(k=d?E.trend.showDatapoints:E.trend.showTargetDatapoints);var m={id:c,type:j,values:l,showDatapoints:k,color:e,colorMarker:f};return m}})),E.domains.x=b.map(g.qHyperCube.qDataPages[0].qMatrix,function(a){return a[0].qText});var I=e.select(d.get(0)).select(".trendchart").append("svg").attr("width",E.size.width).attr("height",E.size.height),J=I.selectAll("g").data([E.transformedData]).enter().append("g").attr("transform","translate("+E.margins.left+","+(E.margins.top+E.trendChartOffsetY)+")"),K=e.scaleBand().range([0,E.size.innerWidth]).paddingInner(.2).paddingOuter(0);K.domain(E.domains.x);var L="bar"===E.trend.chartType?K.bandwidth()/2:0,M=e.scalePoint().range([0+L,E.size.innerWidth-L]);M.domain(E.domains.x);var N=e.scaleLinear().range([E.size.innerHeight,0]),O=[],P=[],Q=g.qHyperCube.qDimensionInfo[0].measureAxis.min,R=g.qHyperCube.qDimensionInfo[0].measureAxis.max,S=g.qHyperCube.qMeasureInfo[0].qMax<0?0:g.qHyperCube.qMeasureInfo[0].qMax,T=g.qHyperCube.qMeasureInfo[0].qMin,U=g.qHyperCube.qMeasureInfo.length-1,V=g.qHyperCube.qMeasureInfo[U].qMax,W=g.qHyperCube.qMeasureInfo[U].qMin,X=g.qHyperCube.qDimensionInfo[0].measureAxis.minMax;if("minMax"===X&&Q>R){var Y=Q;Q=R,R=Y}g.qHyperCube.qDimensionInfo[0].measureAxis.autoMinMax||"auto"===X?(P.push(S),O.push(T),""!==E.trend.targetChartType&&g.qHyperCube.qMeasureInfo.length>1&&(P.push(V),O.push(W))):"min"===X?(O.push(Q),P.push(S),""!==E.trend.targetChartType&&g.qHyperCube.qMeasureInfo.length>1&&P.push(V)):"max"===X?(P.push(R),O.push(T),""!==E.trend.targetChartType&&g.qHyperCube.qMeasureInfo.length>1&&O.push(W)):"minMax"===X&&(O.push(Q),P.push(R)),N.domain([e.min(O),e.max(P)]),g.qHyperCube.qDimensionInfo[0].measureAxis.autoMinMax&&N.nice(),i.$scope.scales.x=M,i.$scope.scales.xBar=K,i.$scope.scales.y=N;var Z=0;N.domain()[0]>0&&N.domain()[1]>0?Z=N.domain()[0]:N.domain()[0]<0&&N.domain()[1]<0&&(Z=N.domain()[1]);var $=e.area().defined(function(a){return"NaN"!==a.y.value}).curve(e.curveLinear).x(function(a){return M(a.x.text)}).y0(N(Z)).y1(function(a){return N(a.y.value)}),_=e.line().defined(function(a){return"NaN"!==a.y.value}).curve(e.curveLinear).x(function(a){return M(a.x.text)}).y(function(a){return N(a.y.value)}),aa=J.selectAll(".trendchart__series").data(function(a){return a}).enter().append("g").attr("class",function(a){return"trendchart__series trendchart__series--"+a.id});aa.filter(function(a){return"line"===a.type}).append("path").attr("class","trendchart__line").attr("d",function(a){return _(a.values)}).style("stroke",function(a){return a.color}).style("stroke-opacity",function(a){return a.opacity}).style("fill","none"),aa.filter(function(a){return a.showDatapoints}).selectAll("g.trendchart__circles").data(function(a){return[a]}).enter().append("g").attr("class","trendchart__circles").selectAll("marker").data(function(a){return a.values}).enter().filter(function(a){return"NaN"!==a.y.value}).append("circle").attr("class","trendchart__circle").attr("r",4).attr("cx",function(a){return M(a.x.text)}).attr("cy",function(a){return N(a.y.value)}).style("fill",function(a){return a.colorMarker}),aa.filter(function(a){return"area"===a.type}).append("path").attr("class","trendchart__area").attr("d",function(a){return $(a.values)}).style("fill",function(a){return a.color}),aa.filter(function(a){return"bar"===a.type}).selectAll("g.trendchart__bars").data(function(a){return[a]}).enter().append("g").attr("class","trendchart__bars").selectAll("bar").data(function(a){return a.values}).enter().filter(function(a){return"NaN"!==a.y.value}).append("rect").attr("class","trendchart__bar").attr("x",function(a){return K(a.x.text)}).attr("width",K.bandwidth()).attr("y",function(a){return N(Math.max(0,a.y.value))}).attr("height",function(a){return Math.abs(N(a.y.value)-N(0))}).style("fill",function(a){return a.color});var ba=e.select("body").selectAll("div.cl-tooltip").data(["tooltip"]);ba.enter().append("div").attr("class","cl-tooltip").style("opacity",0),ba.exit().remove(),i.$scope.tooltip=e.select("body").select("div.cl-tooltip"),e.select(d.get(0)).select(".kpi-interaction-layer").on("mouseover",function(){i.$scope.options.showTooltip&&(i.$scope.tooltip.transition().style("opacity",.9),i.$scope.updateTooltip({x:e.mouse(this)[0],y:e.mouse(this)[1]},{x:e.event.pageX,y:e.event.pageY},"bar"===E.trend.chartType?K:M,N))}).on("mousemove",function(){i.$scope.options.showTooltip&&i.$scope.updateTooltip({x:e.mouse(this)[0],y:e.mouse(this)[1]},{x:e.event.pageX,y:e.event.pageY},"bar"===E.trend.chartType?K:M,N)}).on("mouseout",function(){i.$scope.options.showTooltip&&i.$scope.tooltip.transition().style("opacity",0)})}return i.$scope.options=E,c.Promise.resolve()}}});