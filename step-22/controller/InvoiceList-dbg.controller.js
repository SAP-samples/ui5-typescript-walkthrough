"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "../model/formatter"], function (Controller, JSONModel, __formatter) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const formatter = _interopRequireDefault(__formatter);
  /**
   * @namespace ui5.walkthrough.controller
   */
  const App = Controller.extend("ui5.walkthrough.controller.App", {
    constructor: function constructor() {
      Controller.prototype.constructor.apply(this, arguments);
      this.formatter = formatter;
    },
    onInit: function _onInit() {
      const viewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView()?.setModel(viewModel, "view");
    }
  });
  ;
  return App;
});
//# sourceMappingURL=InvoiceList-dbg.controller.js.map
