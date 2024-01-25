const { join } = require("path");
const { readdirSync, existsSync, rmSync, mkdirSync, createWriteStream, copyFileSync } = require("fs");
const { exec } = require("child_process");
const utils = require("util");
const execute = utils.promisify(exec);

const archiver = require("archiver");

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
	console.log(steps);
	await Promise.all(steps.map((step) => {
		return zipDirectory(join(process.cwd(), "steps", step), join(process.cwd(), "dist", `ui5-typescript-walkthrough-step-${step}.zip`))
	}));
	for (const step of steps) {
		console.log(`npx ui5 build --dest ${join(process.cwd(), "dist", `step-${step}`)}`);
		await execute(`npx ui5 build --dest ${join(process.cwd(), "dist", `step-${step}`)}`, {
			cwd: join(process.cwd(), "steps", step)
		});
	}
	copyFileSync(join(process.cwd(), "README.md"), join(process.cwd(), "dist/index.md"));

}());
