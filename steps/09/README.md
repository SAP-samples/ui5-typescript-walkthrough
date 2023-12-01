## Step 9: Component Configuration

After we have introduced all three parts of the Model-View-Controller \(MVC\) concept, we now come to another important structural aspect of OpenUI5.


In this step, we will encapsulate all UI assets in a component that is independent from our `index.html` file. Components are independent and reusable parts used in OpenUI5 applications. Whenever we access resources, we will now do this relatively to the component \(instead of relatively to the `index.html`\). This architectural change allows our app to be used in more flexible environments than our static `index.html` page, such as in a surrounding container like the SAP Fiori launchpad.

&nbsp;
***

### Preview

![](https://sdk.openui5.org/docs/topics/loiocac9bcfa902c44c496d115acd7ee7376_LowRes.png "An input field and a description displaying the value of the input field (No visual changes to last step)")

<sup>*An input field and a description displaying the value of the input field \(No visual changes to last step\)*</sup>


After this step your project structure will look like the figure below. We will create the `Component.ts` file now and modify the related files in the app.

![](https://sdk.openui5.org/docs/topics/loio1e237a36972a44ac8522dd1a540ac062_LowRes.png "Folder Structure for this Step")

<sup>*Folder Structure for this Step*</sup>


***


### webapp/Component.ts \(New\)

We navigate to the `webapp` folder and place the `Component.ts` file to it that will hold our application setup. This file is commonly referred to as the component controller. A component is organized in a unique namespace which is synonymous with the application namespace. All required and optional resources of the component have to be organized in the namespace of the component.

We define the component by extending `sap/ui/core/UIComponent` and supplement the component with additional metadata. Within the `interfaces` settings, we specify that the component should implement the `sap/ui/core/IAsyncContentCreation` interface. This allows the component to be generated asynchronously, which in turn sets the component's rootView and router configuration to async.

When the component is instantiated, OpenUI5 automatically calls the `init` function of the component. It's crucial that when extending the base class, a super call to the `init` function of the base class is executed. Additionally, we instantiate our data model and the `i18n` model in this section, similar to what we did earlier in the `onInit` function of app controller.

Finally we call the `createContent` hook method of the component. This create the content (UI Control Tree) of this component. Here we now create the view as we did before in the `index.ts` file in the previous step to establish our app view as the component's root view.

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
        const recipient = (<JSONModel> this.getView()?.getModel())?.getProperty("/recipient/name");
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }
};

```

***

#### webapp/index.ts

Instead of directly creating a view, we now utilize a ComponentContainer control. This particular control allows us to encapsulate a UI Component within a control tree.

To set up the ComponentContainer, we assign the `name` property with the namespace of the component. This specifies which component to load and initialize. In addition, we give our component a unique `id` through the `ComponentContainer` constructor's setting argument. It's vital to ensure that this component id is unique among all components created during the application's runtime to avoid any potential conflicts. Furthermore, to allow the component and its dependencies to load in a fully asynchronous manner, we set the `async` property to "true". This implies that the loading of the component will not block other operations, leading to a smoother, more efficient loading experience. Finally, we position our newly created ComponentController control within the DOM element with the id `content`.

```ts
new ComponentContainer({
    id: "container",
    settings: {
        id: "walkthrough"
    },
    name: "ui5.walkthrough",
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

**Next:** [Step 10: Descriptor for Applications](../10/README.md "All application-specific configuration settings will now further be put in a separate descriptor file called manifest.json. This clearly separates the application coding from the configuration settings and makes our app even more flexible. For example, all SAP Fiori applications are realized as components and come with a descriptor file in order to be hosted in the SAP Fiori launchpad.")

**Previous:** [Step 8: Translatable Texts](../08/README.md "In this step we move the texts of our UI to a separate resource file.")

&nbsp;
***

**Related Information**  

[Components](https://sdk.openui5.org/topic/958ead51e2e94ab8bcdc90fb7e9d53d0.html "Components are independent and reusable parts used in OpenUI5 applications.")

[Methods Controlling the Initial Instantiation](https://sdk.openui5.org/topic/b430345887f1419fba50320b57c1bdf9.html "OpenUI5 provides two methods for the initial instantiation of the component.")

[Advanced Concepts for OpenUI5 Components](https://sdk.openui5.org/topic/ecbc417ff264498b96bc364c53280242.html "Advanced concepts for components include routing and navigation and component data as well as the event bus.")

[API Reference: `sap.ui.core.ComponentContainer`](https://sdk.openui5.org/api/sap.ui.core.ComponentContainer)