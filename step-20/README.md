---
permalink: step-20/README.html
---

## Step 20: Data Types

The list of invoices is already looking nice, but what is an invoice without a price assigned? Typically prices are stored in a technical format and with a '`.`' delimiter in the data model. For example, our invoice for pineapples has the calculated price `87.2` without a currency. We are going to use the OpenUI5 data types to format the price properly, with a locale-dependent decimal separator and two digits after the separator.

&nbsp;

***

### Preview
  
![](https://sdk.openui5.org/docs/topics/loiodc9e919119564ddab78b8d0550ecfa9b_LowRes.png "The list of invoices with prices and number units")

<sup>*The list of invoices with prices and number units*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 20](https://sap-samples.github.io/ui5-typescript-walkthrough/step-20/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 20](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-20.zip).

### Coding

### webapp/controller/InvoiceList.controller.js \(New\)

We want to display in our list view the price in Euro, and typically the currency is part of our data model on the back end. In our case this is not the case, so we need to define it directly in the app. We therefore create a controller for the invoice list and define a view model for the currency code for Euro. It is a simple JSON model with just one key `currency` and the value `EUR`.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class App extends Controller {
    
    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");        
    } 
};
```

***

### webapp/view/InvoiceList.view.xml

We add the invoice list controller to the view to get access to the view model we defined in the controller. 

We add a price and the currency to our invoices list in the view by adding the `number` attribute to the `ObjectListItem` control, then we apply the currency data type on the number by setting the `type` attribute of the binding syntax to `sap.ui.model.type.Currency`. The `Currency` type will handle the formatting of the price for us, based on the currency code. In our case, the price is displayed with 2 decimals.

Additionally, we set the formatting option `showMeasure` to `false`. This hides the currency code in the property `number`. Instead we pass the currency on to the `ObjectListItem` control as a separate property `numberUnit`.

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.InvoiceList"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <List
      headerText="{i18n>invoiceListTitle}"
      class="sapUiResponsiveMargin"
      width="auto"
      items="{invoice>/Invoices}" >
      <items>
         <ObjectListItem
            title="{invoice>Quantity} x {invoice>ProductName}"
            number="{
               parts: [
                  'invoice>ExtendedPrice', 
                  'view>/currency'
               ],
               type: 'sap.ui.model.type.Currency',
               formatOptions: {
                  showMeasure: false
               }
            }"
            numberUnit="{view>/currency}"/>
      </items>
   </List>
</mvc:View>
```

As you can see above, we are using a special binding syntax for the `number` property of the `ObjectListItem`. This binding syntax makes use of so-called "Calculated Fields", which allows the binding of multiple properties from different models to a single property of a control. The properties bound from different models are called “parts”. In the example above, the property of the control is `number` and the bound properties \(“parts”\) retrieved from two different models are `invoice>ExtendedPrice` and `view>/currency`.

***

### Convention

- Use data types instead of custom formatters whenever possible.

&nbsp;

***

**Next:** [Step 21: Expression Binding](../step-21/README.html "Sometimes the predefined types of OpenUI5 are not flexible enough and you want to do a simple calculation or formatting in the view - that is where expressions are really helpful. We use them to format our price according to the current number in the data model.")

**Previous:** [Step 19: Aggregation Binding](../step-19/README.html "Now that we have established a good structure for our app, it's time to add some more functionality. We start exploring more features of data binding by adding some invoice data in JSON format that we display in a list below the panel.")

***

**Related Information**  
[Composite Binding](https://sdk.openui5.org/topic/a2fe8e763014477e87990ff50657a0d0.html "Calculated fields enable the binding of multiple properties in different models to a single property of a control.")

[Formatting, Parsing, and Validating Data](https://sdk.openui5.org/topic/07e4b920f5734fd78fdaa236f26236d8.html "Data that is presented on the UI often has to be converted so that is human readable and fits to the locale of the user. On the other hand, data entered by the user has to be parsed and validated to be understood by the data source. For this purpose, you use formatters and data types.")

[API Reference: sap.ui.base.ManagedObject](https://sdk.openui5.org/api/sap.ui.base.ManagedObject)

[API Reference: sap.ui.base.ManagedObject.PropertyBindingInfo](https://sdk.openui5.org/api/sap.ui.base.ManagedObject.PropertyBindingInfo)

[API Reference: `sap.ui.model.type`](https://ui5.sap.com/#/api/sap.ui.model.type)

[API Reference: sap.ui.model.type.Currency](https://sdk.openui5.org/api/sap.ui.model.type.Currency)

[Samples: sap.ui.model.type.Currency](https://sdk.openui5.org/entity/sap.ui.model.type.Currency)