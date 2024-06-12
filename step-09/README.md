---
permalink: step-09/README.html
---

## Step 9: Component Configuration

After we have introduced all three parts of the Model-View-Controller \(MVC\) concept, we now come to another important structural aspect of OpenUI5.


In this step, we will enhance our application by encapsulating all UI assets within a component in OpenUI5. By doing so, we create an independent and reusable module independent of a local HTML file for the bootstrap. This architectural change enables us to access resources relative to the component, rather than relative to the `index.html` file.

By encapsulating our application as a component, we can seamlessly integrate it into surrounding containers like the SAP Fiori launchpad. This means our application can be easily embedded within a larger ecosystem, providing a more cohesive and integrated user experience.

&nbsp;

***

### Preview

![](https://sdk.openui5.org/docs/topics/loiocac9bcfa902c44c496d115acd7ee7376_LowRes.png "An input field and a description displaying the value of the input field (No visual changes to last step)")

<sup>*An input field and a description displaying the value of the input field \(No visual changes to last step\)*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 9](https://sap-samples.github.io/ui5-typescript-walkthrough/step-09/index-cdn.html).

After this step your project structure will look like the figure below. We will create the `Component.ts` file now and modify the related files in the app.

![](https://sdk.openui5.org/docs/topics/loio1e237a36972a44ac8522dd1a540ac062_LowRes.png "Folder Structure for this Step")

<sup>*Folder Structure for this Step*</sup>

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 9](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-09.zip).
***


### webapp/Component.ts \(New\)

We navigate to the `webapp` folder and place the `Component.ts` file to it. This file is commonly referred to as the component controller. A component is organized in a unique namespace \(which is synonymous with the application namespace\). All required and optional resources of the component have to be organized in the namespace of the component.

We define the component by extending `sap/ui/core/UIComponent` and supplement the component with additional metadata. Within the `interfaces` settings, we specify that the component should implement the `sap/ui/core/IAsyncContentCreation` interface. This allows the component to be generated asynchronously, which in turn sets the component's rootView and router configuration to async.

When the component is instantiated, OpenUI5 automatically calls the `init` function of the component. It's important to include a call to the `init` function of the base class by using the `super` keyword. In this section, we also instantiate our data model and the `i18n` model, similar to what we did earlier in the `onInit` function of our app controller.

Finally we call the `createContent` hook method of the component. This method creates the content \(UI Control Tree\) of this component. Here, we create the view as we did in the `index.ts` file to set our app view as the root view of the component.

```ts
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"]
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
    createContent(): Control | Promise<Control | null> | null {
        return XMLView.create({
            "viewName": "ui5.walkthrough.view.App",
            "id": "app"
        });
    };
};
```

Be aware that the models are set directly on the component and not on the root view of the component. However, as nested controls automatically inherit the models from their parent controls, the models are available on the view as well.

***

### webapp/controller/App.controller.ts

We delete the `onInit` function from the app controller; this is now done in the component controller. 

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
        const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }
};

```

***

#### webapp/index.ts

We'll replace the view with a UI component we've just created. To do this, we use a control called `ComponentContainer`. This control allows us to wrap a UI Component and place it in our HTML document.

We take out the creation of the view and create a new `ComponentContainer` instead. We configure this instance by providing the following options: 

-   We assign the `id` property to "container" so that we can refer to it later if needed. 

-   We set the `name` property to the namespace of the component. This tells the `ComponentContainer` control which UI component it should load and show.

-   We pass the `id` "walkthrough" to our component through the `ComponentContainer` constructor's settings argument. This `id` helps us identify our component among others that may be created during the application's runtime. 

-   To ensure the `id` of our component is unique and avoid any mix-ups, we set the `autoPrefixId` property to "true". This automatically adds a prefix to the ID of the Component, which is the ID of the ComponentContainer followed by a single dash \("-"/). 

-   For better loading performance, we set the `async` property to "true". This allows the component and its dependencies to load in the background without blocking other parts of the application. 

Finally, we position our newly created ComponentController control within the HTML element with the id `content`.

```ts
import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    id: "container",
    name: "ui5.walkthrough",
    settings: {
        id: "walkthrough"
    },
    autoPrefixId: true,
    async: true
}).placeAt("content");
```

***

### Conventions

-   The component is named `Component.js` or rather `Component.ts`.

-   Together with all UI assets of the app, the component is located in the `webapp` folder.

&nbsp;

***

**Next:** [Step 10: Descriptor for Applications](../step-10/README.html "All application-specific configuration settings will now further be put in a separate descriptor file called manifest.json. This clearly separates the application coding from the configuration settings and makes our app even more flexible. For example, all SAP Fiori applications are realized as components and come with a descriptor file in order to be hosted in the SAP Fiori launchpad.")

**Previous:** [Step 8: Translatable Texts](../step-08/README.html "In this step we move the texts of our UI to a separate resource file.")

&nbsp;
***

**Related Information**  

[Components](https://sdk.openui5.org/topic/958ead51e2e94ab8bcdc90fb7e9d53d0.html "Components are independent and reusable parts used in OpenUI5 applications.")

[Methods Controlling the Initial Instantiation](https://sdk.openui5.org/topic/b430345887f1419fba50320b57c1bdf9.html "OpenUI5 provides two methods for the initial instantiation of the component.")

[Advanced Concepts for OpenUI5 Components](https://sdk.openui5.org/topic/ecbc417ff264498b96bc364c53280242.html "Advanced concepts for components include routing and navigation and component data as well as the event bus.")

[API Reference: `sap.ui.core.ComponentContainer`](https://sdk.openui5.org/api/sap.ui.core.ComponentContainer)
