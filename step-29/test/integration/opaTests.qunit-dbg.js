"use strict";

sap.ui.require([], function () {
  "use strict";

  function __ui5_require_async(path) {
    return new Promise(function (resolve, reject) {
      sap.ui.require([path], function (module) {
        if (!(module && module.__esModule)) {
          module = module === null || !(typeof module === "object" && path.endsWith("/library")) ? {
            default: module
          } : module;
          Object.defineProperty(module, "__esModule", {
            value: true
          });
        }
        resolve(module);
      }, function (err) {
        reject(err);
      });
    });
  }
  /* @sapUiRequire */
  QUnit.config.autostart = false;

  // import all your integration tests here
  void Promise.all([__ui5_require_async("ui5/walkthrough/test/integration/NavigationJourney")]).then(() => {
    QUnit.start();
  });
});
//# sourceMappingURL=opaTests.qunit-dbg.js.map
