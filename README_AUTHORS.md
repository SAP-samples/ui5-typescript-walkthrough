# Documentation for Tutorial Authors

# General

The setup of this project allows maintaining *one* tutorial text that covers both JavaScript and TypeScript with minimal overhead and without duplication of content.

Readers of the tutorial can freely switch the programming language of code snippets or the entire page, once deployed on GitHub Pages. For tutorial authors, an integrated dev server allows previewing the result with the same functionality locally and instantly.

Main features of the two-language support are:
1. Content meant only for *one* of the programming languages can be hidden in the other by enclosing it in a specific block.
2. Two adjacent code sections in different languages are automatically converted to a tab container which allows switching between languages.
3. File extensions writen as `.?s` appear automatically as `.js` or `.ts` depending on the current language.

## Limitations

The feature 3. above does not work inside code blocks (yet).


## Running the preview/dev server

To immediately preview the markdown document you are writing *including* the two-language magic, simply run

```sh
npm i
```

in the root folder of this project once for the setup, then to actually run the server, run

```sh
npm start
```

Then, open http://localhost:1337/README.md in your browser.

Alternatively, and even easier, run 

```sh
npm run watch
```

And the browser will automatically open (on port 3000) and automatically reload on every saved change.


## Writing *one* document which covers both JavaScript and TypeScript without duplication

The following features help providing language-specific content without duplication of other content. 

### 1. Language-specific Blocks of Content

When a certain part of the tutorial content (can be explanation and/or code) is only relevant for *one* of the languages (JavaScript *or* TypeScript), then enclose it within the following tags. The CSS class decides for which language it is meant!

TypeScript-only:

```html
<details class="ts-only" markdown="1"><summary>This section is relevant for TypeScript only</summary>
...here comes the TS-only text...
</details>
```

JavaScript-only:

```html
<details class="js-only" markdown="1"><summary>This section is relevant for JavaScript only</summary>
...here comes the JS-only text...
</details>
```

The `markdown="1"` part is required for markdown parsing within HTML and the `<summary>` is helpful for readers of the raw markdown view, so please use the tag structure as-is, with your actual content in between.

#### Resulting Appearance<span class="hidden"> in markdown view (not in the final page)</span>

<details class="ts-only" markdown="1"><summary>This section is relevant for TypeScript only</summary>
...here comes the TS-only text...
</details>

<details class="js-only" markdown="1"><summary>This section is relevant for JavaScript only</summary>
...here comes the JS-only text...
</details>


### 2. Switchable code blocks in both languages

When a piece of code should be displayed in either JS or TS, whatever is current, then simply create two adjacent markdown-fenced code blocks. They are automatically recognized as language-specific alternatives.

Example:
```md

    ```js
    const i = 0;
    ```

    ```ts
    const i: number = 0;
    ```
```
> Do not indent, this was only done to make the backticks within the code block visible.

> Some places where this occurs may not be properly recognized, so make sure to test it.

#### Resulting Appearance<span class="hidden"> in markdown view (here in markdown you still see BOTH and no tab container; the magic only happens in the dev server and in GitHub Pages)</span>

```js
const i = 0;
```

```ts
const i: number = 0;
```

### 3. File Extensions (`.js/.ts`)

When the text or a section heading mentions the name of a file that will be JavaScript or TypeScript, depending on the language, then use the file extension `.\?s`. It will automatically be switched to the current language.

Example:
```md
In this step you create the file `Example.controller.\?s`.
```

#### Resulting Appearance<span class="hidden"> in markdown view (here the extension is not replaced, the replacement only happens in the dev server and in GitHub Pages)</span>

In this step you create the file `Example.controller.?s`.

## Converting the JS Code to TypeScript

TODO: tool support for this functionality does not exist yet. It can, however, already be done manually.

General approach: develop the tutorial in TS and use the debug version of the transpilation result as JS code.

To clean up the transpilation result, search for and remove content containing the following in the transpiled JS code:

### `_interopRequireDefault`

Looks like this:

```js
sap.ui.define(["./BaseController"], function (__BaseController) {

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
```

Remove the function definition and the line calling the function. Rename the dependency in the `sap.ui.define` call from `__BaseController` to `BaseController`.


### TODO: Some more similar things, unless we do it in the transpiler
