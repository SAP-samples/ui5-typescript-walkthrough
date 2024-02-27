## Step 16: Dialogs and Fragments

In this step, we will take a closer look at another element which can be used to assemble views: the fragment.

Fragments are light-weight UI parts \(UI subtrees\) which can be reused but do not have any controller. This means, whenever you want to define a certain part of your UI to be reusable across multiple views, or when you want to exchange some parts of a view against one another under certain circumstances \(different user roles, edit mode vs read-only mode\), a fragment is a good candidate, especially where no additional controller logic is required.

A fragment can consist of 1 to n controls. At runtime, fragments placed in a view behave similar to "normal" view content, which means controls inside the fragment will just be included into the view’s DOM when rendered. There are of course controls that are not designed to become part of a view, for example, dialogs. But even for these controls, fragments can be particularly useful, as you will see in a minute.

We will now add a dialog to our app. Dialogs are special, because they open on top of the regular app content and thus do not belong to a specific view. That means the dialog must be instantiated somewhere in the controller code, but since we want to stick with the declarative approach and create reusable artifacts to be as flexible as possible, we will create an XML fragment containing the dialog. A dialog, after all, can be used in more than one view of your app.

&nbsp;

***

### Preview
  
![](https://sdk.openui5.org/docs/topics/loio0916080895e144ed8b31963bfb18e17f_LowRes.png "A dialog opens when the new \“Say Hello With Dialog\” button is clicked")

<sup>*A dialog opens when the new “Say Hello With Dialog” button is clicked*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 16](https://sap-samples.github.io/ui5-typescript-walkthrough/step-16/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 16](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-16.zip).

***


### Coding

### webapp/view/HelloDialog.fragment.xml \(New\)

We add a new XML file to declaratively define our dialog in a fragment. The fragment assets are located in the `core` namespace, so we add an `xml` namespace for it inside the `FragmentDefinition` tag.

```xml
<core:FragmentDefinition
   xmlns="sap.m"
   xmlns:core="sap.ui.core" >
   <Dialog
      id="helloDialog"
      title="Hello {/recipient/name}"/>
</core:FragmentDefinition>
```

The syntax is similar to a view, but since fragments do not have a controller this attribute is missing. Also, the fragment does not have any footprint in the DOM tree of the app, and there is no control instance of the fragment itself (only the contained controls). It is simply a container for a set of reuse controls.

***

### webapp/controller/HelloPanel.controller.ts

In the HelloPanel controller, we define a new event handler function `onOpenDialog` which calls the dialog in the HelloDialog fragment when triggered. To do so we need to import the `sap.m.Dialog` module.

Using async/await, we handle the opening of the dialog asynchronously whenever the event is triggered.

If the dialog fragment does not exist yet, the fragment is instantiated by calling the `loadFragment` API. We then store the dialog on the controller instance. This allows us to reuse the dialog every time the event is triggered again.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class HelloPanel extends Controller {
    private dialog : Dialog;

    onShowHello(): void {
        ...
    }
    async onOpenDialog(): Promise<void> {
        this.dialog ??= await <Promise<Dialog>> this.loadFragment({
             name: "ui5.walkthrough.view.HelloDialog"
        });
        this.dialog.open();
    }
};
```

> 💡 **Tip:** <br>
> To reuse the dialog opening and closing functionality in other controllers, you might create a new file `ui5.walkthrough.controller.controller.BaseController`, which extends `sap.ui.core.mvc.Controller`, and put all your dialog-related coding into this controller. Now, all the other controllers can extend from `ui5.walkthrough.controller.BaseController` instead of `sap.ui.core.mvc.Controller`.


### webapp/i18n/i18n.properties

We add a new text for the button to open the dialog to the text bundle. We will add this button to the HelloPanel view in the next step.

```ini
...
# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
homePageTitle=UI5 TypeScript Walkthrough
helloPanelTitle=Hello World
openDialogButtonText=Say Hello With Dialog
```

### webapp/view/HelloPanel.view.xml

We add a new button to the view to open the dialog and assign an unique `id`to it. The button calls the event handler function `onOpenDialog` in the controller of the panel’s content view. We assign the new text to the text property of the button and refer class to `sapUiResponsiveMargin` to pimp up the design.

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.HelloPanel"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Panel
      headerText="{i18n>helloPanelTitle}"
      class="sapUiResponsiveMargin"
      width="auto" >
      <content>
         <Button
            id="helloDialogButton"
            text="{i18n>openDialogButtonText}"
            press=".onOpenDialog"
            class="sapUiSmallMarginEnd"/>
         <Button
            text="{i18n>showHelloButtonText}"
            press=".onShowHello"
            class="myCustomButton"/>
         <Input
            value="{/recipient/name}"
            valueLiveUpdate="true"
            width="60%"/>
         <FormattedText
            htmlText="Hello {/recipient/name}"
            class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/>
      </content>
   </Panel>
</mvc:View>
```

You will need the id of the button control `id="helloDialogButton"` in [Step 28: Integration Test with OPA](../28/README.md). 

It is a good practice to set a unique ID like `helloWorldButton` to key controls of your app so that can be identified easily. If the attribute \`id\` is not specified, the OpenUI5 runtime generates unique but changing ID like \`\_\_button23\` for the control. Inspect the DOM elements of your app in the browser to see the difference.

&nbsp;

***

**Next:** [Step 17: Fragment Callbacks](../17/README.md "Now that we have integrated the dialog, it's time to add some user interaction. The user will definitely want to close the dialog again at some point, so we add a button to close the dialog and assign an event handler.")

**Previous:** [Step15: Nested Views](../15/README.md "Our panel content is getting more and more complex and now it is time to move the panel content to a separate view. With that approach, the application structure is much easier to understand, and the individual parts of the app can be reused.")

***

**Related Information**  

[Reusing UI Parts: Fragments](https://sdk.openui5.org/topic/36a5b130076e4b4aac2c27eebf324909.html "Fragments are light-weight UI parts (UI sub-trees) which can be reused, defined similar to views, but do not have any controller or other behavior code involved.")

[Dialogs and other Popups as Fragments](https://sdk.openui5.org/topic/448c6418153149a79c8ff4370808f9c1.html "You can use fragments to declaratively define dialogs and other popup controls which are not part of the normal page UI structure.")

[API Reference: sap.m.Dialog](https://sdk.openui5.org/api/sap.m.Dialog)

[Samples: sap.m.Dialog](https://sdk.openui5.org/entity/sap.m.Dialog)

[Stable IDs: All You Need to Know](https://sdk.openui5.org/topic/f51dbb78e7d5448e838cdc04bdf65403.html "Stable IDs are IDs for controls, elements, or components that you set yourself in the respective id property or attribute as opposed to IDs that are generated by  OpenUI5. Stable means that the IDs are concatenated with the application component ID and do not have any auto-generated parts.")

[Instantiation of Fragments](https://sdk.openui5.org/topic/04129b2798c447368f4c8922c3c33cd7.html "OpenUI5 provides two options to instantiate a fragment: If it is instantiated inside a controller extending sap.ui.core.mvc.Controller, the loadFragment() function is the way to go. However, if it is instantiated in a non-controller artefact, the generic function sap.ui.core.Fragment.load() can be used.")

[API Reference: `sap.ui.core.Fragment`](https://sdk.openui5.org/#/api/sap.ui.core.Fragment)