## Step 13: Margins and Paddings

Our app content is still glued to the corners of the letterbox. To fine-tune our layout, we can add margins and paddings to the controls that we added in the previous step.

Instead of manually adding CSS to the controls, we will use the standard classes provided by OpenUI5. These classes take care of consistent sizing steps, left-to-right support, and responsiveness.

&nbsp;

***

### Preview
  
![](assets/loio0becf3ee81f5486a864e3b39ba036402_LowRes.png "The layout of the panel and its content now has margins and padding")

<sup>*The layout of the panel and its content now has margins and padding*</sup>

You can access the live preview by clicking on this link: [🔗 Live Preview of Step 13](https://sap-samples.github.io/ui5-typescript-walkthrough/build/13/index-cdn.html).

Download solution for step 13 in [📥 TypeScript](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-13.zip) or [📥 JavaScript](https://sap-samples.github.io/ui5-typescript-walkthrough/ui5-typescript-walkthrough-step-13-js.zip).

***

### Coding

### webapp/view/App.view.xml

To layout the panel, we add the CSS class `sapUiResponsiveMargin` that will add some space around the panel. We have to set the width of the panel to `auto` since the margin would otherwise be added to the default width of 100% and exceed the page size.

If you decrease the screen size, then you can actually see that the margin also decreases. As the name suggests, the margin is responsive and adapts to the screen size of the device. Tablets will get a smaller margin and phones in portrait mode will not get a margin to save space on these small screens. 

Margins can be added to all kinds of controls and are available in many different options. We can even add space between the button and the input field by adding class `sapUiSmallMarginEnd` to the button.

To format the output text individually, we remove the description from the input field and add a new `Text` control with the same value. Here we also use a small margin to align it with the other content. Similarly, we could add the standard padding classes to layout the inner parts of container controls such as our panel, but as it already brings a padding by default, this is not needed here.

```xml
<mvc:View
	controllerName="ui5.walkthrough.controller.App"
	xmlns="sap.m"
	xmlns:mvc="sap.ui.core.mvc"
	displayBlock="true">
	<Shell>
		<App>
			<pages>
				<Page title="{i18n>homePageTitle}">
					<content>
						<Panel
							headerText="{i18n>helloPanelTitle}"
							class="sapUiResponsiveMargin"
							width="auto">
							<content>
								<Button
									text="{i18n>showHelloButtonText}"
									press=".onShowHello"
									class="sapUiSmallMarginEnd"/>
								<Input
									value="{/recipient/name}"
									valueLiveUpdate="true"
									width="60%"/>
								<Text
									text="Hello {/recipient/name}"
									class="sapUiSmallMargin"/>	
							</content>
						</Panel>
					</content>
				</Page>
			</pages>
		</App>
	</Shell>
</mvc:View>
```

***

### Conventions

-   Use the standard OpenUI5 CSS classes for the layout if possible.

&nbsp;

***

**Next:** [Step 14: Custom CSS and Theme Colors](../14/README.md "Sometimes we need to define some more fine-granular layouts and this is when we can use the flexibility of CSS by adding custom style classes to controls and style them as we like.")

**Previous:** [Step 12: Shell Control as Container](../12/README.md "Now we use a shell control as container for our app and use it as our new root element. The shell takes care of visual adaptation of the application to the device’s screen size by introducing a so-called letterbox on desktop screens.")

***

**Related Information**  


[Using Predefined CSS Margin Classes](https://sdk.openui5.org/topic/777168ffe8324873973151dae2356d1c.html "OpenUI5 gives you the option of adding spacing in between controls by adding a margin. A margin clears an area around its respective control, outside of its border.")

[Using Container Content Padding CSS Classes](https://sdk.openui5.org/topic/c71f6df62dae47ca8284310a6f5fc80a.html "For many container controls in OpenUI5, such as a Dialog or a Page, you can define whether the container should have a padding within the content area. A padding clears the area between the container layout and the controls that are displayed in the content area.")
