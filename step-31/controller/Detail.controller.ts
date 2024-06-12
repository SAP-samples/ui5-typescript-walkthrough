import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class Detail extends Controller {

    onInit(): void {
        const router = (this.getOwnerComponent() as Component).getRouter();
        router.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    }

    onObjectMatched(event: Route$PatternMatchedEvent): void {
        this.getView().bindElement({
            path: "/" + window.decodeURIComponent( (event.getParameter("arguments") as any).invoicePath),
            model: "invoice"
        });
    }
};
