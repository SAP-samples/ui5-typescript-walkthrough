"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "../model/formatter", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"], function (Controller, JSONModel, __formatter, Filter, FilterOperator) {
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
    },
    onFilterInvoices: function _onFilterInvoices(event) {
      // build filter array
      const filter = [];
      const query = event.getParameter("query");
      if (query) {
        filter.push(new Filter("ProductName", FilterOperator.Contains, query));
      }

      // filter binding
      const list = this.byId("invoiceList");
      const binding = list?.getBinding("items");
      binding?.filter(filter);
    },
    onPress: function _onPress() {
      const router = this.getOwnerComponent().getRouter();
      router.navTo("detail");
    }
  });
  ;
  return App;
});
//# sourceMappingURL=InvoiceList-dbg.controller.js.map
