const removeFunction = function removeFunction(code, functionName) {
	if (!code || !functionName) {
		return code;
	}

	// match the function start
	const fnStartRegex = new RegExp(
		`^[ \t\f\v]*function\\s+${functionName}\\s*\\([^)]*\\)\\s*\\{`,
		"gm"
	);

	// find the closing brace for the function and remove the function
	let match;
	while ((match = fnStartRegex.exec(code)) !== null) {
		let startIndex = match.index;
		let braceIndex = code.indexOf("{", match.index);
		let depth = 0;
		let i = braceIndex;
		for (; i < code.length; i++) {
			if (code[i] === "{") {
				depth++;
			} else if (code[i] === "}") {
				depth--;
			}
			if (depth === 0) {
				// found the matching }
				break;
			}
		}
		if (depth === 0 && i > braceIndex) {
			// also include trailing whitespace / newlines after function
			let endIndex = i + 1;
			while (endIndex < code.length && /\n/.test(code[endIndex])) {
				endIndex++;
			}
			code = code.slice(0, startIndex) + code.slice(endIndex);
			fnStartRegex.lastIndex = startIndex;
		}
	}

	return code;
}

/**
 * the  code sanitization function is used to remove the _interopRequireDefault function
 * and replace the parameters in the sap.ui.define function with the variables that were
 * assigned using _interopRequireDefault.
 * It also removes the __ui5_require_async function and replaces it with sap.ui.require.
 * @param {string} code the code to sanitize
 * @returns sanitized code
 */
module.exports = function sanitze(code = "") {

	// remove all comments related to UI5 TypeScript generation (namespaces, names)
	code = code.replaceAll(/\/\*\*.*[\n\s]+\* @namespace.*[\n\s]+\*\/[\n\s]+/g, "");
	code = code.replaceAll(/\/\*\*.*[\n\s]+\* @name.*[\n\s]+\*\/[\n\s]+/g, "");

	// remove all comments related to source maps
	code = code.replaceAll(/\/\/# sourceMappingURL=.*[\n\s]+/g, "");

	// remove _interopRequireDefault function
	code = removeFunction(code, "_interopRequireDefault");

	// find which variables are assigned using _interopRequireDefault
	let matchedVars;
	code = code.replace(/^(\s*)(?:var|const|let)\s+(\w+)\s*=\s*_interopRequireDefault\((\w+)\);\s*(.*)\n/gm, (all, spacing, varName, requiredVarName, comment) => {
		matchedVars ??= {};
		matchedVars[requiredVarName] = varName;
		return comment?.trim() ? `${spacing}${comment}\n` : "";
	});

	// selectively rename only these parameters
	if (matchedVars) {
	code = code.replace(
		/sap\.ui\.define\(\s*(\[[^\]]*\])\s*,\s*function\s*\(([^)]*)\)/g,
		(all, deps, params) => {
			const newParams = params
				.split(",")
				.map((param) => {
					return matchedVars[param.trim()] || param.trim();
				})
				.join(", ");
			return `sap.ui.define(${deps}, function (${newParams})`;
		}
	);
	}

	// remove the __ui5_require_async function
	code = removeFunction(code, "__ui5_require_async");

	// replace __ui5_require_async calls with sap.ui.require
	code = code.replace(
		/__ui5_require_async\s*\(\s*("[^"]+")\s*\);/g,
		"sap.ui.require([$1]);"
	);

	// replace the class member function classic syntax with the shorthand syntax
	code = code.replace(/(\w+)\s*:\s*function\s+\w+\s*\(/g, '$1(');

	// replace the async class member function classic syntax with the shorthand syntax
	code = code.replace(/(\w+)\s*:\s*async\s+function\s+\w+\s*\(/g, 'async $1(');

	// remove the __exports variable and return the exports directly
	code = code.replace(/(?:var|const|let)\s+__exports\s*=\s*({[\s\S]*?});\s*return\s+__exports\s*;/g, 'return $1;');

	// remove empty lines
	code = code.replace(/^\s*;\s*\n/gm, "");

	return code;
};
