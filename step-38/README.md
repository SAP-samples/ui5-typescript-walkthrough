---
permalink: step-38/README.html
---

## Step 38: Build Your Application

In this step we're going to build our application and consume the speed of a built OpenUI5 application.
  
&nbsp;

***

### Preview
  
  
![](https://sdk.openui5.org/docs/topics/loiofb12cea5ac9b45bb9007aac5a1a8689f_LowRes.png "The UI5 application is built and served")

<sup>*The OpenUI5 application is built and served*</sup>

To download the solution for this step as a zip file, just choose the link here: [📥 Download Solution for Step 38](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-38.zip).

***

### Coding

### package.json

Now we create a production-ready version of our OpenUI5 application that can be deployed to a web server or any other platform. For this we introduce a new build script to the `package.json`. This script starts the `ui5 build` command which initiates the build process using the UI5 build tool. It compiles and bundles all the necessary resources, such as JavaScript, CSS, and other assets, into a deployable format. By adding the `--all` option to the build script we specify that all available resources should be built including framework dependencies \(e.g. `sap.ui.core`, etc.\). It ensures that all dependencies and resources required by the application are included in the final build. The `--clean-dest` flag tells the build tool to clean the destination folder before generating a new build. It ensures that any previous build artifacts are removed before the new build is created.

```json
{
  "name": "ui5.walkthrough",
  "version": "1.0.0",
  "description": "OpenUI5 TypeScript Walkthrough",
  "private": true,
  "scripts": {
    "start": "ui5 serve -o test/mockServer.html",
    "build": "ui5 build --all --clean-dest"
  },
  "devDependencies": {
    "@types/openui5": "^1.120.0",
    "@ui5/cli": "^3.7.1",
    "@ui5/ts-interface-generator": "^0.8.1",
    "typescript": "^5.2.2",
    "ui5-middleware-livereload": "^3.0.2",
    "ui5-middleware-serveframework": "^3.0.0",
    "ui5-middleware-simpleproxy": "^3.2.8",
    "ui5-tooling-transpile": "^3.2.7"
  }
}
```

Now that we added this script to our project configuration, we can also execute it:

Open a terminal and execute `npm run build` in the project root folder.

Congrats! You have successfully built your OpenUI5 application.

***

### Install a Local Web Server

To test the built result, we can serve the build output locally. To do this, we have to add a local web server hosting the built resources. For this tutorial we choose an npm package called [local-web-server](https://www.npmjs.com/package/local-web-server).

Therefore, we have to install the new package by executing `npm i -D local-web-server` in the project root folder.

To actually use the newly added web server, we have to add a new script to our `package.json` which we'll call `serve-dist`. This script starts the `local-web-server` by pointing to the OpenUI5 build output located in the `dist` folder of our project. The `--compress` flag specifies that the server should compress the data being transmitted to the client. Compression reduces the amount of data that needs to be transferred, resulting in improved performance. It optimizes the responses sent by the server to the client. By adding the `--open` flag to the script we indicate that the server should automatically open a browser window or tab to the server's URL.

### package.json

```json
{
  "name": "ui5.walkthrough",
  "version": "1.0.0",
  "description": "OpenUI5 TypeScript Walkthrough",
  "private": true,
  "scripts": {
    "start": "ui5 serve -o test/mockServer.html",
    "build": "ui5 build --all --clean-dest",
    "serve-dist": "ws --compress -d dist --open"
  },
  "devDependencies": {
    "@types/openui5": "^1.120.0",
    "@ui5/cli": "^3.7.1",
    "@ui5/ts-interface-generator": "^0.8.1",
    "typescript": "^5.2.2",
    "local-web-server": "^5.3.0",
    "ui5-middleware-livereload": "^3.0.2",
    "ui5-middleware-serveframework": "^3.0.0",
    "ui5-middleware-simpleproxy": "^3.2.8",
    "ui5-tooling-transpile": "^3.2.7"
  }
}
```

Now it's time to start the server by executing `npm run serve-dist` in a terminal in the project root folder. Your default browser opens automatically and the built application is hosted. The `local-web-server` does not offer proxy capabilities so far, nor does it allow to open a specific HTML file in the browser. To display any actual data, it is therefore necessary to open the `test/mockServer.html` file in the browser instead of the `index.html`.

***

### Congratulations!

You've completed the walkthrough, good job! You should now be familiar with all the major development paradigms and concepts of OpenUI5. Our other tutorials focus on particular aspects of OpenUI5 and some advanced topics, so if you want to dive deeper into specific topics, feel free to explore!

&nbsp;

***

**Previous:** [Step 37: Accessibility](../step-37/README.html "In this step we're going to improve the accessibility of our app.")

***

**Related Information**  

[UI5 Tooling documentation](https://sap.github.io/ui5-tooling/stable/)
