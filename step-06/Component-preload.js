//@ui5-bundle ui5/walkthrough/Component-preload.js
sap.ui.require.preload({
	"ui5/walkthrough/controller/App.controller.js":function(){
"use strict";sap.ui.define(["sap/m/MessageToast","sap/ui/core/mvc/Controller"],function(o,e){"use strict";const t=e.extend("ui5.walkthrough.controller.App",{onShowHello:function e(){o.show("Hello World")}});return t});
},
	"ui5/walkthrough/index.js":function(){
"use strict";sap.ui.define(["sap/ui/core/mvc/XMLView"],function(e){"use strict";e.create({viewName:"ui5.walkthrough.view.App",id:"app"}).then(function(e){e.placeAt("content")})});
},
	"ui5/walkthrough/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"ui5.walkthrough","type":"application","title":"OpenUI5 TypeScript Walkthrough","applicationVersion":{"version":"1.0.0"}}}',
	"ui5/walkthrough/view/App.view.xml":'<mvc:View controllerName="ui5.walkthrough.controller.App"\n   xmlns="sap.m"\n   xmlns:mvc="sap.ui.core.mvc"><Button\n      text="Say Hello"\n      press=".onShowHello"/></mvc:View>'
});
//# sourceMappingURL=Component-preload.js.map
