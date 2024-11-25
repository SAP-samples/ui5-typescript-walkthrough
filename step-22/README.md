---
permalink: step-22/README.html
---

## Step 22: Custom Formatters

If we want to do a more complex logic for formatting properties of our data model, we can also write a custom formatting function. We will now add a localized status with a custom formatter, because the status in our data model is in a rather technical format.

&nbsp;

***

### Preview
  
![](https://sdk.openui5.org/docs/topics/loio7aa185a90dd7495cb6ec30c96bc80a54_LowRes.png "A status is now displayed with a custom formatter")

<sup>*A status is now displayed with a custom formatter*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 22](https://sap-samples.github.io/ui5-typescript-walkthrough/step-22/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 22](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-22.zip).

***

### Coding

### webapp/i18n/i18n.properties

We add three new entries to the resource bundle that reflect translated status texts 'New', 'In Progess', and 'Done'. We will use these texts to format the status values 'A', 'B', and 'C' of our invoices when displayed in the invoice list view.


### webapp/i18n/i18n.properties

```ini
...
# Invoice List
invoiceListTitle=Invoices
invoiceStatusA=New
invoiceStatusB=In Progress
invoiceStatusC=Done
```

***

### webapp/model/formatter.ts \(New\)

We place a new `formatter.ts` in the model folder of the app. This time we do not need to extend from any base object, but just return an object with our `formatter` functions in it. We add a `statusText` function, that gets a status as input parameter and returns a human-readable text that is read from the `resourceBundle` file.

```ts
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default  {
    statusText: function (this: Controller, status: string): string | undefined {
        const resourceBundle = (this?.getOwnerComponent()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        switch (status) {
            case "A":
                return resourceBundle.getText("invoiceStatusA");
            case "B":
                return resourceBundle.getText("invoiceStatusB");
            case "C":
                return resourceBundle.getText("invoiceStatusC");
            default:
                return status;
        }
    }
};

```

The new `formatter` file is placed in the model folder of the app, because formatters are working on data properties and format them for display on the UI. This time we do not extend from any base object but just return an object with our `formatter` functions inside.


>📌 **Important:** <br>
> In the above example, `this` refers to the controller instance as soon as the formatter gets called. We access the resource bundle via the component using `this.getOwnerComponent().getModel()` instead of using `this.getView().getModel()`. The latter call might return `undefined`, because the view might not have been attached to the component yet, and thus the view can't inherit a model from the component.

**Additional Information:**

-   [API Reference: `sap.ui.core.mvc.Controller#getOwnerComponent`](https://sdk.openui5.org/#/api/sap.ui.core.mvc.Controller/methods/getOwnerComponent). 
-   [API Reference: `sap.ui.core.mvc.Controller#onInit`](https://sdk.openui5.org/#/api/sap.ui.core.mvc.Controller/methods/onInit). 

***

### webapp/view/InvoiceList.view.xml

To load our formatter functions, we use the `require` attribute with the namespace URI `sap.ui.core`, for which the prefix `core` is already defined in our XML view. This allows us to write the attribute as `core:require`. We then add our custom formatter module to the list of required modules and assign it the alias `Formatter`, making it available for use within the view.

We add a status using the `firstStatus` aggregation to our `ObjectListItem` that will display the status of our invoice. There we defined our alias `Formatter` that holds our formatter functions, so we can access it by `Formatter.statusText`. When called, we want the `this` context to be set to the controller instance of the current view. To achieve this, we use `.bind($controller)`.

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.InvoiceList"
   xmlns="sap.m"
   xmlns:core="sap.ui.core"
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
            numberUnit="{view>/currency}"
            numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }">
            <firstStatus>
               <ObjectStatus
                  core:require="{
                     Formatter: 'ui5/walkthrough/model/formatter'
                  }"
                  text="{
                     path: 'invoice>Status',
                     formatter: 'Formatter.statusText.bind($controller)'
                  }"
               />
            </firstStatus>
         </ObjectListItem>
      </items>
   </List>
</mvc:View>
```

Instead of a technical status we get now the human-readable texts per invoice we specified in our resource bundle below the `number` attribute of the `ObjectListItem`.

&nbsp; 
 
***

**Next:** [Step 23: Filtering](../step-23/README.html "In this step, we add a search field for our product list and define a filter that represents the search term. When searching, the list is automatically updated to show only the items that match the search term.")

**Previous:** [Step 21: Expression Binding](../step-21/README.html "Sometimes the predefined types of OpenUI5 are not flexible enough and you want to do a simple calculation or formatting in the view - that is where expressions are really helpful. We use them to format our price according to the current number in the data model..")

***

**Related Information** 

[Formatting, Parsing, and Validating Data](https://sdk.openui5.org/topic/07e4b920f5734fd78fdaa236f26236d8.html "Data that is presented on the UI often has to be converted so that is human readable and fits to the locale of the user. On the other hand, data entered by the user has to be parsed and validated to be understood by the data source. For this purpose, you use formatters and data types.")

[Require Modules in XML View and Fragment](https://sdk.openui5.org/topic/b11d853a8e784db6b2d210ef57b0f7d7.html "Modules can be required in XML views and fragments and assigned to aliases which can be used as variables in properties, event handlers, and bindings.")
