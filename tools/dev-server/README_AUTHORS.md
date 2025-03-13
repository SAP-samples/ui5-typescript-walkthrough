# Documentation for Tutorial Authors

# General

blah

# TypeScript

## Converting the JS Code to TypeScript

blah

(Develop the tutorial in TS and use the debug version of the transpilation result as JS code. )

Search for and remove content containing the following in the transpiled JS code:

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


### (More of this, unless we do it in the transpiler)


## Combining JavaScript and TypeScript in one Common Text

The following features help providing language-specific content without duplication of other content. 



### Language-specific Blocks of Content

When a certain part of the tutorial content (can be explanation and/or code) is only relevant for *one* of the languages (JavaScript *or* TypeScript), then enclose it within the following tags. Note how the CSS class decides for which language it is meant!

TypeScript-only:

```html
<details class="ts-only" markdown="1"><summary>This section is relevant for TypeScript only</summary>
...
</details>
```

JavaScript-only:

```html
<details class="js-only" markdown="1"><summary>This section is relevant for JavaScript only</summary>
...
</details>
```

The `markdown="1"` part is required for markdown parsing within HTML and the `<summary>` is helpful for readers of the raw markdown view, so use the tags as-is, with the actual content in between.

#### Resulting Appearance<span class="hidden"> in markdown view</span>

<details class="ts-only" markdown="1"><summary>This section is relevant for TypeScript only</summary>
Some TypeScript content.
</details>

<details class="js-only" markdown="1"><summary>This section is relevant for JavaScript only</summary>
Some JavaScript content.
</details>


### File Extensions (`.js/.ts`)

When the text or a heading mentions the name of a file that will be JavaScript or TypeScript, depending on the language, then use the file extension `.?s`. It will automatically be switched to the current language.

Example:
```md
In this step you create the file `Example.controller.?s`.
```


#### Resulting Appearance<span class="hidden"> in markdown view</span>

In this step you create the file `Example.controller.?s`.
