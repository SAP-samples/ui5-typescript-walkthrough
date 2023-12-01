## Step 3: Controls

Now it is time to build our first little UI by replacing the “Hello World” text in the HTML body by the OpenUI5 control `sap/m/Text`. In the beginning, we will use the TypeScript control API to set up the UI, the control instance is then placed into the HTML body.


&nbsp;
***

### Preview

![](https://sdk.openui5.org/docs/topics/loio30a42d381b9e4388bf7fdc0b941e5381_LowRes.png "The \"Hello World\" text is now displayed by a OpenUI5 control")

<sup>*The "Hello World" text is now displayed by an OpenUI5 control*</sup>


***

### Coding

### package.json

First, we need to install `@types/openui5` to get the type definitions for OpenUI5. Open a terminal in the app root folder and execute the following command:

`npm install @types/openui5 --save-dev` 

This will install the type definitions for OpenUI5 and update the `package.json` with this new development dependency.


### webapp/index.ts

Now we make some changes to our `index.ts` file: We remove the alert method and instantiate an OpenUI5 text control instead; its options are passed to the constructor with a TypeScript object. For our control we set the `text` property to the value “Hello World”. 

We chain the constructor call of the control to the standard method `placeAt` that is used to place OpenUI5 controls inside a node of the document object model \(DOM\) or any other OpenUI5 control instance. We pass the ID `content` as an argument.

```ts
import Text from "sap/m/Text";

new Text({
    text: "Hello World"
}).placeAt("content");

```

Controls are used to define appearance and behavior of parts of the screen.

All controls of OpenUI5 have a fixed set of properties, aggregations, and associations for configuration. You can find their descriptions in the Demo Kit. In addition, each control comes with a set of public functions that you can look up in the API reference.

> :warning: **Important:**
>
> Only instances of `sap.ui.core.Control` or their subclasses can be rendered stand-alone and have a `placeAt` function. Each control extends `sap.ui.core.Element` that can only be rendered inside controls. Check the API reference to learn more about the inheritance hierarchy of controls. The API documentation of each control refers to the directly known subclasses.

***

### webapp/index.html

We replace the `<div>` tag in our `webapp/index.html` file with a `<body>` tag and assign it the ID `content`. The body tag of the HTML document thus becomes the target node for the text control we defined in the `index.ts` script.

We also add the `sapUiBody` class, which provides additional theme-dependent styles.

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
<body class="sapUiBody" id="content">
    </body>
</html>
```

In the example above, the callback of the `onInit` event is where we now instantiate an OpenUI5 text control. 

***


### UI5 Tooling

As we now use the `sap.m` library with our app, we need to update our UI5 Tooling setup with a dependency to this library. Open a terminal in the app root folder an execute the command:
 
 `ui5 add sap.m` 
 
 This will configure the OpenUI5 library `sap.m` as a dependency in our `ui5.yaml`.

&nbsp;
***

**Previous:** [Step 2: Bootstrap](../02/README.md "Before we can do something with OpenUI5, we need to load and initialize it. This process of loading and initializing OpenUI5 is called bootstrapping. Once this bootstrapping is finished, we simply display an alert.")

**Next:** [Step 4: XML Views](../04/README.md "Putting all our UI into the index.html file will very soon result in a messy setup and there is quite a bit of work ahead of us. So let’s do a first modularization by putting the sap/m/Text control into a dedicated view.")

***

**Related Information** 

[Working with Controls](https://sdk.openui5.org/topic/91f0a22d6f4d1014b6dd926db0e91070.html "Controls are used to define the appearance and behavior of screen areas.")

[API Reference: `sap.m.Text`](https://sdk.openui5.orgapi/sap.m.Text)

[Samples: `sap.m.Text` ](https://sdk.openui5.orgentity/sap.m.Text)

[API Reference: `sap.ui.core.Control`](https://sdk.openui5.orgapi/sap.ui.core.Control)

[API Reference: `sap.ui.core.Element`](https://sdk.openui5.orgapi/sap.ui.core.Element)

[API Reference: `sap.ui.base.ManagedObject`](https://sdk.openui5.orgapi/sap.ui.base.ManagedObject)

[TypeScript definitions for OpenUI5](https://www.npmjs.com/package/@types/openui5)