sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"], function (UIComponent, JSONModel) {
  "use strict";

  /**
   * @namespace ui5.walkthrough
   */
  const Component = UIComponent.extend("ui5.walkthrough.Component", {
    metadata: {
      "interfaces": ["sap.ui.core.IAsyncContentCreation"],
      "manifest": "json"
    },
    init: function _init() {
      // call the init function of the parent
      UIComponent.prototype.init.call(this);

      // set data model
      const data = {
        recipient: {
          name: "World"
        }
      };
      const dataModel = new JSONModel(data);
      this.setModel(dataModel);
    }
  });
  ;
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
