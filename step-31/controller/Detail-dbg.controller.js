"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  /**
   * @namespace ui5.walkthrough.controller
   */
  const Detail = Controller.extend("ui5.walkthrough.controller.Detail", {
    onInit: function _onInit() {
      const router = this.getOwnerComponent().getRouter();
      router.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    },
    onObjectMatched: function _onObjectMatched(event) {
      this.getView().bindElement({
        path: "/" + window.decodeURIComponent(event.getParameter("arguments").invoicePath),
        model: "invoice"
      });
    }
  });
  ;
  return Detail;
});
//# sourceMappingURL=Detail-dbg.controller.js.map
