//@ui5-bundle ui5/walkthrough/Component-preload.js
sap.ui.require.preload({
	"ui5/walkthrough/Component.js":function(){
"use strict";sap.ui.define(["sap/ui/core/UIComponent","sap/ui/core/mvc/XMLView","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel"],function(e,t,n,i){"use strict";const o=e.extend("ui5.walkthrough.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"]},init:function t(){e.prototype.init.call(this);const o={recipient:{name:"World"}};const s=new n(o);this.setModel(s);const r=new i({bundleName:"ui5.walkthrough.i18n.i18n"});this.setModel(r,"i18n")},createContent:function e(){return t.create({viewName:"ui5.walkthrough.view.App",id:"app"})}});return o});
},
	"ui5/walkthrough/controller/App.controller.js":function(){
"use strict";sap.ui.define(["sap/m/MessageToast","sap/ui/core/mvc/Controller"],function(e,t){"use strict";const o=t.extend("ui5.walkthrough.controller.App",{onShowHello:function t(){const o=this.getView()?.getModel("i18n")?.getResourceBundle();const n=this.getView()?.getModel()?.getProperty("/recipient/name");const s=o.getText("helloMsg",[n])||"no text defined";e.show(s)}});return o});
},
	"ui5/walkthrough/i18n/i18n.properties":'showHelloButtonText=Say Hello\nhelloMsg=Hello {0}',
	"ui5/walkthrough/index.js":function(){
"use strict";sap.ui.define(["sap/ui/core/ComponentContainer"],function(t){"use strict";new t({id:"container",name:"ui5.walkthrough",settings:{id:"walkthrough"},autoPrefixId:true,async:true}).placeAt("content")});
},
	"ui5/walkthrough/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"ui5.walkthrough","type":"application","title":"OpenUI5 TypeScript Walkthrough","applicationVersion":{"version":"1.0.0"},"i18n":{"bundleUrl":"i18n/i18n.properties","supportedLocales":[""]}}}',
	"ui5/walkthrough/view/App.view.xml":'<mvc:View controllerName="ui5.walkthrough.controller.App"\n   xmlns="sap.m"\n   xmlns:mvc="sap.ui.core.mvc"><Button\n      text="{i18n>showHelloButtonText}"\n      press=".onShowHello"/><Input\n      value="{/recipient/name}"\n      description="Hello {/recipient/name}"\n      valueLiveUpdate="true"\n      width="60%"/></mvc:View>'
});
//# sourceMappingURL=Component-preload.js.map
