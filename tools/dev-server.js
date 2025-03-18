const { join } = require("path");
const { readFileSync, existsSync, statSync } = require("fs");

const handlebars = require('handlebars');

const showdown = require('showdown');
const footnotes = require('showdown-footnotes');
const highlight = require("showdown-highlight");

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

async function renderStep(step) {
	const html = await renderFile(`steps/${step}/README.md`, step);
	return html;
}

async function renderFile(file, step) {
	const md = readFileSync(file, { encoding: "utf-8" });
	const bodyContent = await convertMarkdown(md);
	const templateFn = await getTemplate();
	const html = templateFn({ step, title: `Step ${step}`, bodyContent });
	return html;
}


/*

app.get('/', async (req, res) => {
	res.redirect(`/README.md`);
});

app.get('/README.md', async (req, res) => {
	try {
		const md = readFileSync(`README.md`, { encoding: "utf-8" });
		const bodyContent = await convertMarkdown(md);
		const templateFn = await getTemplate();
		const html = templateFn({ title: `Walkthrough`, bodyContent });
		res.send(html);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.get('/steps/:step', async (req, res) => {
	res.redirect(`/steps/${req.params.step}/README.md`);
});

app.get('/steps/:step/README.md', async (req, res) => {
	try {
		let html;
		if (req.params.step === "00") {
			 html = await renderFile(join(__dirname, "dev-server", "README_AUTHORS.md"), "00");
		} else {
			html = await renderStep(req.params.step);
		}
		res.send(html);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
*/


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
	console.log(`Example app listening on port ${port}`);
	const open = (await import("open")).default;
	await open(`http://localhost:${port}`);
});
