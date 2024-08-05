---
permalink: step-03/README.html
---

## Step 3: Controls

Now it is time to build our first little UI by replacing the “Hello World” text in the HTML body by the OpenUI5 control `sap/m/Text`. In the beginning, we will use the TypeScript control API to set up the UI, the control instance is then placed into the HTML body.

&nbsp;

***

### Preview

![](https://sdk.openui5.org/docs/topics/loio30a42d381b9e4388bf7fdc0b941e5381_LowRes.png "The \"Hello World\" text is now displayed by a OpenUI5 control")

<sup>*The "Hello World" text is now displayed by an OpenUI5 control*</sup>


You can access the live preview by clicking on this link: [🔗 Live Preview of Step 3](https://sap-samples.github.io/ui5-typescript-walkthrough/step-03/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 3](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-03.zip).

***

### Tooling

### package.json

To get the type definitions for OpenUI5, we need to install them to our project. We open a terminal in the root folder of our app and exectue the following command:

```sh
npm install @types/openui5 --save-dev
```

***

### Coding

### webapp/index.ts

Now we make some changes to our `index.ts` file: We remove the alert method and instantiate an OpenUI5 text control instead. We create an instance of the text control by passing its options as a TypeScript object to the constructor. In our case, we want the text control to display the message "Hello World", so we'll set the `text` property accordingly. 

To place the text control to our HTML document, we chain the constructor call of the control with the `placeAt` method. This method is used to position OpenUI5 controls. In our case, we add the text control to the DOM element with the ID `content`.

```ts
import Text from "sap/m/Text";

new Text({
    text: "Hello World"
}).placeAt("content");
```

Controls are used to define appearance and behavior of parts of the screen.

All controls of OpenUI5 have a fixed set of properties, aggregations, and associations for configuration. You can find their descriptions in the Demo Kit. In addition, each control comes with a set of public functions that you can look up in the API reference.

> 📌 **Important:** <br>
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

As we now use the `sap.m` library with our app, we need to add the dependency to this library to our UI5 Tooling setup. 

We open a terminal in the root folder of our app and exectue the following command:

```sh 
ui5 add sap.m` 
```

&nbsp;

***

**Next:** [Step 4: XML Views](../step-04/README.html "Putting all our UI into the index.html file will very soon result in a messy setup and there is quite a bit of work ahead of us. So let’s do a first modularization by putting the sap/m/Text control into a dedicated view.")

**Previous:** [Step 2: Bootstrap](../step-02/README.html "Before we can do something with OpenUI5, we need to load and initialize it. This process of loading and initializing OpenUI5 is called bootstrapping. Once this bootstrapping is finished, we simply display an alert.")

***

**Related Information** 

[TypeScript definitions for OpenUI5](https://www.npmjs.com/package/@types/openui5)

[Working with Controls](https://sdk.openui5.org/topic/91f0a22d6f4d1014b6dd926db0e91070.html "Controls are used to define the appearance and behavior of screen areas.")

[API Reference: `sap.m.Text`](https://sdk.openui5.orgapi/sap.m.Text)

[Samples: `sap.m.Text` ](https://sdk.openui5.orgentity/sap.m.Text)

[API Reference: `sap.ui.core.Control`](https://sdk.openui5.orgapi/sap.ui.core.Control)

[API Reference: `sap.ui.core.Element`](https://sdk.openui5.orgapi/sap.ui.core.Element)

[API Reference: `sap.ui.base.ManagedObject`](https://sdk.openui5.orgapi/sap.ui.base.ManagedObject)