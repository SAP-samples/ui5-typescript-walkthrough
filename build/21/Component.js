sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel"],function(n,t){"use strict";const e=n.extend("ui5.walkthrough.Component",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],manifest:"json"},init:function e(){n.prototype.init.call(this);const o={recipient:{name:"World"}};const i=new t(o);this.setModel(i)}});return e});
//# sourceMappingURL=Component.js.map