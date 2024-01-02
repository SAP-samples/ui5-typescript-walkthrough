"use strict";

sap.ui.define(["sap/ui/core/util/MockServer", "sap/base/util/UriParameters"], function (MockServer, UriParameters) {
  "use strict";

  var __exports = {
    init: function () {
      // create
      const mockServer = new MockServer({
        rootUri: sap.ui.require.toUrl("ui5/walkthrough/V2/Northwind/Northwind.svc/")
      });
      const uriParameters = new UriParameters(window.location.href);

      // configure mock server with a delay
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: parseInt(uriParameters.get("serverDelay") || "500")
      });

      // simulate
      const path = sap.ui.require.toUrl("ui5/walkthrough/localService");
      mockServer.simulate(path + "/metadata.xml", path + "/mockdata");

      // start
      mockServer.start();
    }
  };
  return __exports;
});
//# sourceMappingURL=mockserver-dbg.js.map
