import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"],
        "rootView": {
            "viewName": "ui5.walkthrough.view.App",
            "type": "XML",
            /*"async": true, // implicitly set via the sap.ui.core.IAsyncContentCreation interface*/
            "id": "app"
        }
    };
    init(): void {
        // call the init function of the parent
        super.init();
        // set data model
        const data = {
            recipient: {
                name: "World"
            }
        };
        const dataModel = new JSONModel(data);
        this.setModel(dataModel);

        // set i18n model
        const i18nModel = new ResourceModel({
            bundleName: "ui5.walkthrough.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");
    };
};