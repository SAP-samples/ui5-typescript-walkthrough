import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    id: "container",
    settings: {
        id: "walkthrough"
    },
    name: "ui5.walkthrough",
    autoPrefixId: true,
    async: true
}).placeAt("content");