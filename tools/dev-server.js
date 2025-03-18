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

async function renderFile(file, step) {
	const md = readFileSync(file, { encoding: "utf-8" });
	const bodyContent = await convertMarkdown(md);
	const templateFn = await getTemplate();
	const html = templateFn({ step, title: `Step ${step}`, bodyContent });
	return html;
}

app.use("/assets", express.static(join(__dirname, "..", "assets")));

app.use("/assets/anchor-js", express.static(join(__dirname, "..", "node_modules", "anchor-js")));
app.use("/assets/highlight.js", express.static(join(__dirname, "..", "node_modules", "@highlightjs", "cdn-assets")));
app.use("/assets/github-markdown-css", express.static(join(__dirname, "..", "node_modules", "github-markdown-css")));

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
	if (file) {
		const md = readFileSync(file, { encoding: "utf-8" });
		const bodyContent = await convertMarkdown(md);
		const templateFn = await getTemplate();
		const html = templateFn({ title: req.url, bodyContent });
		res.send(html);
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
