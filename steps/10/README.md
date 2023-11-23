## Step 10: Descriptor for Applications

All application-specific configuration settings will now further be put in a separate descriptor file called `manifest.json`. This clearly separates the application coding from the configuration settings and makes our app even more flexible. For example, all SAP Fiori applications are realized as components and come with a descriptor file in order to be hosted in the SAP Fiori launchpad.

The SAP Fiori launchpad acts as an application container and instantiates the app without having a local HTML file for the bootstrap. Instead, the descriptor file will be parsed and the component is loaded into the current HTML page. This allows several apps to be displayed in the same context. Each app can define local settings, such as language properties, supported devices, and more. And we can also use the descriptor file to load additional resources and instantiate models like our `i18n` resource bundle.

### Preview
![](https://sdk.openui5.org/docs/topics/loio7b2aef85c016485da4a31c087bf4c0f0_LowRes.png "An input field and a description displaying the value of the input field \(No visual changes to last step\)")  

<sup>*An input field and a description displaying the value of the input field \(No visual changes to last step\)*</sub>


***


### Coding

### webapp/i18n/i18n.properties

We add new key/value pairs to our text bundle  for the app title and the app description`. We will use these texts in our app descriptor. In addition we add comments to separate the bundle texts semantically.

```ini
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of UI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```
***

### webapp/manifest.json

The content of the manifest file is a configuration object in JSON format that contains all global application settings and parameters. It is called the descriptor for applications, components, and libraries and is also referred to as “descriptor” or “app descriptor” when used for applications. It is stored in the `webapp` folder and read by OpenUI5 to instantiate the component. 

There are three important sections defined by namespaces in the `manifest.json` file:

-   **`sap.app`**

    The `sap.app` namespace we already know from [step 1](../01/README.md). We extend this configuration with the following application-specific attributes:
    
    -   `i18n`: Defines the path to the resource bundle file. The `supportedLocales` and `fallbackLocale` properties are set to empty strings, as our demo app uses only one `i18n.properties` file for simplicity and we'd like to prevent the browser from trying to load additional `i18n_*.properties` files based on your browser settings and your locale.

    -   `title`: As mentioned in step 1, it is recommended to make the title language dependend. To reference a text from the app's resource bundle we use the handlebar syntax: {{key}}

    -   `description`: Short description text what the application does in handlebars syntax referenced from the app's resource bundle.

        > :warning: **Important:**
        >
        > Properties of the resource bundle are enclosed in two curly brackets in the descriptor. This is not an OpenUI5 data binding syntax, but a variable reference to the resource bundle in the descriptor in handlebars syntax. The referred texts are not visible in the app built in this tutorial but can be read by an application container like the SAP Fiori launchpad.

-   **`sap.ui`**

    The `sap.ui namespace` contributes the following UI-specific attributes:

    -   `technology`: This value specifies the UI technology; the value is `UI5`

    -   `deviceTypes` \(mandatory\): Tells what devices are supported by the app: desktop, tablet, phone \(all true by default\)


-   **<code><b>sap.ui5</b></code>**

    The `sap.ui5` namespace adds OpenUI5-specific configuration parameters that are automatically processed by OpenUI5. The most important parameters are:

    -   `dependencies`\(mandatory\): Here we have to declare the dependencies so they are loaded by the OpenUI5 core during the initialization phase of the component and used afterwards. 
    It's mandatory to set in `minUI5Version` the mimimum version of OpenUI5 our component requires. Additionally we declare the dependency to the libraries `sap.ui.core` and `sap.m`, to benefit from the asynchronous library preload. 

    -   `rootView`: If you specify this parameter, the component will automatically instantiate the view and use it as the root for this component

    -   `models`: In this section of the descriptor we can define models that will be automatically instantiated by OpenUI5 when the app starts. Here we can now define the local resource bundle. We define the name of the model "i18n" as key and specify the bundle file by namespace. As in the previous steps, the file with our translated texts is stored in the `i18n` folder and named `i18n.properties`. We simply prefix the path to the file with the namespace of our app. The manual instantiation in the app component's init method will be removed later in this step. The `supportedLocales` and `fallbackLocale` properties are set to empty strings, as in this tutorial our demo app uses only one `i18n.properties` file for simplicity, and we'd like to prevent the browser from trying to load additional `i18n_*.properties` files based on your browser settings and your locale.

```json
{
    "_version": "1.60.0",
    "sap.app": {
        "id": "ui5.walkthrough",
        "type": "application",
        "i18n": {
            "bundleUrl": "i18n/i18n.properties",
            "supportedLocales": [
                ""
            ],
            "fallbackLocale": ""
        },
        "title": "{{appTitle}}",
        "description": "{{appDescription}}",
        "applicationVersion": {
            "version": "1.0.0"
        }
    },
    "sap.ui": {
        "technology": "UI5",
        "deviceTypes": {
            "desktop": true,
            "tablet": true,
            "phone": true
        }
    },
    "sap.ui5": {
        "dependencies": {
            "minUI5Version": "1.120",
            "libs": {
                "sap.ui.core": {},
                "sap.m": {}
            }
        },
        "rootView": {
            "viewName": "ui5.walkthrough.view.App",
            "type": "XML",
            "id": "app"
        },
        "models": {
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "settings": {
                    "bundleName": "ui5.walkthrough.i18n.i18n",
                    "supportedLocales": [
                        ""
                    ],
                    "fallbackLocale": ""
                }
            }
        }
    }
}
```   

> :bulb: **NOTE:**
>
> In this tutorial, we only introduce the most important settings and parameters of the descriptor file. In some development environments you may get validation errors because some settings are missing - you can ignore those in this context for the moment.

The existence of the `manifest.json` file must be declared in the component metadata, which is then delivered as part of the application archive. So let's do this as a next step.

***

### webapp/Component.ts

In the component's `metadata` section, we now replace the `rootView` property with the property key `manifest` and the value `json`. This defines a reference to the descriptor that will be loaded and parsed automatically when the component is instantiated. We can now completely remove the lines of code containing the model instantiation for our resource bundle. It is done automatically by OpenUI5 with the help of the configuration entries in the descriptor. We can also remove the dependency to `sap/ui/model/resource/ResourceModel` and the corresponding formal parameter `ResourceModel` because we will not use this inside our anonymous callback function.

```ts
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"],
        "manifest": "json" 
    };
    init(): void {
        // call the init function of the parent
        super.init();
        
        // set data model
        const data = {
            recipient: {
                name: "World"
            }
        };
        const dataModel = new JSONModel(data);
        this.setModel(dataModel);
    };
};
```

***

### webapp/index.html

Now we declare our component in the body of our `index.html`. In the bootstrapping script of our `index.html`, we enable the `ComponentSupport` module. Then, we declare our component in the body via a `div` tag. This will instantiate the component when the `onInit` event is executed.

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
		data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"
		data-sap-ui-resourceroots='{
			"ui5.walkthrough": "./"
		}'>
	</script>
</head>
<body class="sapUiBody" id="content">
	<div data-sap-ui-component data-name="ui5.walkthrough" data-id="container" data-settings='{"id" : "walkthrough"}'></div>	
</body>
</html>
```

We can delete our `index.ts`, because the descriptor now takes care of everything.

***

> :bulb: **Note:**
>
> In previous versions of OpenUI5, additional configuration settings for the app, like the service configuration, the root view, and the routing configuration, had to be added to the metadata section of the `Component` file. As of OpenUI5 version 1.30, we recommend that you define these settings in the `manifest.json` descriptor file. Apps and examples that were created based on an older OpenUI5 version still use the `Component` file for this purpose - so it is still supported, but not recommended.

***

### Conventions

-   The descriptor file is named `manifest` and stored as JSON file.

-   The descriptor file is located in the `webapp` folder.

-   Use translatable texts for the title and the description of the app.

&nbsp;
***

**Next:** [Step 11: Pages and Panels](../11/README.md "After all the work on the app structure it’s time to improve the look of our app. We will use two controls from the sap.m library to add a bit more bling to our UI. You will also learn about control aggregations in this step.")

**Previous:** [Step 9: Component Configuration](../09/README.md "After we have introduced all three parts of the Model-View-Controller \(MVC\) concept, we now come to another important structural aspect of OpenUI5.")

***

**Related Information**  


[Descriptor for Applications, Components, and Libraries \(manifest.json\)](https://sdk.openui5.org/topic/be0cf40f61184b358b5faedaec98b2da.html "The descriptor for applications, components, and libraries (in short: app descriptor) is inspired by the WebApplication Manifest concept introduced by the W3C. The descriptor provides a central, machine-readable, and easy-to-access location for storing metadata associated with an application, an application component, or a library.")

[Methods Controlling the Initial Instantiation](https://sdk.openui5.org/topic/b430345887f1419fba50320b57c1bdf9.html "OpenUI5 provides two methods for the initial instantiation of the component.")

[Advanced Concepts for OpenUI5 Components](https://sdk.openui5.org/topic/ecbc417ff264498b96bc364c53280242.html "Advanced concepts for components include routing and navigation and component data as well as the event bus.")