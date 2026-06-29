# Step 10: Enable Data Reuse

<details class="ts-only" markdown="1">

You can download the solution for this step here: [📥 Download step 10](https://ui5.github.io/tutorials/odatav4/odatav4-step-10.zip).

</details>

<details class="js-only" markdown="1">

You can download the solution for this step here: [📥 Download step 10](https://ui5.github.io/tutorials/odatav4/odatav4-step-10-js.zip).

</details>

In this step we avoid unnecessary back-end requests by preventing the destruction of data shown in the detail area when sorting or filtering the list.

## Preview

**No visual change compared to the last step**

![A list of users with an added detail area](assets/Tut_OD4_Step_9_6e9025b.png "No visual change compared to the last step")

## Coding

You can view this step live: [🔗 Live Preview of Step 10](https://ui5.github.io/tutorials/odatav4/build/10/index-cdn.html).

## `webapp/controller/App.controller.?s`

```ts
...
		onMessageBindingChange(oEvent) {
			...
		},

		onSelectionChange(oEvent) {
            this._setDetailArea(oEvent.getParameter("listItem").getBindingContext());
        },
...
        /**
         * Toggles the visibility of the detail area
         *
         * @param {object} [oUserContext] - the current user context
         */
        _setDetailArea(oUserContext) {
            const oDetailArea = this.byId("detailArea"),
                oLayout = this.byId("defaultLayout"),
                oOldContext,
                oSearchField = this.byId("searchField");

            if (!oDetailArea) {
                return; // do nothing when running within view destruction
            }

            oOldContext = oDetailArea.getBindingContext();
            if (oOldContext) {
                oOldContext.setKeepAlive(false);
            }
            if (oUserContext) {
                oUserContext.setKeepAlive(true,
                    // hide details if kept entity was refreshed but does not exists any more
                    this._setDetailArea.bind(this));

            }
            oDetailArea.setBindingContext(oUserContext || null);
            // resize view
            oDetailArea.setVisible(!!oUserContext);
            oLayout.setSize(oUserContext ? "60%" : "100%");
            oLayout.setResizable(!!oUserContext);
            oSearchField.setWidth(oUserContext ? "40%" : "20%");
        }
 ...
```

```js
...
		onMessageBindingChange : function (oEvent) {
			...
		},

		onSelectionChange : function (oEvent) {
            this._setDetailArea(oEvent.getParameter("listItem").getBindingContext());
        },
...
        /**
         * Toggles the visibility of the detail area
         *
         * @param {object} [oUserContext] - the current user context
         */
        _setDetailArea : function (oUserContext) {
            var oDetailArea = this.byId("detailArea"),
                oLayout = this.byId("defaultLayout"),
                oOldContext,
                oSearchField = this.byId("searchField");

            if (!oDetailArea) {
                return; // do nothing when running within view destruction
            }

            oOldContext = oDetailArea.getBindingContext();
            if (oOldContext) {
                oOldContext.setKeepAlive(false);
            }
            if (oUserContext) {
                oUserContext.setKeepAlive(true,
                    // hide details if kept entity was refreshed but does not exists any more
                    this._setDetailArea.bind(this));

            }
            oDetailArea.setBindingContext(oUserContext || null);
            // resize view
            oDetailArea.setVisible(!!oUserContext);
            oLayout.setSize(oUserContext ? "60%" : "100%");
            oLayout.setResizable(!!oUserContext);
            oSearchField.setWidth(oUserContext ? "40%" : "20%");
        }
 ...
```

We extend the logic of the `_setDetailArea` function. First, we check if there's an "old" binding context in the detail area. If so, the `keepAlive` for the old context is set to `false`.

For the new context we set `keepAlive` to `true` and add `_setDetailArea` as an `onBeforeDestroy` function to it, which hides the detail area when the user linked to it is deleted in the back end and the list is refreshed.

You can use the `Context#setKeepAlive` method to prevent the destruction of information shown in the detail area when the selected user is no longer part of the list from which the information was selected. This could otherwise happen if you filter or sort the list.

**Related Information**

[Extending the Lifetime of a Context that is not Used Exclusively by a Table Collection](../04_Essentials/data-reuse-648e360.md#loio648e360fa22d46248ca783dc6eb44531__section_ELC)

***

**Next:** [Step 11: Add Table with :n Navigation to Detail Area](../11/README.md)
