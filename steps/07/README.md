## Step 7: JSON Model

Now that we have set up the view and controller, it’s about time to think about the M in MVC.

We will add an input field to our app, bind its value to the model, and bind the same value to the description of the input field. The description will be directly updated as the user types.

&nbsp;
***

### Preview

![](https://sdk.openui5.org/docs/topics/loioafc105517a644407bd90662e3d94ea01_LowRes.png "An input field and a description displaying the value of the input field")

<sup>*An input field and a description displaying the value of the input field*</sup>
***

### Coding

### webapp/controller/App.controller.ts

We add an `onInit` function to the controller. This is one of OpenUI5’s lifecycle methods that is invoked by the framework when the controller is created, similar to the constructor of a control.

Inside the function we instantiate a JSON model. The data for the model only contains a single property for the “recipient”, and inside this it also contains one additional property for the name.

To be able to use this model from within the XML view, we call the `setModel` function on the view and pass on our newly created model.

```ts
import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {
   onInit(): void {
      // set data model on view
        const data = {
           recipient: {
              name: "World"
           }
        };
        const dataModel = new JSONModel(data);
        this.getView()?.setModel(dataModel);
    }

    onShowHello(): void {
       MessageToast.show("Hello World");
     }
};

```
The model is now set on the view.

***

### webapp/view/App.view.xml

We include an `sap/m/Input` control in the view, allowing the user to input a recipient for greetings: We bind the value of the control to the name property of the recipient object in our JSON model by using simple binding syntax. Additionally, we combine the static text "Hello" with the name property from the data model and assign it to the description property of the input field. To ensure real-time updates, we set the `valueLiveUpdate` property of the input control to "true". This means that as the user types, the value will be immediately updated per keystroke and reflected in the data model.

> :bulb: **Note:**
>
> To bind a control property to your view model data you need to specify a [`sap.ui.base.ManagedObject.PropertyBindingInfo`](https://sdk.openui5.org/api/sap.ui.base.ManagedObject.PropertyBindingInfo) for the property. A binding info is always initiated by enclosing it in curly brackets `{…}`, and the properties defined in the BindingInfos API are placed within the brackets.
>
> You can omit all properties of the binding info and just provide the binding path as a simple string. A binding path consists of path segments separated by a slash (`/`) which point to a property in the model that you want to bind to. This applies all OpenUI5 provided models.
>
> Binding paths can be either absolute or relative. Absolute binding paths start with a slash, while relative binding paths start with a name token and are resolved relative to the context of the control that is being bound (we will discuss this further later on).

```xml
<mvc:View controllerName="ui5.walkthrough.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Button
      text="Say Hello"
      press=".onShowHello"/>
   <Input
      value="{/recipient/name}"
      description="Hello {/recipient/name}"
      valueLiveUpdate="true"
      width="60%"/>    
</mvc:View>
```

The mdoel is now set on the view.

&nbsp;
***

**Next:** [Step 8: Translatable Texts](../08/README.md "In this step we move the texts of our UI to a separate resource file.")

**Previous:** [Step 6: Modules](../06/README.md "In OpenUI5, resources are often referred to as modules. In this step, we replace the alert from the last exercise with a proper Message Toast from the `sap.m` library.")

***

**Related Information**  

[Model View Controller \(MVC\)](https://sdk.openui5.org/topic/91f233476f4d1014b6dd926db0e91070.html "The Model View Controller (MVC) concept is used in OpenUI5 to separate the representation of information from the user interaction. This separation facilitates development and the changing of parts independently.")

[JSON Model](https://sdk.openui5.org/topic/96804e3315ff440aa0a50fd290805116.html#loio96804e3315ff440aa0a50fd290805116 "The JSON model can be used to bind controls to JavaScript object data, which is usually serialized in the JSON format.")

[Data Binding](https://sdk.openui5.org/topic/68b9644a253741e8a4b9e4279a35c247.html "You use data binding to bind UI elements to data sources to keep the data in sync and allow data editing on the UI.")

[Property Binding](https://sdk.openui5.org/topic/91f0652b6f4d1014b6dd926db0e91070.html "With property binding, you can initialize properties of a control automatically and update them based on the data of the model.")

[Binding Path](https://ui5.sap.com/#/topic/2888af49635949eca14fa326d04833b9.html "Binding paths address the different properties and lists in a model and define how a node in the hierarchical data tree can be found.")

[API Reference: `sap.ui.base.ManagedObject.PropertyBindingInfo`](https://sdk.openui5.org/api/sap.ui.base.ManagedObject.PropertyBindingInfo "Configuration for the binding of a managed property.")