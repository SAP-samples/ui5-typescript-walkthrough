import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import History from "sap/ui/core/routing/History";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class Detail extends Controller {

    onInit(): void {
        const router = (<Component> this.getOwnerComponent()).getRouter();
        router.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    }

    onObjectMatched(event: Route$PatternMatchedEvent): void {
        this.getView().bindElement({
            path: "/" + window.decodeURIComponent( (<any> event.getParameter("arguments")).invoicePath),
            model: "invoice"
        });
    }

    onNavBack(): void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined) {
            window.history.go(-1);
        } else {
            const router = (<Component> this.getOwnerComponent()).getRouter();
            router.navTo("overview", {}, true);
        }
    }    
};