sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  const App = Controller.extend("ui5.walkthrough.controller.App", {
    onInit() {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
    }
  });
  return App;
});
