/* @sapUiRequire */
QUnit.config.autostart = false;

// import all your integration tests here
void Promise.all([
	import("ui5/walkthrough/test/integration/NavigationJourney")
]).then(() => {
	QUnit.start();
});
