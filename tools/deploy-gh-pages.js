const ghpages = require("gh-pages");

(async function() {

	await new Promise(function(resolve, reject) {
		ghpages.publish("dist", {
			nojekyll: true,
			history: false
		}, function() {
			resolve();
		});
	});

}());
