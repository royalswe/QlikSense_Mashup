define(["client.property-panel/component-utils","client.property-panel/components/components"],function(a,b){var c='<div class="pp-component pp-button-component" tcl="button"><button class="lui-button" qva-activate="action()" ng-disabled="disabled">{{label}}</button></div>',d=function(a,b,c){var d=a.definition[c];"function"==typeof d?Object.defineProperty(a,c,{get:function(){var c=function(){a.$emit("saveProperties")};return d(a.data,c,b,a.args)}}):d&&(a[c]=d)},e={template:c,controller:["$scope",function(b){var c=function(){return b.data};a.defineLabel(b,b.definition,c,b.args.handler),d(b,b.args.handler,"action"),Object.defineProperty(b,"disabled",{get:b.definition.disabled})}]};return b.addComponent("pp-cl-kpi-update-button",e),e});