const { join } = require("path");
const { readdirSync, existsSync, rmSync, mkdirSync, createWriteStream, copyFileSync, readFileSync, writeFileSync } = require("fs");
const { exec } = require("child_process");
const utils = require("util");
const execute = utils.promisify(exec);

const archiver = require("archiver");
const fg = require('fast-glob');

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

	const steps = readdirSync(join(process.cwd(), "steps"));
	if (existsSync(join(process.cwd(), "dist"))) {
		rmSync(join(process.cwd(), "dist"), { recursive: true });
	}
	mkdirSync(join(process.cwd(), "dist"), { recursive: true });
	await Promise.all(steps.map((step) => {
		return zipDirectory(join(process.cwd(), "steps", step), join(process.cwd(), "dist", `ui5-typescript-walkthrough-step-${step}.zip`))
	}));
	for (const step of steps) {
		console.log(`npx ui5 build --dest ${join(process.cwd(), "dist", `step-${step}`)}`);
		await execute(`npx ui5 build --dest ${join(process.cwd(), "dist", `step-${step}`)}`, {
			cwd: join(process.cwd(), "steps", step)
		});
	}

	function rewriteLinks(file) {
		let content = readFileSync(file, { encoding: "utf8"});
		content = content.replace(/steps\/(\d{2})/g, "step-$1");
		content = content.replace(/\.\.\/(\d{2})/g, "../step-$1");
		writeFileSync(file, content, { encoding: "utf8" });
	}

	copyFileSync(join(process.cwd(), "README.md"), join(process.cwd(), "dist/index.md"));
	rewriteLinks(join(process.cwd(), "dist/index.md"));
	const readmes = fg.globSync(["steps/**/README.md"]);
	readmes.forEach((readme) => {
		const [, path, step] = readme.match("steps/((.*)/README.md)");
		mkdirSync(join(process.cwd(), `dist/step-${step}`), { recursive: true });
		copyFileSync(join(process.cwd(), readme), join(process.cwd(), `dist/step-${path}`));
		rewriteLinks(join(process.cwd(), `dist/step-${path}`));
	});

}());
