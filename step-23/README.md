---
permalink: step-23/README.html
---

## Step 23: Filtering

In this step, we add a search field for our product list and define a filter that represents the search term. When searching, the list is automatically updated to show only the items that match the search term.

&nbsp;

***

### Preview
  
![](https://sdk.openui5.org/docs/topics/loio472ab6bf88674c23ba103efd97163133_LowRes.png "A search field is displayed above the list")

<sup>*A search field is displayed above the list*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 23](https://sap-samples.github.io/ui5-typescript-walkthrough/step-23/index-cdn.html).

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 23](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-23.zip).

***

### Coding

### webapp/controller/InvoiceList.controller.ts

In the controller of the invoice list view we add a new `onFilterInvoices` event handler function with the `event` of type `SearchField$SearchEvent` as import parameter. 
The search field defines a parameter `query` that we access by calling `getParameter("query")` on the `event` parameter.

If the query is not empty, we add a new filter object that searches in the `ProductName` for a given query string with filter operator `Contains`. The filter operator `FilterOperator.Contains` is **not** case-sensitive.

We get the invoice list by asking the view for the control with the ID "invoiceList". To achieve this we make use of the helper function `byId`. On the list control we access the binding of the aggregation `items` to filter it with our newly constructed filter object. This will automatically filter the list by our search string so that only the matching items are shown when the search is triggered.

If the query is empty, we filter the binding with an empty array. This makes sure that we see all list elements again. We could also add more filters to the array, if we wanted to search more than one data field.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import formatter from "../model/formatter";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class App extends Controller {
    public formatter = formatter;

    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");        
    }

    onFilterInvoices(event: SearchField$SearchEvent): void {
        // build filter array
        const filter = [];
        const query = event.getParameter("query");
        if (query) {
            filter.push(new Filter("ProductName", FilterOperator.Contains, query));
        }

        // filter binding
        const list = this.byId("invoiceList");
        const binding = list?.getBinding("items") as ListBinding;
        binding?.filter(filter);
    }
};
```


### webapp/view/InvoiceList.view.xml

First we specify the ID "invoiceList" to the list control, so the event handler function `onFilterInvoices` we added to the controller of the invoice list view can identify the list when triggered.

In addition, we remove the `headerText` property in the list control and use `headerToolbar` aggregation with the `sap.m.Toolbar` assigned to it instead. A toolbar control is way more flexible and can be adjusted as you like. To the toolbar control we add a `sap.m.Title` displaying the title in the text attribute, a spacer, and the `sap.m.SearchField` with the width property set to 50% and the filter event handler function we defined in the controller assigned to the search event.

```xml
<mvc:View
   controllerName="ui5.walkthrough.controller.InvoiceList"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <List
      id="invoiceList"
      class="sapUiResponsiveMargin"
      width="auto"
      items="{invoice>/Invoices}" >
      <headerToolbar>
         <Toolbar>
            <Title text="{i18n>invoiceListTitle}"/>
            <ToolbarSpacer/>
            <SearchField width="50%" search=".onFilterInvoices"/>
         </Toolbar>
      </headerToolbar>
      <items>
         ...
      </items>
   </List>
</mvc:View>
```

The search field is part of the list header and therefore, each change on the list binding will trigger a rerendering of the whole list, including the search field.

&nbsp;
 
***

**Next:**[Step 24: Sorting and Grouping](../step-24/README.html "To make our list of invoices even more user-friendly, we sort it alphabetically instead of just showing the order from the data model. Additionally, we introduce groups and add the company that ships the products so that the data is easier to consume.")

**Previous:**[Step 22: Custom Formatters](../step-22/README.html "If we want to do a more complex logic for formatting properties of our data model, we can also write a custom formatting function. We will now add a localized status with a custom formatter, because the status in our data model is in a rather technical format.")

***

**Related Information**  

[API Reference: `sap.m.SearchField`](https://sdk.openui5.org/#/api/sap.m.SearchField)

[API Reference: `sap.ui.model.Filter`](https://sdk.openui5.org/#/api/sap.ui.model.Filter)

[API Reference: `sap.ui.model.FilterOperator`](https://sdk.openui5.org/#/api/sap.ui.model.FilterOperator)
