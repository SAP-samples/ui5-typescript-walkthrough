## Step 6: Modules

In OpenUI5, resources are often referred to as modules. In this step, we replace the alert from the last exercise with a proper Message Toast from the `sap.m` library.

&nbsp;

***

### Preview



![](https://sdk.openui5.org/docs/topics/loio2f629a95211f49afa367b60d233fb390_LowRes.png "A message toast displays the \"Hello World\" message")

<sup>*A message toast displays the "Hello World" message*</sup>

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

For now, the message toast just displays a static "Hello World" message. We will show how to load a translated text here in [Step 8: Translatable Texts](../08/README.md).

&nbsp;

***

**Next:** [Step 7: JSON Model](../07/README.md "Now that we have set up the view and controller, it’s about time to think about the M in MVC.")

**Previous:** [Step 5: Controllers](../05/README.md "In this step, we replace the text with a button and show the Hello World message when the button is pressed. The handling of the button's press event is implemented in the controller of the view.")

***

**Related Information**  

[API Reference: `sap.m.MessageToast`](https://sdk.openui5.org/api/sap.m.MessageToast#methods)