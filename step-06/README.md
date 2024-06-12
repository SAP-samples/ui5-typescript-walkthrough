---
permalink: step-06/README.html
---

## Step 6: Modules

In OpenUI5, resources are often referred to as modules. In this step, we replace the alert from the last exercise with a proper Message Toast from the `sap.m` library.

&nbsp;

***

### Preview

![](https://sdk.openui5.org/docs/topics/loio2f629a95211f49afa367b60d233fb390_LowRes.png "A message toast displays the \"Hello World\" message")

<sup>*A message toast displays the "Hello World" message*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 6](https://sap-samples.github.io/ui5-typescript-walkthrough/step-06/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 5](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-06.zip).

***

### Coding

### webapp/controller/App.controller.ts

We now replace the native `alert` function with the `show` method of the `sap.m.MessageToast` control of OpenUI5. For this we extend the imports  with the `sap/m/MessageToast` module. 

```ts
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {
    onShowHello(): void {
        MessageToast.show("Hello World");
     }
};

```

For now, the message toast just displays a static "Hello World" message. We will show how to load a translated text here in [Step 8: Translatable Texts](../step-08/README.html).

&nbsp;

***

**Next:** [Step 7: JSON Model](../step-07/README.html "Now that we have set up the view and controller, it’s about time to think about the M in MVC.")

**Previous:** [Step 5: Controllers](../step-05/README.html "In this step, we replace the text with a button and show the Hello World message when the button is pressed. The handling of the button's press event is implemented in the controller of the view.")

***

**Related Information**  

[API Reference: `sap.m.MessageToast`](https://sdk.openui5.org/api/sap.m.MessageToast#methods)