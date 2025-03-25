const { join, dirname } = require("path");
const { readdirSync, existsSync, statSync, rmSync, mkdirSync, createWriteStream, copyFileSync, readFileSync, writeFileSync } = require("fs");
const { exec } = require("child_process");
const utils = require("util");
const execute = utils.promisify(exec);

const archiver = require("archiver");
const fg = require('fast-glob');

const cwd = process.cwd();

function zipDirectory(sourceDir, outPath) {
	const archive = archiver('zip', { zlib: { level: 9 }});
	const stream = createWriteStream(outPath);

	return new Promise((resolve, reject) => {
	  archive
		.glob("**/*", {
			cwd: sourceDir,
			ignore: ["dist/**", "node_modules/**"]
		})
		.on('error', err => reject(err))
		.pipe(stream)
	  ;

	  stream.on('close', () => resolve());
	  archive.finalize();
	});
}

(async function() {

	let steps = readdirSync(join(cwd, "steps"));
	// only consider directories
	steps = steps.filter((step) => statSync(join(cwd, "steps", step)).isDirectory());

	if (existsSync(join(cwd, "dist"))) {
		rmSync(join(cwd, "dist"), { recursive: true });
	}

	mkdirSync(join(cwd, "dist"), { recursive: true });
	mkdirSync(join(cwd, "dist/build"), { recursive: true });

	await Promise.all(steps.map((step) => {
		return zipDirectory(join(cwd, "steps", step), join(cwd, "dist", `ui5-typescript-walkthrough-step-${step}.zip`))
	}));
	for (const step of steps) {
		console.log(`npx ui5 build --dest ${join(cwd, "dist", "build", `${step}`)}`);
		await execute(`npx ui5 build --dest ${join(cwd, "dist", "build", `${step}`)}`, {
			cwd: join(cwd, "steps", step)
		});
	}

	function rewriteLinks(file, path) {
		let content = `---\npermalink: ${path ? `build/${path.replace(".md", ".html")}` : "index.html"}\n---\n\n${readFileSync(file, { encoding: "utf8"})}`;
		content = content.replace(/steps\/(\d{2})/g, "build/$1");
		content = content.replace(/\.\.\/(\d{2})/g, "../$1");
		content = content.replace(/README\.md/g, "README.html");
		writeFileSync(file, content, { encoding: "utf8" });
	}

	copyFileSync(join(cwd, "README.md"), join(cwd, "dist/index.md"));
	rewriteLinks(join(cwd, "dist/index.md"));
	const readmes = fg.globSync(["steps/**/README.md"], { cwd });
	readmes.forEach((readme) => {
		const [, path, step] = readme.match("steps/((.*)/README.md)");
		mkdirSync(join(cwd, `dist/build/${step}`), { recursive: true });
		copyFileSync(join(cwd, readme), join(cwd, `dist/build/${path}`));
		rewriteLinks(join(cwd, `dist/build/${path}`), `${path}`);
	});

	await Promise.all(steps.map((step) => {
		const jsStepBaseDir = join(cwd, "steps", step);
		const buildOutputDir = join(cwd, "dist", "build", `${step}`);
		const targetDir = join(cwd, "dist", "steps", `${step}`);

		// copy all files from buildOutputDir to targetDir except of TS files
		const files = fg.sync(["**/*"], { cwd: jsStepBaseDir, dot: true });
		files.forEach((file) => {
			const source = join(jsStepBaseDir, file);
			const target = join(targetDir, file);
			if (file.endsWith(".ts") && file.startsWith("webapp")) {
				const outputFile = file.substring(7, file.length - 3);
				let sourceJS;
				if (file.endsWith("controller.ts")) {
					sourceJS = join(buildOutputDir, `${outputFile.substring(0, outputFile.length - 11)}-dbg.controller.js`);
				} else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
					sourceJS = join(buildOutputDir, `${outputFile}-dbg.js`);
				}

				if (!file.endsWith(".d.ts")) {
					if (existsSync(sourceJS)) {
						const targetJS = target.replace(/\.ts$/, ".js");
						mkdirSync(dirname(targetJS), { recursive: true });
						// rewrite content of the JS file
						let content = readFileSync(sourceJS, { encoding: "utf8" });
						content = content.replaceAll(/\/\*\*.*[\n\s]+\* @namespace.*[\n\s]+\*\/[\n\s]+/g, "");
						content = content.replaceAll(/\/\/# sourceMappingURL=.*[\n\s]+/g, "");
						writeFileSync(targetJS, content, { encoding: "utf8" });
					} else {
						console.error("No JS file found for", source);
					}
				}
			} else if (file !== "tsconfig.json") {
				mkdirSync(dirname(target), { recursive: true });
				copyFileSync(source, target);
			}
		});

		console.log(`${jsStepBaseDir} -> ${buildOutputDir}`);
		return zipDirectory(join(cwd, "dist", "steps", `${step}`), join(cwd, "dist", `ui5-typescript-walkthrough-step-${step}-js.zip`))
	}));

}());
