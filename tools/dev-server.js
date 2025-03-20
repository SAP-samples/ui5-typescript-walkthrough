const { join } = require("path");
const { readFileSync, existsSync, statSync } = require("fs");

const handlebars = require('handlebars');

const showdown = require('showdown');
const footnotes = require('showdown-footnotes');
const highlight = require("showdown-highlight");

const browserSync = require("browser-sync");

const express = require('express');
const app = express();
const port = 1337;

async function convertMarkdown(md) {
	const converter = new showdown.Converter({
		ghCompatibleHeaderId: true,
		ghMentions: true,
		tables: true,
		emoji: true,
		parseImgDimensions: true,
		simpleLineBreaks: false,
		omitExtraWLInCodeBlocks: true,
		rawHtml: true,
		extensions: [footnotes, highlight({pre: true})]
	});
	converter.setFlavor('github');
	return converter.makeHtml(md);
}

async function getTemplate() {
	const headContent = readFileSync(`_includes/head-custom.html`, { encoding: "utf-8" });
	let template = readFileSync("tools/dev-server/ghpage-template.hbs", { encoding: "utf-8" });
	template = template.replace("%headContent%", headContent);
	template = template.replace(/\{\{ '([^']+)' \| relative_url \}\}/g, "/$1");
	const templateFn = handlebars.compile(template);
	return templateFn;
}

app.use("/node_modules", express.static(join(__dirname, "..", "node_modules")));

app.use(async (req, res, next) => {
	let file, url;
	if (req.url.endsWith("/")) {
		for (const index of ["index.md", "README.md"]) {
			url = `${req.url}${index}`;
			file = join(__dirname, "..", url);
			if (existsSync(file) && statSync(file).isFile()) {
				break;
			} else {
				file = undefined;
			}
		}
	} else {
		file = join(__dirname, "..", req.url);
		if (!(existsSync(file) && statSync(file).isFile())) {
			file = undefined;
		}
	}
	if (file && file.endsWith(".md")) {
		const md = readFileSync(file, { encoding: "utf-8" });
		const bodyContent = await convertMarkdown(md);
		const templateFn = await getTemplate();
		// get title as first line in the md file which starts with hashes, which indicates it is a title of some kind
		const title = md.match(/^##* (.+)$/m)?.[1] || "";
		const html = templateFn({ title, bodyContent });
		res.send(html);
	} else if (file) {
		res.sendFile(file);
	} else {
		next();
	}
});

app.listen(port, async () => {
	browserSync.init({
		proxy: `http://localhost:${port}`,
		files: ["**/*"],
	});
});
