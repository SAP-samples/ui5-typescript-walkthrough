## Step 5: Controllers

In this step, we replace the text with a button and show the “Hello World” message when the button is pressed. The handling of the button's `press` event is implemented in the controller of the view.

&nbsp;
***

### Preview


![](https://sdk.openui5.org/docs/topics/loiocedfdf89b30643ddbfcab1fe50bfa892_LowRes.png "A Say Hello button is added")

<sup>*A Say Hello button is added*</sup>
***

### Coding

### webapp/controller/App.controller.ts \(New\)

First of all, we need a conroller for our app view that defines how the view should react to user inputs, such as a button press event. 

We create the folder `webapp/controller` and a new file `App.controller.ts` inside. We define the app controller in its own file by extending the OpenUI5-provided `sap/ui/core/mvc/Controller`. In the beginning, it holds only a single function called `onShowHello` that shows an alert.


```ts
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {
    onShowHello(): void {
        // show a native JavaScript alert
        alert("Hello World");
     }
};

```

***

### webapp/view/App.view.xml

We add a reference to the controller by setting the `controllerName` attribute of the view. This way we get access to the event handlers and other functionalities defined in the controller.

We also replace the text control with a button with text “Say Hello” and assign a press event to it. When pressed, the button triggers the `onShowHello` event handler function we introduced in the view controller. To point out that the press event handler of the button is located in the controller of the view and not in the Global Namespace, we prefix the handler name with a `.` character.

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Button
      text="Say Hello"
      press=".onShowHello"/>
</mvc:View>

```

A view does not necessarily need an explicitly assigned controller. You do not have to create a controller if the view is just displaying information and no additional functionality is required. If a controller is specified, it is instantiated after the view is loaded.


***

### Conventions

-   Controller names are capitalized

-   All controllers are stored in the `controller` folder

-   Controllers carry the same name as the related view \(if there is a 1:1 relationship\)

-   Event handlers are prefixed with `on`

-   Controller names always end with `*.controller.js` \(in JavaScript\) or `*.controller.ts` \(in TypeScript\) 

&nbsp;
***

**Next:** [Step 6: Modules](../06/README.md "In OpenUI5, resources are often referred to as modules. In this step, we replace the alert from the last exercise with a proper Message Toast from the `sap.m` library.")

**Previous:** [Step 4: XML Views](../04/README.md "Putting all our UI into the index.html file will very soon result in a messy setup and there is quite a bit of work ahead of us. So let’s do a first modularization by putting the sap/m/Text control into a dedicated view.")

***

**Related Information**

[Model View Controller \(MVC\)](https://sdk.openui5.org/topic/91f233476f4d1014b6dd926db0e91070.html "The Model View Controller (MVC) concept is used in OpenUI5 to separate the representation of information from the user interaction. This separation facilitates development and the changing of parts independently.")

[Controller](https://sdk.openui5.org/topic/121b8e6337d147af9819129e428f1f75.html "A controller contains methods that define how models and views interact.")

[API Reference: sap.ui.core.mvc.Controller](https://sdk.openui5.org/api/sap.ui.core.mvc.Controller)