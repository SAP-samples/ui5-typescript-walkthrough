## Step 1: Hello World!

As you know OpenUI5 is all about HTML5. Let's get started with building a first "Hello World" with only HTML. In addition we will initialize the UI5 Tooling, so we can benefit from it from the beginning.

&nbsp;
***

### Preview


![](https://sdk.openui5.org/docs/topics/loio1dd456361379431aab7e5bcdaaeff00f_LowRes.png "The browser shows the text \"Hello World\"")

<sup>*The browser shows the text \"Hello World\"*</sup>

***

### Coding


Create a folder on your local machine which will contain all the sources of the app you're going to build. We'll refer to this folder as the “app root” directory.

***

### webapp/index.html \(New\)

In the app root directory, we create a new folder named `webapp`. This folder exists to store all the sources that become available in the browser later. We refer to this folder as the "webapp folder".

In the webapp folder we a new HTML file named `index.html` and copy the following content to it:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>UI5 TypeScript Walkthrough</title>
</head>
<body>
  <div>Hello World</div>
</body>
</html>
```

> :bulb: **Note:**
>
> An HTML document consists basically of two sections: head and body. The head part will be used by the browser to process the document.
> 
> Using meta tags, we can influence the behavior of the browser. In this case, we tell the browser to use `UTF-8` as the document character set.
> 
> We also give our app a title that will be displayed in the browser. Our hard-coded title can be overruled by the app, for example to show a title in the language of the user. The body part describes the layout of the page. In our case, we simply display “Hello World” by using a `div` tag.

***

### webapp/manifest.json \(New\)

The manifest file, also known as the "descriptor" or "app descriptor," serves as a crucial configuration file for applications, components, and libraries. Stored in the `webapp` folder, this file is read by OpenUI5 to instantiate a component controller. Although we haven't created a component controller yet (which is part of [Step 9](../09/README.md)), it is necessary to create the app descriptor already now, because the UI5 Tooling we intend to use for development also requires an app descriptor.

Hence, we create a new file called `manifest.json` in the webapp folder and define the essential attributes within it:

-   The `_version` attribute is a mandatory field in the app descriptor that indicates the format version of the descriptor. This attribute is crucial for identifying application settings when the descriptor is read by various tools. As new features or changes are introduced in future versions of the descriptor, the version number helps ensure compatibility and proper interpretation of the descriptor's contents. Consequently, with each new version of OpenUI5, a corresponding version of the app descriptor is released. In our case, we have determined that our app requires a minimum OpenUI5 version of 1.120. Therefore, we specify the descriptor format version as 1.60.0, aligning it with the appropriate OpenUI5 version.  

    > :bulb: **Note:**
    >
    > To find the appropriate `_version` for each OpenUI5 release, you can refer to the [Descriptor for Applications, Components, and Libraries \(manifest.json\)](httsp://sdk.openui5.org/topic/be0cf40f61184b358b5faedaec98b2da.html) chapter in the OpenUI5 documentation.

-   The **`sap.app`**  namespace is used to define properties that are specific to the application itself. It includes the following obligatory application-specific attributes:

    -   `id`: This property specifies a unique identifier for the application and states the namespace of the application. 
        It is used to identify the application within the SAP Fiori launchpad or any other deployment environment.
        The id has to be provided in dot notation and must not exceed 70 characters.

    -   `title`: This property defines the title of the application, which can be displayed in the SAP Fiori launchpad or other application management tools.

        > :bulb: **Note:**
        >
        > It is recommended to make the title language-dependent, although for now, we will use a static title. We will discuss how to implement language-dependent titles in [Step 10: Descriptor for Applications](../10/README.md).

    -   `applicationVersion`: This property is used to specify the version of the application. It is typically used for tracking and managing changes to the application over time. The application version must be provided using semantic versioning principles.

    -   `type`: This property defines the type of the application, such as `application` or `component`. 
        It helps in determining the application's behavior and how it should be loaded. The type is actually not a mandatory attribute, but as it describes what it is, it makes sense to configure it as well. We describe here an `application`.

```json
{
    "_version": "1.60.0",
    "sap.app": {
        "id": "ui5.walkthrough",
        "type": "application",
        "title": "OpenUI5 TypeScript Walkthrough",
        "applicationVersion": {
            "version": "1.0.0"
        }
    }
}
```

> :bulb: **Note:**
>
> In this tutorial step, we will focus on configuring the absolute minimum in the app descriptor file. It's important to note that in certain development environments, you might encounter validation errors due to missing settings. However, for the purposes of this tutorial, you can safely ignore these errors. In [Step 10: Descriptor for Applications](../10/README.md) we will examine the purpose of the file in detail and configure some further options.

***

### UI5 Tooling

The following steps are tailored for using this project in the [UI5 Tooling](https://sap.github.io/ui5-tooling/stable/pages/CLI/#local-vs-global-installation).

***


### package.json \(New\)

We create a new file called `package.json` in the app root directory. It allows us to execute commands and consume packages from the [npm registry](https://www.npmjs.com/) via the npm command line interface.

Enter the following content:

```json
{
  "name": "ui5.walkthrough",
  "version": "1.0.0",
  "description": "OpenUI5 TypeScript Walkthrough",
  "private": true,
  "scripts": {
    "start": "ui5 serve -o index.html"
  }
}

```

Next we install the UI5 CLI and add it as development dependency to our project. For this, we open a terminal in the app root folder and execute `npm install --save-dev @ui5/cli`. 

Finally, we initialize the UI5 Tooling configuration for our project by executing the command `ui5 init` on the app root folder. This will generate the `ui5.yaml` file in the app root directory, which  is essential for using UI5 Tooling with our project.
&nbsp;

Execute `npm start` to start the web server. This will open a new browser window hosting your newly created `index.html`.

&nbsp;
***

**Next:** [Step 2: Bootstrap](../02/README.md "Before we can do something with UI5, we need to laod and initialize it. This process of loading and initializing UI5 is called bootstrapping. Once this bootstrapping is finished, we simply display an alert.")

***

**Related Information**  

[Descriptor for Applications, Components, and Libraries \(manifest.json\)](https://sdk.openui5.org/topic/be0cf40f61184b358b5faedaec98b2da.html "The descriptor for applications, components, and libraries (in short: app descriptor) is inspired by the WebApplication Manifest concept introduced by the W3C. The descriptor provides a central, machine-readable, and easy-to-access location for storing metadata associated with an application, an application component, or a library.")

[Development Environment](https://sdk.openui5.org/topic/7bb04e05f9484e1b95b38a2e48ecef4f.html "This part of the documentation introduces you to some common and recommended use cases for the installation, configuration, and setup of OpenUI5 development environments.")

[App Development](https://sdk.openui5.org/topic/b1fbe1a22f8d4a5bbb601591e27b68d1 "There are several ways to develop OpenUI5 applications. Select the one that meets the requirements of your projects and your expectations best.")

[UI5 Tooling: Getting Started](https://sap.github.io/ui5-tooling/stable/pages/GettingStarted/)
