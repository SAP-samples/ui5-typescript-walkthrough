/* @sapUiRequire */
QUnit.config.autostart = false;

// import all your QUnit tests here
void Promise.all([
	import("ui5/walkthrough/test/unit/model/formatter")
]).then(() => {
	QUnit.start();
});
