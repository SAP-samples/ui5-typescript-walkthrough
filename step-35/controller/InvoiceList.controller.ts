import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import formatter from "../model/formatter";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Component from "../Component";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";

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
        const binding = <ListBinding> list?.getBinding("items");
        binding?.filter(filter);
    }

    onPress(event: Event): void {
        const item = <ObjectListItem> event.getSource();
        const router = (<Component> this.getOwnerComponent()).getRouter();
        router.navTo("detail", {
            invoicePath: window.encodeURIComponent(item.getBindingContext("invoice").getPath().substr(1))
        });
    }    
};