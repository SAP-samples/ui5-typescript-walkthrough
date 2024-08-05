"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function (Controller, History) {
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
    },
    onNavBack: function _onNavBack() {
      const history = History.getInstance();
      const previousHash = history.getPreviousHash();
      if (previousHash !== undefined) {
        window.history.go(-1);
      } else {
        const router = this.getOwnerComponent().getRouter();
        router.navTo("overview", {}, true);
      }
    }
  });
  ;
  return Detail;
});
//# sourceMappingURL=Detail-dbg.controller.js.map
