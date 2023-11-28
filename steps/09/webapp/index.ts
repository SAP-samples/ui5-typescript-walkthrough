import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    name: "ui5.walkthrough",
    settings: {
        id: "walkthrough"
    },
    async: true
}).placeAt("content");