"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  /**
   * @namespace ui5.walkthrough.controller
   */
  const App = Controller.extend("ui5.walkthrough.controller.App", {
    onInit: function _onInit() {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
    }
  });
  ;
  return App;
});
//# sourceMappingURL=App-dbg.controller.js.map