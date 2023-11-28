## Step 2: Bootstrap

Before we can do something with OpenUI5, we need to load and initialize it. This process of loading and initializing OpenUI5 is called **bootstrapping**. Once this bootstrapping is finished, we simply display an alert.

&nbsp;
***

### Preview


![](https://sdk.openui5.org/docs/topics/loio0f6b6b9dc46a474da9287c382c8d3456_LowRes.png "An alert \"UI5 is ready\" is displayed")

<sup>*An alert "UI5 is ready" is displayed*</sup>
***

### Coding


### package.json

As we'd like to use TypeScript with our project, we first need to istall the TypeScript package. It provides the necessary tools and utilities to compile TypeScript code into JavaScript.

Open a terminal in the app root folder and execute `npm install typescript --save-dev`. This will install the latest stable version of TypeScript to your project and will add it as development dependency to your `package.json`.


### tsconfig.json \(New\)

Let's create the file `tsconfig.json` in the app root folder to indicate that this folder is the root of a TypeScript project. This file  specifies the root files and the compiler options required to compile the project.

Specify the compiler options as follow:

```json
{
    "compilerOptions": {
      "target": "es2022",
      "module": "es2022",
      "moduleResolution": "node",
      "skipLibCheck": true,
      "allowJs": true,
      "strict": true,
      "strictPropertyInitialization": false,
      "rootDir": "webapp",
      "baseUrl": "./",
      "paths": {
        "ui5/walkthrough/*": ["webapp/*"]
      }
    },
    "include": ["webapp/**/*"]
  }
```


### webapp/index.ts \(New\)

We create a new `index.ts` script in the webapp folder and add a native `alert()` method with the message "UI5 is ready" to it. We'll integrate this script to the `index.html` page next.

```ts
alert("UI5 is ready");
```

***

### webapp/index.html

In this step, we we change the `index.html` page to make it load the SAPUI5 framework from the webserver provided by UI5 Tooling. We initialize the core modules with the following configuration options:

-   The `id` attribute of the `<script>` tag has to be exactly `"sap-ui-bootstrap"` to ensure proper booting of the OpenUI5 runtime.

-   The `src` attribute of the `<script>` tag tells the browser where to find the OpenUI5 core library – it initializes the OpenUI5 runtime and loads additional resources, such as the theme specified in the `data-sap-ui-theme` attribute.

-   The OpenUI5 controls support different themes. We choose `sap_horizon` as our default theme.

-   To make use of the most recent functionality of OpenUI5 we define the compatibility version as `edge`.

-   We configure the bootstrapping process to run asynchronously. This means that the OpenUI5 resources can be loaded simultaneously in the background for performance reasons.

-    The `data-sap-ui-onInit` attribute is used in OpenUI5 to specify a JavaScript or TypeScript function that will be executed when the framework is fully loaded and initialized. This approach allows us to avoid directly including executable JavaScript code in the HTML file, which improves the security of our application. Here, we're indicating that our `ui5/walkthrough/index` module should be triggered and executed at the start of the application. Note that the path to our file includes the namespace, whereby the "." is replaced by a "/" (see explanation below).

-   The attribute `data-sap-ui-resourceroots` lets you map a namespace to a specific path. We define the namespace `ui5.walkthrough` and map it relative to `index.html`. This way, We tell OpenUI5 core that resources in the `ui5.walkthrough` namespace are located in the same folder as `index.html`.


```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>UI5 TypeScript Walkthrough</title>
<script
		id="sap-ui-bootstrap"
		src="resources/sap-ui-core.js"
		data-sap-ui-theme="sap_horizon"
		data-sap-ui-compatVersion="edge"
		data-sap-ui-async="true"
		data-sap-ui-onInit="module:ui5/walkthrough/index"
		data-sap-ui-resourceroots='{
			"ui5.walkthrough": "./"
		}'>
	</script>
</head>
<body>
	<div>Hello World</div>
</body>
</html>
```

***

### package.json

Now, it's time to enhance our tooling setup once again. This time we install some custom middleware for the ui5-server to facilitate the handling of our development project.

Open a terminal in the app root folder. Then execute the following command:

`npm install ui5-middleware-livereload ui5-middleware-serveframework ui5-tooling-transpile --save-dev`

This will install the `ui5-middleware-livereload`, `ui5-middleware-serveframework`, and `ui5-tooling-transpile` tooling extension and add them as a development dependency to your `package.json`:

-	`ui5-middleware-livereload` is a middleware for ui5-server, which does a live reload when files inside your directory change, e.g. upon *Save*.
-	`ui5-middleware-serveframework` is a middleware for ui5-server, delivering the OpenUI5 framework from a locally built version.
- `ui5-tooling-transpile` provides a middleware and a task which transpiles TypeScript code to ES5 by using Babel. The middleware transpiles a matching .ts-file on-the-fly. The task transpiles the relevant source files during the UI5 Tooling build process. 

***

### ui5.yaml

For our UI5 Tooling setup we require some additional configuration changes:

Open a terminal in the app root folder and exectue the following commands:

-   `ui5 use OpenUI5` to configure the latest OpenUI5 version in your UI5 Tooling setup.

-   `ui5 add sap.ui.core themelib_sap_horizon` - this will add the two libraries `sap.ui.core` and `themelib_sap_horizon` library as dependency to your `ui5.yaml` file.

Next,  we have to configure the tooling extension we installed from npm to our UI5 Tooling setup, so we can use them in our project. To hook a custom task into a certain build phase of a project, it needs to reference another task that will get executed before or after it. The same applies for a custom middleware:

-   For the `ui5-tooling-transpile-task` we specify that this should happen after the`replaceVersion` task.

-   All our custom middleware extensions will be called after the `compression` middleware.

> :warning: **Important:**
>
> Middleware configurations are applied in the order in which they are defined. 

```yaml
framework:
  name: OpenUI5
  version: "1.120.1"
  libraries:
    - name: sap.ui.core
    - name: themelib_sap_horizon
builder:
  customTasks:
  - name: ui5-tooling-transpile-task
    afterTask: replaceVersion
server:
  customMiddleware:
  - name: ui5-tooling-transpile-middleware
    afterMiddleware: compression
  - name: ui5-middleware-serveframework
    afterMiddleware: compression
  - name: ui5-middleware-livereload
    afterMiddleware: compression
```
Now you can benefit from live reload on changes, built framework resources at development time, and make use of TypeScript in OpenUI5.

> :bulb: **Note:**
>
> During its initial run, the `ui5-middleware-serveframework` middleware will build the framework, which can take a while. In all following steps, the build will not happen again and the framework is served from the built resources.

&nbsp;
***

**Next:** [Step 3: Controls](../03/README.md "Now it's time to build our first little UI by replacing the Hello World text in the HTML body by the OpenUI5 control sap.m.Text. In the beginning, we will use the TypeScript control API to set up the UI, the control instance is then placed into the HTML body‚")

**Previous:** [Step 1: Hello World!](../01/README.md "As you know OpenUI5 is all about HTML5. Let's get started with building a first Hello World with only HTML. In addition we will initialize the UI5 Tooling, so we can benefit from it from the beginning.")

***

**Related Information** 

[What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

[Compatibility Version Information](https://sdk.openui5.org/topic/9feb96da02c2429bb1afcf6534d77c79.html "Compatibility version flags allow applications to react to incompatible changes in OpenUI5.")

[Bootstrapping: Loading and Initializing](https://sdk.openui5.org/topic/a04b0d10fb494d1cb722b9e341b584ba.html "To use OpenUI5 features in your HTML page, you have to load and initialize the OpenUI5 library.")

[Content Security Policy](https://sdk.openui5.org/topic/fe1a6dba940e479fb7c3bc753f92b28c.html "Content Security Policy (CSP) adds an additional layer of security that can detect and mitigate certain types of attacks, such as cross-site scripting and data injection.")

[UI5 Tooling: Consuming OpenUI5 Libaries](https://sap.github.io/ui5-tooling/v3/pages/OpenUI5/)

[NPM Package: `ui5-middleware-livereload`](https://www.npmjs.com/package/ui5-middleware-livereload)

[NPM Package: `ui5-middleware-serveframework`](https://www.npmjs.com/package/ui5-middleware-serveframework)

[NPM Package: `ui5-tooling-transpile`](https://www.npmjs.com/package/ui5-tooling-transpile)

[UI5 Tooling: Custom Tasks](https://sap.github.io/ui5-tooling/v3/pages/extensibility/CustomTasks/)

[UI5 Tooling: Custom Server Middleware](https://sap.github.io/ui5-tooling/v3/pages/extensibility/CustomServerMiddleware/)