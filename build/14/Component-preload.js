//@ui5-bundle ui5/walkthrough/Component-preload.js
sap.ui.predefine("ui5/walkthrough/Component", ["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel"],function(n,t){"use strict";const e=n.extend("ui5.walkthrough.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],manifest:"json"},init:function e(){n.prototype.init.call(this);const o={recipient:{name:"World"}};const i=new t(o);this.setModel(i)}});return e});
sap.ui.predefine("ui5/walkthrough/controller/App.controller", ["sap/ui/core/mvc/Controller","sap/m/MessageToast"],function(e,t){"use strict";const o=e.extend("ui5.walkthrough.controller.App",{onShowHello:function e(){const o=this.getView()?.getModel()?.getProperty("/recipient/name");const n=this.getView()?.getModel("i18n")?.getResourceBundle();const s=n.getText("helloMsg",[o]);t.show(s)}});return o});
sap.ui.require.preload({
	"ui5/walkthrough/i18n/i18n.properties":'# Manifest\nappTitle=Hello World\nappDescription=A simple walkthrough app that explains the most important concepts of OpenUI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=UI5 TypeScript Walkthrough\nhelloPanelTitle=Hello World',
	"ui5/walkthrough/manifest.json":'{"_version":"1.60.0","sap.app":{"id":"ui5.walkthrough","type":"application","i18n":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""},"title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.132","libs":{"sap.ui.core":{},"sap.m":{}}},"rootView":{"viewName":"ui5.walkthrough.view.App","type":"XML","id":"app"},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ui5.walkthrough.i18n.i18n","supportedLocales":[""],"fallbackLocale":""}}},"resources":{"css":[{"uri":"css/style.css"}]}}}',
	"ui5/walkthrough/view/App.view.xml":'<mvc:View\n\tcontrollerName="ui5.walkthrough.controller.App"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"><Shell><App class="myAppDemoWT"><pages><Page title="{i18n>homePageTitle}"><content><Panel\n\t\t\t\t\t\t\theaderText="{i18n>helloPanelTitle}"\n\t\t\t\t\t\t\tclass="sapUiResponsiveMargin"\n\t\t\t\t\t\t\twidth="auto"><content><Button\n\t\t\t\t\t\t\t\t\ttext="{i18n>showHelloButtonText}"\n\t\t\t\t\t\t\t\t\tpress=".onShowHello"\n\t\t\t\t\t\t\t\t\tclass="myCustomButton"/><Input\n\t\t\t\t\t\t\t\t\tvalue="{/recipient/name}"\n\t\t\t\t\t\t\t\t\tvalueLiveUpdate="true"\n\t\t\t\t\t\t\t\t\twidth="60%"/><FormattedText\n\t\t\t\t\t\t\t\t\thtmlText="Hello {/recipient/name}"\n\t\t\t\t\t\t\t\t\tclass="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/></content></Panel></content></Page></pages></App></Shell></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map
