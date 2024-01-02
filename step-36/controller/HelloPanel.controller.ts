import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class HelloPanel extends Controller {
    private dialogPromise: Promise<Dialog>;
    
    onShowHello(): void {
        // read msg from i18n model
        const recipient = (<JSONModel> this.getView()?.getModel())?.getProperty("/recipient/name");
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }
    onOpenDialog(): void {
        // create dialog lazily
        if (!this.dialogPromise) {
            this.dialogPromise = <Promise<Dialog>> this.loadFragment({
                name: "ui5.walkthrough.view.HelloDialog"
            });
        } 
        this.dialogPromise.then(function(oDialog) {
            oDialog.open();
        });
    }
    onCloseDialog(): void {
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        (<Dialog> this.byId("helloDialog"))?.close();
    }         
};