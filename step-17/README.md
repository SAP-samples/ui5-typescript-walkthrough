---
permalink: step-17/README.html
---

## Step 17: Fragment Callbacks

Now that we have integrated the dialog, it's time to add some user interaction. The user will definitely want to close the dialog again at some point, so we add a button to close the dialog and assign an event handler.

&nbsp;

***

### Preview
  
![](https://sdk.openui5.org/docs/topics/loioc351bbd078824c43bf1758b0c3679cbd_LowRes.png "The dialog now has an \"OK\" button")

<sup>*The dialog now has an \"OK\" button to close the dialog*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 17](https://sap-samples.github.io/ui5-typescript-walkthrough/step-17/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 17](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-17.zip).

### Coding

### webapp/controller/HelloPanel.controller.ts

We add an event handler function into the HelloPanel controller file that closes the dialog when triggered. To get the dialog instance we use the `byId` function and then call the `close` function of the dialog.

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
    

    onShowHello(): void {
        ...
    }
    async onOpenDialog(): Promise<void> {
        ...
    }
    onCloseDialog(): void {
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        (this.byId("helloDialog") as Dialog)?.close();
    }         
};
```

***

### webapp/i18n/i18n.properties

We extend the text bundle by the new text for the dialog’s close button.


```ini
...
# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
homePageTitle=UI5 TypeScript Walkthrough
helloPanelTitle=Hello World
openDialogButtonText=Say Hello With Dialog
dialogCloseButtonText=Ok
```

***

### webapp/view/HelloDialog.fragment.xml

In the fragment definition, we add a button to the `beginButton` aggregation of the dialog and refer the press handler to the event handler we just defined in the controller of the panel’s content view.

```xml
<core:FragmentDefinition
   xmlns="sap.m"
   xmlns:core="sap.ui.core" >
   <Dialog
      id="helloDialog"
      title="Hello {/recipient/name}">
      <beginButton>
         <Button
            text="{i18n>dialogCloseButtonText}"
            press=".onCloseDialog"/>
      </beginButton>
   </Dialog>
</core:FragmentDefinition>
```

By using the `loadFragment` function to create the fragment content in the controller of the panel’s content view, the method will be invoked there when the button is pressed. The dialog has an aggregation named `beginButton` as well as `endButton`. Placing buttons in both of these aggregations makes sure that the `beginButton` is placed before the `endButton` on the UI. What `before` means, however, depends on the text direction of the current language. We therefore use the terms `begin` and `end` as a synonym to “left” and “right". In languages with left-to-right direction, the `beginButton` will be rendered left, the `endButton` on the right side of the dialog footer; in right-to-left mode for specific languages the order is switched.

&nbsp;

***

**Next:** [Step 18: Icons](../step-18/README.html "Our dialog is still pretty much empty. Since  OpenUI5 is shipped with a large icon font that contains more than 500 icons, we will add an icon to greet our users when the dialog is opened.")

**Previous** [Step 16: Dialogs and Fragments](../step-16/README.html "In this step, we will take a closer look at another element which can be used to assemble views: the fragment.")

***

**Related Information**

[Reusing UI Parts: Fragments](https://sdk.openui5.org/topic/36a5b130076e4b4aac2c27eebf324909.html "Fragments are light-weight UI parts (UI sub-trees) which can be reused, defined similar to views, but do not have any controller or other behavior code involved.")

[Instantiation of Fragments](https://sdk.openui5.org/topic/04129b2798c447368f4c8922c3c33cd7.html "OpenUI5 provides two options to instantiate a fragment: If it is instantiated inside a controller extending sap.ui.core.mvc.Controller, the loadFragment() function is the way to go. However, if it is instantiated in a non-controller artefact, the generic function sap.ui.core.Fragment.load() can be used.")

[API Reference: sap.m.Dialog](https://sdk.openui5.org/api/sap.m.Dialog)

[Samples: sap.m.Dialog](https://sdk.openui5.org/entity/sap.m.Dialog)
