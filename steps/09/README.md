## Step 9: Component Configuration

After we have introduced all three parts of the Model-View-Controller \(MVC\) concept, we now come to another important structural aspect of OpenUI5.


In this step, we will encapsulate all UI assets in a component that is independent from our `index.html` file. Components are independent and reusable parts used in OpenUI5 applications. Whenever we access resources, we will now do this relatively to the component \(instead of relatively to the `index.html`\). This architectural change allows our app to be used in more flexible environments than our static `index.html` page, such as in a surrounding container like the SAP Fiori launchpad.

&nbsp;
***

### Preview

![](https://sdk.openui5.org/docs/topics/loiocac9bcfa902c44c496d115acd7ee7376_LowRes.png "An input field and a description displaying the value of the input field (No visual changes to last step)")

<sup>*An input field and a description displaying the value of the input field \(No visual changes to last step\)*</sup>


After this step your project structure will look like the figure below. We will create the `Component.ts` file now and modify the related files in the app.

![](xxx.png "Folder Structure for this Step")

<sup>*Folder Structure for this Step*</sup>


***


#### webapp/Component.ts \(New\)

We create the `Component.ts` file in the `webapp` folder.

Our component inherits from the base class `sap/ui/core/UIComponent` and it is obligatory to make the super call to the `init` function of the base class in the overridden `init` method.

As a next step we need to define the `metadata` for our component. The `metadata` section defines a reference to the root view, so that instead of displaying the root view directly in the `index.ts` file as we did previously, the component manages the display of the app view. It also implements the `sap.ui.core.IAsyncContentCreation` interface, which allows the component to be created fully asynchronously.

In the `init` function we instantiate our data model and the `i18n` model like we did before in the App controller.

```ts
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"],
        "rootView": {
            "viewName": "ui5.walkthrough.view.App",
            "type": "XML",
            "id": "app"
        }
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

        // set i18n model
        const i18nModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");
    };
};
```

Be aware that the models are set directly on the component and not on the root view of the component. However, as nested controls automatically inherit the models from their parent controls, the models are available on the view as well.

> :bulb: **Note:**
> 
> The `sap.ui.core.IAsyncContentCreation` interface implicitly sets both the component's `rootView` and its router configuration to `"async": true`; the latter will be described in [Step 30: Routing and Navigation](../30/README.md).

***

#### webapp/controller/App.controller.ts

We delete the `onInit` function and the required modules from our App controller; this is now done in the component. 

```ts
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {
    onShowHello(): void {
        // read msg from i18n model
        // functions with generic return values require casting 
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
        const recipient = (<JSONModel> this.getView()?.getModel())?.getProperty("/recipient/name");
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }
};

```

***

#### webapp/index.ts

We now create a component container instead of the view in our `index.ts` that instantiates the view for us according to the component configuration.

```ts
import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    name: "ui5.walkthrough",
    settings: {
        id: "walkthroughts"
    },
    async: true
}).placeAt("content");

```

***

### Conventions

-   The component is named `Component.js` or rather `Component.ts`.

-   Together with all UI assets of the app, the component is located in the `webapp` folder.

-   The `index.html` file is located in the `webapp` folder if it is used productively.

&nbsp;
***

**Next:** [Step 10: Descriptor for Applications](../10/README.md "All application-specific configuration settings will now further be put in a separate descriptor file called manifest.json. This clearly separates the application coding from the configuration settings and makes our app even more flexible. For example, all SAP Fiori applications are realized as components and come with a descriptor file in order to be hosted in the SAP Fiori launchpad.")

**Previous:** [Step 8: Translatable Texts](../08/README.md "In this step we move the texts of our UI to a separate resource file.")

&nbsp;
***

**Related Information**  

[Components](https://sdk.openui5.org/topic/958ead51e2e94ab8bcdc90fb7e9d53d0.html "Components are independent and reusable parts used in OpenUI5 applications.")

[API Reference: `sap.ui.core.mvc.ViewType`](https://sdk.openui5.org/api/sap.ui.core.mvc.ViewType)

[Samples: `sap.ui.core.mvc.ViewType` ](https://sdk.openui5.org/entity/sap.ui.core.mvc.ViewType)

[Declarative API for Initial Components](https://sdk.openui5.org/topic/82a0fcecc3cb427c91469bc537ebdddf.html "The declarative API enables you to define the initially started component directly in the HTML markup.")

[Methods Controlling the Initial Instantiation](https://sdk.openui5.org/topic/b430345887f1419fba50320b57c1bdf9.html "OpenUI5 provides two methods for the initial instantiation of the component.")

[Advanced Concepts for OpenUI5 Components](https://sdk.openui5.org/topic/ecbc417ff264498b96bc364c53280242.html "Advanced concepts for components include routing and navigation and component data as well as the event bus.")

[Make Your App CSP Compliant](https://sdk.openui5.org/topic/1f81a093a9f3433983dcb2ebe11cd4cd.html "CSP stands for Content Security Policy and is a security standard to prevent cross-site scripting or other code injection attacks.")