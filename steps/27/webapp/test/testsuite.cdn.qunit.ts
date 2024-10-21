export default {
	name: "QUnit test suite for UI5 TypeScript Walkthrough",
	defaults: {
		page: "ui5://test-resources/ui5/walkthrough/Test.cdn.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		ui5: {
			theme: "sap_horizon",
			animationMode: "minimal"
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
