## Step 4: XML Views

Putting all our UI into the `index.ts` file will very soon result in a messy setup and there is quite a bit of work ahead of us. So let’s do a first modularization by putting the `sap/m/Text` control into a dedicated `view`.

When working with OpenUI5, we recommend the use of XML, as this produces the most readable code and will force us to separate the view declaration from the controller logic. Yet the look of our UI will not change.

&nbsp;
***
### Preview


![](https://sdk.openui5.org/docs/topics/loio05f6775a39d3409ea673f4acc3812142_LowRes.png "The  \"Hello World\" text is now displayed by a OpenUI5 control  \(No visual changes to last step\)")

<sup>*The "The \"Hello World\" text is now displayed by an OpenUI5 control \(No visual changes to last step\)*</sup>
***

### Coding

### webapp/view/App.view.xml \(New\)

We create a new `view` folder in our webapp folder and add a new file called `App.view.xml` inside this folder. The root node of the XML structure is the `view`. Here, we reference the default namespace `sap.m` where the text control and the the majority of our UI assets are located. We define an additional `sap.ui.core.mvc` namespace with alias `mvc`, where the OpenUI5 views and all other Model-View-Controller \(MVC\) assets are located.

Inside the `view` tag, we add the declarative definition of our `text` control with the same properties as in the previous step. XML tags are mapped to controls and attributes are mapped to the properties of the control.

```xml
<mvc:View
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc">
   <Text text="Hello World"/>
</mvc:View>
```

> :bulb: **Note:**  
>
> The namespace identifies all resources of the project and has to be unique. If you develop your own application code or library, you cannot use the namespace prefix `sap`, because this namespace is reserved for SAP resources. Instead, simply define your own unique namespace \(for example, `myCompany.myApp`\).

***

### webapp/index.ts

In our `index.ts` script, we replace the instantiation of the `sap/m/Text` control by our new `App.view.xml` file. The view is created by a factory function of OpenUI5. The name is prefixed with the namespace `ui5.walkthrough.view` in order to uniquely identify this resource.

```ts
import XMLView from "sap/ui/core/mvc/XMLView";

XMLView.create({
    viewName: "ui5.walkthrough.view.App"
}).then(function (view) {
    view.placeAt("content");
});

```

***

### Conventions

-   View names are capitalized

-   All views are stored in the `view` folder

-   Names of XML views always end with `*.view.xml`

-   As a general rule, the default XML namespace is `sap.m`

-   Other XML namespaces use the last part of the SAP namespace as alias \(for example, `mvc` for `sap.ui.core.mvc`\)


&nbsp;
***

**Next:** [Step 5: Controllers](../05/README.md "In this step, we replace the text with a button and show the Hello World message when the button is pressed. The handling of the button's press event is implemented in the controller of the view.")

**Previous:** [Step 3: Controls](../03/README.md "Now it's time to build our first little UI by replacing the Hello World text in the HTML body by the OpenUI5 control sap.m.Text. In the beginning, we will use the TypeScript control AOI to set up the UI, the control instance is then placed into the HTML body.")

***

**Related Information**

[Model View Controller \(MVC\)](https://sdk.openui5.org/topic/91f233476f4d1014b6dd926db0e91070.html "The Model View Controller (MVC) concept is used in OpenUI5 to separate the representation of information from the user interaction. This separation facilitates development and the changing of parts independently.")

[Views](https://sdk.openui5.org/topic/91f27e3e6f4d1014b6dd926db0e91070.html "The view in the Model-View-Controller (MVC) concept is responsible for defining and rendering the UI. OpenUI5 supports predefined view types.")

[API Reference: sap.ui.core.mvc.View](https://sdk.openui5.org/api/sap.ui.core.mvc.View)

[XML View](https://sdk.openui5.org/topic/91f292806f4d1014b6dd926db0e91070.html "The XML view type is defined in an XML file. The file name either ends with .view.xml or as an XML string. The file name and the folder structure together specify the name of the view that equals the OpenUI5 module name.")

[API Reference: sap.ui.core.mvc.XMLView](https://sdk.openui5.org/api/sap.ui.core.mvc.xmlView)