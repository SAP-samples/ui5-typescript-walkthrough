## Step 27: Unit Test with QUnit

Now that we have a test folder in the app, we can start to increase our test coverage.

Actually, every feature that we added to the app so far, would require a separate test case. We have totally neglected this so far, so let’s add a simple unit test for our custom formatter function from Step 23. We will test if the long text for our status is correct by comparing it with the texts from our resource bundle.

> 📝 **Note:** <br>  
> In this tutorial, we focus on a simple use case for the test implementation. If you want to learn more about QUnit tests, have a look at the [Testing Tutorial](https://sdk.openui5.org/topic/291c9121e6044ab381e0b51716f97f52.html) tutorial, especially [Step 2: A First Unit Test](https://sdk.openui5.org/topic/b81736e0fcb246efb3b0cf0ca422f8fd.html).

&nbsp;

***

### Preview  
  
![](https://sdk.openui5.org/docs/topics/loio0d29491d96574cfe8d8158d60a0a32e2_LowRes.png "A unit test for our formatters is now available")

<sup>*A unit test for our formatters is now available*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 27](https://sap-samples.github.io/ui5-typescript-walkthrough/step-27/test/Test.cdn.qunit.html?testsuite=test-resources/ui5/walkthrough/testsuite.cdn.qunit&test=unit/unitTests).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 27](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-27.zip).

***

### Coding
  
We add a new folder `unit` under the `test` folder and a `model` subfolder where we will place our formatter unit test. The folder structure matches the app structure to easily find the corresponding unit tests.
  
![](https://sdk.openui5.org/docs/topics/loio1b5613ac3ab94757af2c7823039222a9_LowRes.png "Folder Structure for this Step")
<sup>*Folder Structure for this Step*</sup>

***

### webapp/test/unit/model/formatter.ts \(New\)

We create a new `formatter.ts` file under `webapp/test/unit/model` where the unit test for the custom formatter is implemented. The formatter function that we want to test is from the `formatter.ts` file located in the `webapp/model` folder.

The new formatter file just contains one QUnit module for our formatter function and one unit test for the formatter function. In the implementation of the `statusText` function that we created in Step 23, we use the translated texts when calling the formatter. As we do not want to test the SAPUI5 binding functionality, we just use text in the test instead of a `ResourceBundle`.

Finally, we perform our assertions. We check each branch of the formatter logic by invoking the isolated formatter function with the values that we expect in the data model \(`A`, `B`, `C`, and everything else\). We strictly compare the result of the formatter function with the hard-coded strings that we expect from the resource bundle and give a meaningful error message if the test should fail.

```ts
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Controller from "sap/ui/core/mvc/Controller";
import formatter from "ui5/walkthrough/model/formatter";

QUnit.module("Formatting function", {});

QUnit.test("Should return the translated texts", (assert) => {
    const resourceModel = new ResourceModel({
        bundleUrl: sap.ui.require.toUrl("ui5/walkthrough/i18n/i18n.properties"),
        supportedLocales: [
            ""
        ],
        fallbackLocale: ""
    });

    const controllerMock = {
        getOwnerComponent() {
            return {
                getModel() {
                    return resourceModel;
                }
            };
        }
    } as any as Controller;

    // System under test
    const fnIsolatedFormatter = formatter.statusText.bind(controllerMock);

    // Assert
    assert.strictEqual(fnIsolatedFormatter("A"), "New", "The long text for status A is correct");
    assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The long text for status B is correct");
    assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The long text for status C is correct");
    assert.strictEqual(fnIsolatedFormatter("Foo"), "Foo", "The long text for status Foo is correct");
});
```

***

### webapp/test/unit/unitTests.qunit.ts \(New\)

We create a new `unitTests.qunit.ts` file under `webapp/test/unit/`.
This script loads and executes our formatter test. Before the QUnit test execution can be started we need to wait until the Core has been booted. Therefore, you need to disable the autostart `QUnit.config.autostart = false;`, require the `sap/ui/core/Core` module and use `Core.ready()` to wait until the Core has booted and then you can start the QUnit tests with `QUnit.start()`.

```ts
import "./model/formatter";
```

***

### webapp/test/testsuite.qunit.html \(New\)

We create a new `testsuite.qunit.html` page under `webapp/test`. 
This page serves as an entry point for all tests within our project. For more information about the UI5 Test Suite, read [Concept and Basic Setup](https://sdk.openui5.org/#/topic/22f50c0f0b104bf3ba84620880793d3f).

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>QUnit test suite for UI5 TypeScript Walkthrough</title>
	<script
		src="../resources/sap/ui/test/starter/createSuite.js"
		data-sap-ui-testsuite="test-resources/ui5/walkthrough/testsuite.qunit"
		data-sap-ui-resource-roots='{
			"test-resources.ui5.walkthrough": "./"
		}'
	></script>
</head>
<body>
</body>
</html>
```

***

### webapp/test/testsuite.qunit.ts \(New\)

Now, we create the corresponding configuration next to the test suite itself.

```ts
export default {
	name: "QUnit test suite for UI5 TypeScript Walkthrough",
	defaults: {
		page: "ui5://test-resources/ui5/walkthrough/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 1
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "ui5/walkthrough/",
			never: [
				"ui5/walkthrough/test/",
				"ui5/walkthrough/localService/"
			]
		},
		loader: {
			paths: {
				"ui5/walkthrough": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "UI5 TypeScript Walkthrough - Unit Tests"
		}
	}
};
```

***

### webapp/test/Test.qunit.html \(New\)

Finally, we create a generic test page. It will be called with the test suite and test name in order to run a test.

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<script
		src="../resources/sap/ui/test/starter/runTest.js"
		data-sap-ui-resource-roots='{
			"test-resources.ui5.walkthrough": "./"
		}'
	></script>
</head>
<body class="sapUiBody">
	<div id="qunit"></div>
	<div id="qunit-fixture"></div>
</body>
</html>
```

If we now open the `webapp/test/testsuite.qunit.html` file in the browser, we should see our test running and verifying the formatter logic.

### Conventions

-   All unit tests are placed in the webapp/test/unit folder of the app.

-   Test files referenced in the test suite end with `*.qunit.ts`.

-   A unit test should be written for formatters, controller logic, and other individual functionality.

-   All dependencies are replaced by stubs to test only the functionality in scope.

&nbsp;

***

**Next:** [Step 28: Integration Test with OPA](../28/README.md "If we want to test interaction patterns or more visual features of our app, we can also write an integration test.")

**Previous:** [Step 26: Mock Server Configuration](../26/README.md "We just ran our app against a real service, but for developing and testing our app we do not want to rely on the availability of the “real” service or put additional load on the system where the data service is located.")

***

**Related Information** 

[Test Starter](https://sdk.openui5.org/topic/032be2cb2e1d4115af20862673bedcdb.html "The test starter is a concept intended to simplify the test setup for OpenUI5 applications and libraries by orchestrating your QUnit and OPA5 tests.")

[Unit Testing with QUnit](https://sdk.openui5.org/topic/09d145cd86ee4f8e9d08715f1b364c51.html "QUnit is a powerful, easy-to-use JavaScript unit testing framework. It is used by the jQuery, jQuery UI and jQuery Mobile projects and is capable of testing any generic JavaScript code. It supports asynchronous tests out-of-the-box.")

[QUnit Home Page](https://qunitjs.com/)

[Testing Tutorial](https://sdk.openui5.org/topic/291c9121e6044ab381e0b51716f97f52.html "We just ran our app against a real service, but for developing and testing our app we do not want to rely on the availability of the “real” service or put additional load on the system where the data service is located.")
